<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <LoaderView v-if="store.state.isLoading"/>
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="4">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <CForm>
                    <h1> Admin Login </h1>
                    <p class="text-medium-emphasis"> Sign In to your account </p>
                    <div class="error" v-if="serverError">{{ serverError }}</div>
                    <br>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autocomplete="email"
                        v-model="login_details.email"
                        required
                        :class="(login_errors.email.is_error) ? login_errors.email.class : null "
                        @keyup="syncFields('email')"
                      />
                      <div class="error" v-if="login_errors.email.is_error">{{ login_errors.email.message }}</div>
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                        v-model="login_details.password"
                        :class="(login_errors.password.is_error) ? login_errors.password.class : null "
                        @keyup="syncFields('password')"
                      />
                      <div class="error" v-if="login_errors.password.is_error">{{ login_errors.password.message }}</div>
                    </CInputGroup>
                    <CRow>
                      <CCol :xs="8">
                        <CButton color="primary" class="px-4" @click="submitLogin"> Login </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>
  
<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import { reactive, computed } from 'vue'
    import { useStore } from 'vuex';
    import LoaderView from '../components/LoaderView.vue'

    import LoginValidations from '../services/LoginValidations'

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    
    const login_details = reactive({
      email:null,
      password: null,
      role: 'admin',
    })

    const login_errors = reactive({
      email : {
        is_error:false,
        class: "is-invalid",
        message: null
      },
      password:{
        is_error:false,
        class: "is-invalid",
        message: null
      }
    })

    let syncFields = (key=null) => {
      if (key) {
        login_errors[key]['is_error'] = false
        login_errors[key]['message'] = null
      }else{
        login_errors.email.is_error = false
        login_errors.password.is_error = false
        login_errors.email.message = null
        login_errors.password.message = null
      }

      store.commit('auth/SET_LOGIN_ERROR',null,'hide')
      return true
    }

    const submitLogin = async () => {
        
      try {
        
        let syncField = syncFields()

        if (syncField) {
          let validations = new LoginValidations(login_details.email, login_details.password)
          let validation_errors = validations.checkValidations()
          let submit_login = true;
    
          if ('email' in validation_errors) {
            submit_login = false
            login_errors.email.is_error = true
            login_errors.email.message = validation_errors['email']
    
          }
          
          if ('password' in validation_errors) {
            submit_login = false
            login_errors.password.is_error = true
            login_errors.password.message = validation_errors['password']
            
          }

          // If No Errors Then  
          if (submit_login) {
            
            let logged_in = await store.dispatch('auth/triggerUserLogin',login_details)
            
            if (logged_in) {
              router.push({ name:'DashboardView' })
            }
          }
        }
      } catch (error) {
          console.log(error);        
      }

    }

    const serverError = computed(() => {
      return store.state.auth.login_errors
    })

</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
</style>
