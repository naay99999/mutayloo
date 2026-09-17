import { NavLink, Outlet } from 'react-router'
import { cn } from '@workspace/ui/lib/utils'

const navigation = [
  { label: 'Dashboard', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Orders', to: '/orders' },
  { label: 'Customers', to: '/customers' },
]

export function AdminLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b bg-sidebar lg:min-h-svh lg:border-r lg:border-b-0">
        <div className="flex min-h-16 items-center px-4 text-lg font-semibold tracking-tight">
          Mutayloo Admin
        </div>
        <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
              )}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  )
}
