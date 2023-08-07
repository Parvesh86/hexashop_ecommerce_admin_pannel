import Axios from "@/services/Axios"

export default {
    namespaced: true,
    state:{
        draw:1,
        start:0,
        length:10,
        orderList:[],
        recordsFiltered:0,
        recordsTotal:0,
    },
    mutations: {
        SYNC_ORDERS : (context, {draw,data,recordsFiltered,recordsTotal}) => {
            context.draw = draw
            context.orderList = data
            context.recordsFiltered = recordsFiltered
            context.recordsTotal = recordsTotal
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
    actions:{
        getOrdersListing: (context, postData={}) => {
            context.commit('SET_LOADER', true, {root:true});
            
            postData['draw'] = context.state.draw;
            postData['start'] = context.state.start;
            postData['length'] = context.state.length;
            
            Axios.post('/api/admin/orders-list', postData)
                    .then((response) => {
                        context.commit('SET_LOADER', false, {root:true});
                        console.log(response)
                        context.commit('SYNC_ORDERS',response.data)
                    }).catch(error => {
                        context.commit('SET_LOADER', true, {root:true});
                        console.log(error)
                    })
        },
        getOrderDetail: (context,order_id) => {
            return new Promise((resolve, reject) => {
                context.commit('SET_LOADER', true, {root:true});
                Axios.get(`/api/admin/order/${order_id}/detail`)
                        .then((response) => {
                            context.commit('SET_LOADER', false, {root:true});
                            resolve(response.data)
                        }).catch(error => {
                            context.commit('SET_LOADER', false, {root:true});
                            console.log(error);
                        })
            })
        }
    }
}