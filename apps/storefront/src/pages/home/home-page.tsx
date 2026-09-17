import { Link } from 'react-router'

export function Component() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-6 py-12 sm:py-20">
      <p className="text-sm font-medium text-muted-foreground">Curated goods for everyday rituals</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Discover products with a little more meaning.
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        The storefront is ready for your catalog. Product data and checkout will connect here once their API contracts are available.
      </p>
      <div>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to="/products">
          Browse products
        </Link>
      </div>
    </section>
  )
}
