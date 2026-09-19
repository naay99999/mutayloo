import { createColumnHelper } from '@tanstack/react-table'
import { Add01Icon, MoreVerticalCircle01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AdminDataTable, type AdminDataTableFeatures } from '@/components/data-table'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import productsData from './data.json'

type Product = { id: string; name: string; sku: string; category: string; price: number; stock: number; status: 'Active' | 'Draft' | 'Archived'; updatedAt: string }
const products = productsData as Product[]

const column = createColumnHelper<AdminDataTableFeatures, Product>()
const columns = column.columns([
  column.display({ id: 'select', enableHiding: false, enableSorting: false, header: ({ table }) => <Checkbox aria-label="Select all products" checked={table.getIsAllPageRowsSelected()} indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />, cell: ({ row }) => <Checkbox aria-label={`Select ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} /> }),
  column.accessor('name', { header: 'Product', enableHiding: false, filterFn: 'includesString', sortFn: 'alphanumeric', cell: ({ row }) => <div className="flex flex-col gap-0.5"><span className="font-medium">{row.original.name}</span><span className="text-muted-foreground">{row.original.sku}</span></div> }),
  column.accessor('category', { header: 'Category', sortFn: 'alphanumeric' }),
  column.accessor('price', { header: () => <span className="block text-right">Price</span>, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="block text-right font-medium">฿{getValue().toLocaleString()}</span> }),
  column.accessor('stock', { header: () => <span className="block text-right">Stock</span>, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="block text-right">{getValue()}</span> }),
  column.accessor('status', { header: 'Status', sortFn: 'alphanumeric', cell: ({ getValue }) => <Badge variant={getValue() === 'Draft' ? 'secondary' : 'outline'}>{getValue()}</Badge> }),
  column.accessor('updatedAt', { header: 'Updated', sortFn: 'alphanumeric' }),
  column.display({ id: 'actions', enableHiding: false, cell: ({ row }) => <DropdownMenu><DropdownMenuTrigger render={<Button aria-label={`Open actions for ${row.original.name}`} size="icon" variant="ghost" />}><HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} /></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-40"><DropdownMenuGroup><DropdownMenuLabel>{row.original.sku}</DropdownMenuLabel><DropdownMenuItem>Edit product</DropdownMenuItem><DropdownMenuItem>Duplicate product</DropdownMenuItem></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem variant="destructive">Archive product</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu> }),
])

export function Component() {
  return <section className="flex flex-col gap-6 px-4 lg:px-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="flex flex-col gap-2"><p className="text-sm font-medium text-muted-foreground">Catalog management</p><div className="flex flex-col gap-1"><h1 className="text-3xl font-semibold tracking-tight">Products</h1><p className="text-muted-foreground">Manage catalog availability, pricing, and product status.</p></div></div><Button><HugeiconsIcon data-icon="inline-start" icon={Add01Icon} strokeWidth={2} />Add product</Button></div>
    <AdminDataTable columns={columns} data={products} emptyDescription="Try changing your search or column filters." emptyTitle="No products found" filterColumn="name" filterPlaceholder="Search products..." />
  </section>
}
