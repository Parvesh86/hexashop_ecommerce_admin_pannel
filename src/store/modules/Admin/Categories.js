import Axios from '@/services/Axios'
import { notify } from "@kyvg/vue3-notification";

export default {
    namespaced:true,
    state: {
        draw:1,
        start:0,
        length:10,
        categoryList:[],
        recordsFiltered:0,
        recordsTotal:0,
        errors:false,
        editSelectedCategory:{}
    },
    getters: {
        getCatgeoryByID:(context) => (id) => {
            return context.categoryList.find(element => element.catId == id)
        }
    },
    mutations: {
        SYNC_CATEGORIES : (context, {draw,data,recordsFiltered,recordsTotal}) => {
            context.draw = draw
            context.categoryList = data
            context.recordsFiltered = recordsFiltered
            context.recordsTotal = recordsTotal
        },
        DELETE_CATEGORY : (context, product_id) => {
            let updated_array = context.categoryList.filter(element => element.catId != product_id)
            context.categoryList = updated_array
            context.recordsFiltered--
            context.recordsTotal--
        },
        SET_BACKEDN_ERROR : (context, error) => {
            context.errors = error
        },
        SET_EDIT_CATEGORY:(context, category_detail) => {
            context.editSelectedCategory = category_detail
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
        fetchCategory: (context,postData={}) => {
            context.commit('SET_LOADER',true,{root:true})
            postData['draw'] = context.state.draw;
            postData['start'] = context.state.start;
            postData['length'] = context.state.length;

            Axios.post('/api/admin/category-listing', postData)
                .then((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    context.commit('SYNC_CATEGORIES',response.data.data)
                }).catch((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    notify({
                        title: "Error",
                        text: "Something went wrong",
                        type: 'error',
                    });
                })
        },
        addUpdateCategory:(context,postData)  => {
            
            // Show Loader
            context.commit('SET_LOADER',true,{root:true})

            // Set URL based on Creation request or Update request
            let url = '/api/admin/category/add-update'
            
            Axios.post(url,postData)
                .then((response) => {
                    context.commit('SET_LOADER',false,{root:true})
                    if (response.data.status) {
                        context.commit('SET_BACKEDN_ERROR', false)
                    }else{
                        context.commit('SET_BACKEDN_ERROR', true)
                    }
                })
        },
        deleteCategory : (context, category_id) => {
            context.commit('SET_LOADER',true,{root:true})
            Axios.delete(`api/admin/category/${category_id}/delete`)
                .then((response) => {
                    if (response.data.status) {
                        context.commit('DELETE_CATEGORY',category_id)
                        context.commit('SET_LOADER',false,{root:true})
                    }
                })
        }
    }
}