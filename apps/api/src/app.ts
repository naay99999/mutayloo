import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { loadConfig, type AppConfig } from './config'
import { logError, logRequest } from './logger'

function responseStatus(status: number | string | undefined) {
  return typeof status === 'number' ? status : 200
}

export function createApp(config: AppConfig) {
  const requestStartedAt = new WeakMap<Request, number>()

  return new Elysia()
  .use(cors({
    origin: config.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86_400,
  }))
  .onRequest(({ request }) => {
    requestStartedAt.set(request, performance.now())
  })
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404
      return { code: 'NOT_FOUND', message: 'Not found' }
    }

    if (code === 'VALIDATION') {
      set.status = 422
      return { code: 'VALIDATION_ERROR', message: 'Request validation failed' }
    }

    const errorDetails = error instanceof Error
      ? { message: error.message, stack: error.stack }
      : { message: 'Unknown error' }

    logError({
      level: 'error',
      code: String(code),
      ...errorDetails,
    })

    set.status = 500
    return { code: 'INTERNAL_ERROR', message: 'Internal server error' }
  })
  .onAfterResponse(({ request, set }) => {
    const startedAt = requestStartedAt.get(request)
    const durationMs = startedAt === undefined ? 0 : Math.round(performance.now() - startedAt)

    logRequest({
      level: 'info',
      method: request.method,
      path: new URL(request.url).pathname,
      status: responseStatus(set.status),
      durationMs,
    })
  })
  .get('/', () => ({ message: 'Hello from Elysia' }), {
    response: t.Object({ message: t.String() }),
  })
  .get('/health', () => ({ status: 'ok' as const }), {
    response: t.Object({ status: t.Literal('ok') }),
  })
}

export const config = loadConfig()
export const app = createApp(config)

export type App = typeof app
