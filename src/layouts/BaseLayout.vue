<template>
    <div>
        <notifications />
        <LoaderView v-if="isLoading"/>
        <!-- Sidebar Component -->
        <AppSidebar />
        <!-- Sidebar Component -->
        <div class="wrapper d-flex flex-column min-vh-100 bg-light">
            <!-- Header Component -->
            <AppHeader @triggerlogout="userLogout"/>
            <!-- Header Component -->
            <div class="body flex-grow-1 px-3">
                <CContainer lg>
                    <router-view />
                </CContainer>
            </div>
        </div>
    </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppHeader from "@/components/Header/AppHeader.vue"
import AppSidebar from "@/components/Sidebar/AppSidebar.vue"
import LoaderView from '../components/LoaderView.vue'
import { mapState } from 'vuex'

export default {
    components:{
        CContainer,
        AppHeader,
        AppSidebar,
        LoaderView
    },
    computed:{

        ...mapState({
            isLoading: (state) => state.isLoading
        })

    },
    methods : {
        userLogout(){
            this.$store.dispatch('auth/triggerUserLogout');
            this.$router.push({name:'login'})
        }
    }
}

</script>
