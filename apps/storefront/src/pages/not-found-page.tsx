import { Link } from 'react-router'

export function Component() {
  return (
    <section className="grid flex-1 place-items-center py-12 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">The page you requested does not exist.</p>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to="/">
          Continue shopping
        </Link>
      </div>
    </section>
  )
}
