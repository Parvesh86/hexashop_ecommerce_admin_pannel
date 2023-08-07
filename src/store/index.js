import { createStore } from 'vuex'
import Auth  from './modules/Authentication/Auth'
import Users from './modules/Admin/Users'
import Products from './modules/Admin/Products'
import Orders from './modules/Admin/Orders'
import Categories from './modules/Admin/Categories'
import Axios from '@/services/Axios'

export default createStore({
  state: {
    isLoading:false,
    currentRoute:null,
    breadCrumbs:[]
  },
  getters: {
    
  },
  mutations: {
    SET_LOADER:(context,type=true)=>{
      context.isLoading = type
    },
    SET_ROUTE:(context, value) => {
      context.currentRoute = value
    },
    
  },
  actions: {
    getDashboardData:(context) => {
      return new Promise((resolve, reject) => {
        context.commit('SET_LOADER', true);
        Axios.get('/api/admin/dashboard-data')
            .then((response) => {
              context.commit('SET_LOADER', false);
              resolve(response.data)
            })
            .catch(error => {
              context.commit('SET_LOADER', false);
              console.log(error)

            })
      })
    }
  },
  modules: {
    auth: Auth,
    users:Users,
    category:Categories,
    product:Products,
    orders: Orders
  }
})
