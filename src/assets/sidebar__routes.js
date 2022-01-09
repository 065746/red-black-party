import { AdjustmentsIcon, ChartBarIcon, CogIcon, GiftIcon, InboxIcon, ShoppingBagIcon, ShoppingCartIcon, UserGroupIcon, ViewGridIcon } from '@heroicons/react/outline'

export default [
    {
        display_name: "Dashboard",
        route: "/admin/dashboard",
        icon: <ViewGridIcon className='h-6' />
    },
    {
        display_name: "Customers",
        route: "/admin/customers/one-person",
        icon: <UserGroupIcon className='h-6' />
    },
]