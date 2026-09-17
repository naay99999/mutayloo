import { useParams } from 'react-router'

export function Component() {
  const { slug } = useParams()

  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Product</p>
      <h1 className="text-3xl font-semibold tracking-tight">{slug}</h1>
      <p className="max-w-2xl text-muted-foreground">
        This route is ready for the product-detail API loader.
      </p>
    </section>
  )
}
