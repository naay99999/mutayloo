import { createColumnHelper } from '@tanstack/react-table'
import { Add01Icon, MoreVerticalCircle01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AdminDataTable, type AdminDataTableFeatures } from '@/components/data-table'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import customersData from './data.json'

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  lifetimeSpend: number
  status: 'Active' | 'Inactive' | 'VIP'
  joinedAt: string
}

const customers = customersData as Customer[]
const column = createColumnHelper<AdminDataTableFeatures, Customer>()

const columns = column.columns([
  column.display({
    id: 'select',
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => <Checkbox aria-label="Select all customers" checked={table.getIsAllPageRowsSelected()} indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />,
    cell: ({ row }) => <Checkbox aria-label={`Select ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
  }),
  column.accessor('name', {
    header: 'Customer',
    enableHiding: false,
    filterFn: 'includesString',
    sortFn: 'alphanumeric',
    cell: ({ row }) => <div className="flex flex-col gap-0.5"><span className="font-medium">{row.original.name}</span><span className="text-muted-foreground">{row.original.email}</span></div>,
  }),
  column.accessor('phone', { header: 'Phone', sortFn: 'alphanumeric' }),
  column.accessor('orders', { header: () => <span className="block text-right">Orders</span>, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="block text-right">{getValue()}</span> }),
  column.accessor('lifetimeSpend', { header: () => <span className="block text-right">Lifetime spend</span>, sortFn: 'alphanumeric', cell: ({ getValue }) => <span className="block text-right font-medium">฿{getValue().toLocaleString()}</span> }),
  column.accessor('status', { header: 'Status', sortFn: 'alphanumeric', cell: ({ getValue }) => <Badge variant={getValue() === 'VIP' ? 'default' : getValue() === 'Inactive' ? 'secondary' : 'outline'}>{getValue()}</Badge> }),
  column.accessor('joinedAt', { header: 'Joined', sortFn: 'alphanumeric' }),
  column.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <DropdownMenu><DropdownMenuTrigger render={<Button aria-label={`Open actions for ${row.original.name}`} size="icon" variant="ghost" />}><HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} /></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-44"><DropdownMenuGroup><DropdownMenuLabel>{row.original.id}</DropdownMenuLabel><DropdownMenuItem>View customer</DropdownMenuItem><DropdownMenuItem>Copy customer ID</DropdownMenuItem></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem variant="destructive">Archive customer</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu>,
  }),
])

export function Component() {
  return (
    <section className="flex flex-col gap-6 px-4 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">Customer management</p>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">Manage customer profiles, order activity, and lifetime value.</p>
          </div>
        </div>
        <Button><HugeiconsIcon data-icon="inline-start" icon={Add01Icon} strokeWidth={2} />Add customer</Button>
      </div>
      <AdminDataTable columns={columns} data={customers} emptyDescription="Try changing your search or column filters." emptyTitle="No customers found" filterColumn="name" filterPlaceholder="Search customers..." />
    </section>
  )
}
