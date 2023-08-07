import BaseLayout from '@/layouts/BaseLayout.vue'

export default [
    {
        path: '/orders',
        name: 'Orders',
        redirect:'/orders/',
        component: BaseLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name:'OrdersList',
                component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Orders/ListView.vue'),
            },
            {
                path: ':orderID/preview',
                name:'OrderPreview',
                component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Orders/PreviewView.vue'),
            },
        ]
    }
]
