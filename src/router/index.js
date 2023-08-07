import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

import BaseLayout from '@/layouts/BaseLayout.vue'
import loginLayout from '@/layouts/LoginLayout.vue'

// Import Routes
import ordersRoutes from './ordersRoutes';


const routes = [
  ...ordersRoutes,
  {
    path:'/login',
    name:'login',
    component:loginLayout
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name:'DashboardView',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard/dashboardView.vue'),
      }
    ]
  },
  {
    path: '/users',
    name: 'Users',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/users-list',
        name:'UsersList',
        component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Users/userList.vue'),
      }
    ]
  },
  {
    path: '/categories',
    name: 'Categories',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name:'CategoriesList',
        component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Categories/ListView.vue'),
      },
    ]
  },
  {
    path: '/product',
    name: 'Product',
    redirect:'/product/products-list',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products-list',
        name:'ProductsList',
        component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Products/ListView.vue'),
      },
      {
        path: 'add',
        name:'ProductsAdd',
        component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Products/AddView.vue'),
      },
      {
        path: ':productID/edit',
        name:'ProductEdit',
        component: () => import(/* webpackChunkName: "UsersList" */ '@/views/Products/EditView.vue'),
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to,from,next) => {
  const store = useStore()
  const loggedUser = store.getters['auth/isLoggedUser']
  store.commit('SET_ROUTE',to.name)
  // If Login page is visited
  if (to.name == 'login') {

    // and User is Note Logged in, then redirect to login
    if (!loggedUser) {
      next()
    }
    // Else redirect to Home
    else{
      next({
        name:'Home'
      });
    }
  }else{
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!loggedUser) {
        next({
          name:'login'
        });
      }else{
        next()
      }
    }else{
      next()
    }

  }
  
})

export default router
