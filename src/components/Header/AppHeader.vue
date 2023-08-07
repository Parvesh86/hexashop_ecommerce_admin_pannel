<template>
    <CHeader position="sticky" class="mb-4">
        <CContainer fluid>
            <CHeaderBrand class="mx-auto d-lg-none">
                <router-link :to="{name:'Home'}">
                    <img src="../../assets/images/white-logo.png" alt="" srcset="" height="48">
                </router-link>
            </CHeaderBrand>
            <CHeaderNav class="d-none d-md-flex me-auto">
                <CNavItem>
                    <CNavLink href="/dashboard"> Dashboard </CNavLink>
                </CNavItem>
            </CHeaderNav>
            <CHeaderNav>
                <CDropdown variant="nav-item">
                    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
                        <CAvatar src="https://ui-avatars.com/api/?name=Admin+User&background=3C4B64&color=fff" size="md" />
                    </CDropdownToggle>
                    <CDropdownMenu class="pt-0">
                        <CDropdownItem @click="$emit('triggerlogout')" style="cursor: pointer;"> 
                            <CIcon icon="cil-lock-locked" /> Logout 
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <!-- <CContainer fluid>
            <AppBreadcrumb />
        </CContainer> -->
    </CHeader>
</template>
<script>

import AppBreadcrumb from '@/components/Header/BreadCrumbs.vue'

export default {
    components:{
        AppBreadcrumb
    },
    
}
</script>
