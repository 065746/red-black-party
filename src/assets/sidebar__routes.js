import { ChevronDownIcon, ChevronUpIcon, UserGroupIcon, UserIcon, UsersIcon, ViewGridIcon } from '@heroicons/react/outline'

export default [
    {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <ViewGridIcon className='h-6' />,
    },
    {
        title: "All Customers",
        icon: <UserGroupIcon className='h-6' />,
        iconClosed: <ChevronDownIcon className='h-5 text-gray-200' />,
        iconOpened: <ChevronUpIcon className='h-5 text-gray-200' />,
        subNav: [
            {
                title: 'One Person',
                path: '/admin/customers/one-person',
                icon: <UserIcon className='h-5 text-gray-200' />,
            },
            {
                title: 'Couple',
                path: '/admin/customers/couple',
                icon: <UsersIcon className='h-5 text-gray-200' />,
            },
            {
                title: '4 Boys',
                path: '/admin/customers/4-boys',
                icon: <UserGroupIcon className='h-5 text-gray-200' />,
            },
            {
                title: '4 Girls',
                path: '/admin/customers/4-girls',
                icon: <UserGroupIcon className='h-5 text-gray-200' />,
            },
        ]
    },
    {
        title: "Confirmed Customers",
        icon: <UserGroupIcon className='h-6' />,
        iconClosed: <ChevronDownIcon className='h-5 text-gray-200' />,
        iconOpened: <ChevronUpIcon className='h-5 text-gray-200' />,
        subNav: [
            {
                title: 'One Person',
                path: '/admin/customers/one-person/confirmed',
                icon: <UserIcon className='h-5 text-gray-200' />,
            },
            {
                title: 'Couple',
                path: '/admin/customers/couple/confirmed',
                icon: <UsersIcon className='h-5 text-gray-200' />,
            },
            // {
            //     title: '4 Boys',
            //     path: '/admin/customers/4-boys',
            //     icon: <UserGroupIcon className='h-5 text-gray-200' />,
            // },
            // {
            //     title: '4 Girls',
            //     path: '/admin/customers/4-girls',
            //     icon: <UserGroupIcon className='h-5 text-gray-200' />,
            // },
        ]
    },
]