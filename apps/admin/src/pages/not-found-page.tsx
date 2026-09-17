import { Link } from 'react-router'

export function Component() {
  return (
    <section className="grid min-h-[60svh] place-items-center text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">This admin page does not exist.</p>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to="/">
          Return to dashboard
        </Link>
      </div>
    </section>
  )
}
