import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },

  {
    path: '/',
    component: () => import('@/views/customer/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/customer/Home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/customer/Products.vue')
      },
      {
        path: '/product/:productId',
        name: 'Product',
        component: () => import('@/views/customer/Product.vue')
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => import('@/views/customer/Favorite.vue')
      },

      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/customer/Coupons.vue')
      },

      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/customer/Checkout.vue')
      },

      {
        path: '/payment/:orderId',
        name: 'Payment',
        component: () => import('@/views/customer/Payment.vue')
      },

      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/customer/Login.vue')
      }
    ]
  },

  // admin
  {
    path: '/admin',
    component: () => import('@/views/admin/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'AdminProducts',
        component: () => import('@/views/admin/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('@/views/admin/Coupons.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }

]

const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  linkExactActiveClass: 'active',
  routes
})

export default router
