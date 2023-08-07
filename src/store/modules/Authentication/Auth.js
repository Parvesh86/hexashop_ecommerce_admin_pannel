import Axios from '@/services/Axios'

export default {
    namespaced:true,
    state: {
        login : {
            admin_token:null,
            exipres:null,
            logged_in_user_detail:null,

        },
        is_user_logged_in:false,
        login_errors:null,
    },
    getters: {
        isLoggedUser : (state) => state.is_user_logged_in
    },
    mutations: {
        SET_LOGIN_ERROR : (state, message, action = 'show') => {
            state.login_errors = (action == 'show') ? message : null
        },
        SET_TOKEN : (state, token, expires_in=1200) => {
            state.login.admin_token = token
            state.login.exipres = expires_in
            state.is_user_logged_in = true
            localStorage.setItem('admin_token',token)
        },
        CLEAR_TOKEN : (state) => {
            state.login.admin_token = null
            state.login.exipres = null
            state.is_user_logged_in = false
            localStorage.removeItem('admin_token')
        }
    },
    actions: {
        triggerUserLogin : (context, {email, password}) => {
            return new Promise((resolve, reject) =>{
                let post_data = {
                    email,password
                };
                
                context.commit('SET_LOADER',true,{root:true})
    
                Axios.post('/api/users/login',post_data)
                    .then((response) => {
                        context.commit('SET_LOADER',false,{root:true})
                        if('error' in response.data){
                            context.commit('SET_LOGIN_ERROR', response.data.message)
                        }else{
                            // Set Token in Cookie
                            // access_token
                            // token_type
                            // expires_in
                            // user_detail
                            let {access_token,token_type, expires_in } = response.data
                            context.commit('SET_TOKEN', access_token, expires_in)
                            resolve(true)
    
                        }
                    }).catch(error => {
                        context.commit('SET_LOADER',false,{root:true})
                        console.log(error);
                    })

            })
        },
        triggerUserLogout : (context) => {
            context.commit('CLEAR_TOKEN')
        },
        checkAuth : (context) => {
            if (! context.is_user_logged_in) {
                let admin_token = localStorage.getItem('admin_token')
                if (admin_token) {
                    context.commit('SET_TOKEN',admin_token)
                }
            }
            
        }
    }
}