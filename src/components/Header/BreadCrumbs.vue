<template>
    <CBreadcrumb class="d-md-down-none me-auto mb-0">
        <CBreadcrumbItem
            v-for="item in breadcrumbs"
            :key="item"
            :href="item.active ? '' : item.path"
            :active="item.active"
            >
            {{ item.name }}
        </CBreadcrumbItem>
    </CBreadcrumb>
</template>

<script>
    export default {
        data(){
            return {
                breadcrumbs:[]
            }
        },
        methods:{
            getBreadcrumbs(){
                let This = this
                return This.$router.currentRoute.value.matched.map((route) => {
                    return {
                        active: route.path === This.$router.currentRoute.value.fullPath,
                        name: route.name,
                        path: `${This.$router.options.history.base}${route.path}`,
                    }
                })
            }
        },
        mounted(){
            this.breadcrumbs = this.getBreadcrumbs()
        },
        updated(){
            console.log('this runs now')
        }
    }
</script>

<style lang="scss" scoped>

</style>