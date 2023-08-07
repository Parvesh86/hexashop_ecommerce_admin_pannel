<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h2>
                            Product Listing
                            <router-link class="btn btn-primary" style="float: right;" :to="{name:'ProductsAdd'}">
                                Add  Product
                            </router-link>
                        </h2>
                    </div>
                    <div class="card-body table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Catgeory</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Sale price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">In-Stock</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="productList.length > 0">
                                    <tr v-for="(product , index) in productList" :key="product.productId">
                                        <th scope="row">{{ index+1 }}</th>
                                        <td>{{ product.Name }}</td>
                                        <td>{{ product.Catgeory_name }}</td>
                                        <td class="text-center">
                                            <template v-if="product.product_image">
                                                <img :src="product.product_image" alt="" style="width:100px">
                                            </template>
                                        </td>
                                        <td>
                                            {{ product.price }}
                                        </td>
                                        <td>
                                            <template v-if="product.sale_price > 0 ">{{ product.sale_price }}</template>
                                            <template v-else>N/A</template>
                                        </td>
                                        <td class="text-center">{{ product.Quantity }}</td>
                                        <td>
                                            <CBadge :color="(product.StockStatus == 1) ? 'success' : 'danger' ">{{ (product.StockStatus == 1) ? 'In-Stock' : 'Out of stock' }}</CBadge>
                                        </td>
                                        <td>
                                            <CBadge :color="(product.Status == 1) ? 'success' : 'danger' ">{{ (product.Status == 1) ? 'Active' : 'In-Active' }}</CBadge>
                                        </td>
                                        <td>
                                            <router-link class="btn btn-warning" :to="{name:'ProductEdit', params: { productID: product.productId }}">
                                                <CIcon icon="cil-pencil" size="lg" />
                                            </router-link>
                                            &nbsp;
                                            <CButton color="danger" @click="deleteProduct(product.productId)">
                                                Delete
                                            </CButton>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="10" class="text-center">No Product found</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example" v-if="showPagination">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <a class="page-link" href="javascript:void(0)" @click="handlePagination('prev')">Previous</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="javascript:void(0)" @click="handlePagination('next')">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    
    export default {
        computed:{
            ...mapState('product',{
                draw: (state) => state.draw,
                productList : (state) => state.productList,
                recordsFiltered :(state) => state.recordsFiltered,
                recordsTotal: (state) => state.recordsTotal
            }),
            showPagination(){
                return  (this.draw == 1 && this.productList.length == 0 ) ? false : true
            }
        },
        methods:{
            ...mapActions('product',{
                deleteProduct : 'deleteProduct'
            }),
            async handlePagination(type='next'){
                await this.$store.commit('product/SET_PAGINATION',type)
                await this.$store.dispatch('product/fetchProducts')
            }
        },
        created(){
            this.$store.dispatch('product/fetchProducts')
        }
    }
</script>

<style lang="scss" scoped>

</style>