import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import CustomerList from '@/components/CustomerList'
import CustomerCreate from '@/components/CustomerCreate'
import ServiceList from '@/components/ServiceList'
import ServiceCreate from '@/components/ServiceCreate'
import ProductList from '@/components/ProductList'
import ProductCreate from '@/components/ProductCreate'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customer-list',
      name: 'CustomerList',
      component: CustomerList
    },
     {
      path: '/customer-list/:msg',
      name: 'CustomerUpdatedList',
      component: CustomerList
    },
    {
      path: '/customer-create',
      name: 'CustomerCreate',
      component: CustomerCreate
    },
    {
      path: '/customer-create/:pk',
      name: 'CustomerUpdate',
      component: CustomerCreate
    },
    {
      path: '/service-list',
      name: 'ServiceList',
      component: ServiceList
    },
{
      path: '/service-list/:msg',
      name: 'ServiceUpdatedList',
      component: ServiceList
    },
    {
      path: '/service-create',
      name: 'ServiceCreate',
      component: ServiceCreate
    },
    {
      path: '/service-create/:pk',
      name: 'ServiceUpdate',
      component: ServiceCreate
    },
    {
      path: '/product-list',
      name: 'ProductList',
      component: ProductList
    },
{
      path: '/product-list/:msg',
      name: 'ProductUpdatedList',
      component: ProductList
    },
    {
      path: '/product-create',
      name: 'ProductCreate',
      component: ProductCreate
    },
    {
      path: '/product-create/:pk',
      name: 'ProductUpdate',
      component: ProductCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
