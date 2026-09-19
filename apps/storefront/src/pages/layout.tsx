import { NavLink, Outlet } from 'react-router'
import { cn } from '@workspace/ui/lib/utils'

const navigation = [
  { label: 'Shop', to: '/products' },
  { label: 'Categories', to: '/categories/new' },
]

export function StorefrontLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <NavLink className="text-lg font-semibold tracking-tight" to="/">
            Suannn
          </NavLink>
          <nav aria-label="Main navigation" className="flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) => cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                  isActive && 'bg-muted text-foreground',
                )}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Suannn
        </div>
      </footer>
    </div>
  )
}
