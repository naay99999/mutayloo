import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CommandIcon,
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  DeliveryBox01Icon,
  UserListIcon,
} from '@hugeicons/core-free-icons'
import { NavMain } from '@/components/layout/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar'

const navigation = [
  { title: 'Dashboard', url: '/dashboard', icon: DashboardSquare01Icon },
  { title: 'Orders', url: '/orders', icon: DeliveryBox01Icon },
  { title: 'Products', url: '/products', icon: ShoppingBag01Icon },
  { title: 'Customers', url: '/customers', icon: UserListIcon },
]

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link to="/dashboard" />}>
              <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />
              <span className="text-base font-semibold">Suannn</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation} />
      </SidebarContent>
    </Sidebar>
  )
}
