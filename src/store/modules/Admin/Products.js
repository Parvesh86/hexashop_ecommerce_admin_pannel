import Axios from '@/services/Axios'
import { notify } from "@kyvg/vue3-notification";

export default {
    namespaced:true,
    state: {
        draw:1,
        start:0,
        length:10,
        productList:[],
        recordsFiltered:0,
        recordsTotal:0,
        errors:false,
        editSelectedProduct:{},
        productRequiredData:null
    },
    getters: {
        getProductByID:(context) => (id) => {
            return context.productList.find(element => element.productId == id)
        }
    },
    mutations: {
        SYNC_PRODUCTS : (context, {draw,data,recordsFiltered,recordsTotal}) => {
            context.draw = draw
            context.productList = data
            context.recordsFiltered = recordsFiltered
            context.recordsTotal = recordsTotal
        },
        SYNC_REQUIRED_DATA :(context,data) => {
            context.productRequiredData = data
        },
        DELETE_PRODUCT : (context, product_id) => {
            let updated_array = context.productList.filter(element => element.productId != product_id)
            context.productList = updated_array
            context.recordsFiltered--
            context.recordsTotal--
        },
        SET_BACKEDN_ERROR : (context, error) => {
            context.errors = error
        },
        SET_EDIT_PRODUCT:(context, product_detail) => {
            context.editSelectedProduct = product_detail
        },
        SET_PAGINATION:(context, type = 'next') => {
            if (type == 'next') {
                context.draw++
                context.start += context.length
            }else{

                if (context.draw > 1) {
                    context.draw--
                }

                if (context.start > 0) {
                    context.start -= context.length
                }
            }
        }
    },
    actions: {
        fetchPreRequiredData:(context) => {
            Axios.get('/api/admin/store-data')
                .then((response) => {
                    context.commit('SYNC_REQUIRED_DATA',response.data.data)
                })
                .catch(error => {
                    notify({
                        title: "Error",
                        text: "Something went wrong",
                        type: 'error',
                    });
                })
        },
        fetchProducts: (context,postData={}) => {
            context.commit('SET_LOADER',true,{root:true})
            postData['draw'] = context.state.draw;
            postData['start'] = context.state.start;
            postData['length'] = context.state.length;

            Axios.post('/api/admin/products-listing', postData)
                .then((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    context.commit('SYNC_PRODUCTS',response.data.data)
                }).catch((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    notify({
                        title: "Error",
                        text: "Something went wrong",
                        type: 'error',
                    });
                })
        },
        addUpdateProduct:(context,{postData, product_id})  => {
            
            // Show Loader
            context.commit('SET_LOADER',true,{root:true})

            // Set URL based on Creation request or Update request
            let url = '/api/admin/product/create'
            
            if (product_id) {
                url = `/api/admin/product/${product_id}/update`
            }
            
            Axios.post(url,postData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    if (response.data.status) {
                        context.commit('SET_BACKEDN_ERROR', false)
                    }else{
                        context.commit('SET_BACKEDN_ERROR', true)
                    }
                })
        },
        fetchProductByID:(context, product_id) => {
            context.commit('SET_LOADER',true,{root:true})
            Axios.get(`/api/admin/product/${product_id}/get`)
            .then((response) => {
                context.commit('SET_LOADER',false,{root:true})
                if (response.data.status) {
                    context.commit('SET_EDIT_PRODUCT',response.data.data.product)
                }
            })
        },
        deleteProduct : (context, product_id) => {
            context.commit('SET_LOADER',true,{root:true})
            Axios.post(`api/admin/product/${product_id}/delete`,{status:'deleted'})
                .then((response) => {
                    if (response.data.status) {
                        context.commit('DELETE_PRODUCT',product_id)
                        context.commit('SET_LOADER',false,{root:true})
                    }
                })
        }
    }
}