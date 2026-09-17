import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export function StorefrontRouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'We could not load this page.'

  return (
    <main className="grid min-h-svh place-items-center bg-background p-6 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">Something went wrong</p>
        <h1 className="text-3xl font-semibold tracking-tight">{message}</h1>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to="/">
          Return to the storefront
        </Link>
      </div>
    </main>
  )
}
