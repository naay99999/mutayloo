import { createColumnHelper } from '@tanstack/react-table'
import { Add01Icon, MoreVerticalCircle01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AdminDataTable, type AdminDataTableFeatures } from '@/components/data-table'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import ordersData from './data.json'

type Order = { id: string; customer: string; email: string; placedAt: string; fulfillment: 'Processing' | 'Packed' | 'Shipped' | 'Delivered'; payment: 'Paid' | 'Pending' | 'Refunded'; items: number; total: number }

const orders = ordersData as Order[]

const column = createColumnHelper<AdminDataTableFeatures, Order>()
const columns = column.columns([
  column.display({ id: 'select', enableHiding: false, enableSorting: false, header: ({ table }) => <Checkbox aria-label="Select all orders" checked={table.getIsAllPageRowsSelected()} indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />, cell: ({ row }) => <Checkbox aria-label={`Select ${row.original.id}`} checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} /> }),
  column.accessor('id', { header: 'Order', enableHiding: false, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="font-medium">{getValue()}</span> }),
  column.accessor('customer', { header: 'Customer', filterFn: 'includesString', sortFn: 'alphanumeric', cell: ({ row }) => <div className="flex flex-col gap-0.5"><span className="font-medium">{row.original.customer}</span><span className="text-muted-foreground">{row.original.email}</span></div> }),
  column.accessor('placedAt', { header: 'Date', sortFn: 'alphanumeric' }),
  column.accessor('fulfillment', { header: 'Fulfillment', sortFn: 'alphanumeric', cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge> }),
  column.accessor('payment', { header: 'Payment', sortFn: 'alphanumeric', cell: ({ getValue }) => <Badge variant={getValue() === 'Pending' ? 'secondary' : 'outline'}>{getValue()}</Badge> }),
  column.accessor('items', { header: 'Items', sortFn: 'alphanumeric' }),
  column.accessor('total', { header: () => <span className="block text-right">Total</span>, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="block text-right font-medium">฿{getValue().toLocaleString()}</span> }),
  column.display({ id: 'actions', enableHiding: false, cell: ({ row }) => <DropdownMenu><DropdownMenuTrigger render={<Button aria-label={`Open actions for ${row.original.id}`} size="icon" variant="ghost" />}><HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} /></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-40"><DropdownMenuGroup><DropdownMenuLabel>{row.original.id}</DropdownMenuLabel><DropdownMenuItem>View order</DropdownMenuItem><DropdownMenuItem>Copy order ID</DropdownMenuItem></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem variant="destructive">Cancel order</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu> }),
])

export function Component() {
  return <section className="flex flex-col gap-6 px-4 lg:px-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="flex flex-col gap-2"><p className="text-sm font-medium text-muted-foreground">Fulfillment</p><div className="flex flex-col gap-1"><h1 className="text-3xl font-semibold tracking-tight">Orders</h1><p className="text-muted-foreground">Track fulfillment, payments, and customer orders.</p></div></div><Button><HugeiconsIcon data-icon="inline-start" icon={Add01Icon} strokeWidth={2} />Create order</Button></div>
    <AdminDataTable columns={columns} data={orders} emptyDescription="Try changing your search or column filters." emptyTitle="No orders found" filterColumn="customer" filterPlaceholder="Search customers..." />
  </section>
}
