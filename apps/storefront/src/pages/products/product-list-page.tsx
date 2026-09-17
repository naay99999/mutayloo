export function Component() {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Catalog</p>
      <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
      <p className="max-w-2xl text-muted-foreground">
        Products, filters, sorting, and pagination will be driven by the catalog API. URL search parameters are reserved for that state.
      </p>
    </section>
  )
}
