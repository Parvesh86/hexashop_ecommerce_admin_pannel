<template>
    <div class="sidebar sidebar-fixed">
        <div class="sidebar-brand">
            <router-link :to="{ name:'Home' }" :class="(currentPath == 'DashboardView') ? 'active': null">
                <img src="../../assets/images/white-logo.png" alt="" srcset="" height="40">
            </router-link>
        </div>
        <ul class="sidebar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="{name:'Home'}" :class="(currentPath == 'DashboardView') ? 'active': null">
                    <CIcon
                        custom-class-name="nav-icon"
                        icon="cil-speedometer"
                        :height="35"
                    />
                    Dashboard
                </router-link>
            </li>
            
            <li class="nav-title">Store</li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name:'CategoriesList' }" :class="(['CategoriesList'].includes(currentPath)) ? 'active': null">
                    <CIcon
                        custom-class-name="nav-icon"
                        icon="cil-list"
                        :height="35"
                    />
                    Categories
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{name:'ProductsList'}" :class="(['ProductsAdd','ProductsList'].includes(currentPath)) ? 'active': null">
                    <CIcon
                        custom-class-name="nav-icon"
                        icon="cil-list"
                        :height="35"
                    />
                    Products
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{name:'Orders'}" :class="(['Orders','OrderPreview'].includes(currentPath)) ? 'active': null">
                    <CIcon
                        custom-class-name="nav-icon"
                        icon="cil-list"
                        :height="35"
                    />
                    Orders
                </router-link>
            </li>
        </ul>
    </div>
    
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState({
            currentPath:(state) => state.currentRoute
        })
    }
}
</script>