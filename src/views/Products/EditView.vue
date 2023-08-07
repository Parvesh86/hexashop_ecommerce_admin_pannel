
<template>
    <div>
        <ProductFields :form-data="formData" 
                        :is-edit="isEdit" 
                        :form_errors="form_errors"
                        :required_data="pageRequiredData" 
                        @submitForm="createUpdateProduct(product_id)"
                        @uploadImage="handleImageUpload" >
            <template v-slot:page_title>Edit Product</template>
        </ProductFields>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductMixin from '@/mixins/ProductMixin'

export default {
    mixins:[ProductMixin],
    watch:{
        editSelectedProduct(newValue,oldValue){
            this.isEdit = true
            this.formData = {
                category_id:newValue.Catgeory,
                title: newValue.Name,
                short_description: newValue.short_description,
                description:newValue.description,
                regular_price:newValue.price,
                sale_price:newValue.sale_price,
                quantity:newValue.Quantity,
                status:newValue.Status,
                product_image:newValue.product_image
            }
        }
    },
    created(){
        this.product_id = this.$route.params.productID
        this.fetchProductByID(this.product_id)
        this.$store.dispatch('product/fetchPreRequiredData')
    },
    methods:{
        ...mapActions('product',['fetchProductByID']),
        
    }
}
</script>

<style lang="scss" scoped>

</style>