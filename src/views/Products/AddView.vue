<template>
    <div>
        <ProductFields :form-data="formData" 
                        :is-edit="isEdit" 
                        :form_errors="form_errors" 
                        :required_data="pageRequiredData"
                        @submitForm="createUpdateProduct" 
                        @uploadImage="handleImageUpload" >
            <template v-slot:page_title>Add New Product</template>
        </ProductFields>
    </div>
</template>

<script>
    import ProductMixin from '@/mixins/ProductMixin'
    
    export default {
        mixins:[
            ProductMixin
        ],
        created(){
            this.$store.dispatch('product/fetchPreRequiredData')
        }
    }
</script>

<style lang="scss" scoped>

</style>