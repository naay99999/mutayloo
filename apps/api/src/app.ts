import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

export const app = new Elysia()
  .use(cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
      'http://localhost:5174',
      'http://127.0.0.1:5174',
      'http://localhost:4174',
      'http://127.0.0.1:4174'
    ]
  }))
  .get('/', () => ({
    message: 'Hello from Elysia'
  }))

export type App = typeof app
