<template>
    <div>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4">
                    <CCardHeader> 
                        <h3>Orders</h3>
                    </CCardHeader>
                    <CCardBody>
                        <!-- <div class="row">
                            <div class="col-md-4">
                                Showing {{ recordsFiltered }} of {{ recordsTotal }} records
                            </div>
                        </div> -->
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <CTable align="middle" class="mb-0 border" hover responsive>
                                    <CTableHead color="light">
                                        <CTableRow>
                                            <CTableHeaderCell class="text-center">
                                                #
                                            </CTableHeaderCell>
                                            <CTableHeaderCell class="text-center">
                                                Order ID
                                            </CTableHeaderCell>
                                            <CTableHeaderCell class="text-center">
                                                Customer Name
                                            </CTableHeaderCell>
                                            <CTableHeaderCell class="text-center">
                                                Total Amount
                                            </CTableHeaderCell>
                                            <CTableHeaderCell class="text-center">
                                                Order status
                                            </CTableHeaderCell>
                                            <CTableHeaderCell class="text-center">
                                                Action
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <template v-if="orderList && orderList.length > 0">
                                            <CTableRow v-for="(orders, index) in orderList" :key="orders.id">
                                                <CTableDataCell class="text-center">
                                                    {{ index+1 }}
                                                </CTableDataCell>
                                                <CTableDataCell class="text-center">
                                                    <router-link :to="{name:'OrderPreview', params:{orderID: orders.id}}">
                                                        {{ orders.order_id }}
                                                    </router-link>
                                                </CTableDataCell>
                                                <CTableDataCell class="text-center">
                                                    {{ orders.firstname }} {{ orders.lastname }}
                                                </CTableDataCell>
                                                <CTableDataCell class="text-center">
                                                    <div>
                                                        &#8377; {{ currency_format(orders.payable_amount)  }}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell class="text-center">
                                                    <CBadge color="warning" v-if="orders.order_status == 0">Received</CBadge>
                                                </CTableDataCell>
                                                <CTableDataCell class="text-center">
                                                    <router-link class="btn btn-warning" :to="{name:'OrderPreview', params:{orderID: orders.id}}">
                                                        Preview
                                                    </router-link>
                                                </CTableDataCell>
                                            </CTableRow>
                                        </template>
                                        <template v-else>
                                            <CTableRow>
                                                <CTableDataCell colspan="6" class="text-center">
                                                    <h6> No orders found </h6>
                                                </CTableDataCell>
                                            </CTableRow>
                                        </template>
                                    </CTableBody>
                                </CTable>
                                <br>
                                <nav aria-label="Page navigation example">
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
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState('orders',{
            draw: (state) => state.draw,
            length:(state) => state.length,
            orderList : (state) => state.orderList,
            recordsFiltered :(state) => state.recordsFiltered,
            recordsTotal: (state) => state.recordsTotal
        })
    },
    methods:{
        currency_format:(value) => {
            return (!value) ? 0.00 : Number(value).toFixed(2)
        },
        async handlePagination(type='next'){
            await this.$store.commit('orders/SET_PAGINATION',type)
            await this.$store.dispatch('orders/getOrdersListing')
        }
    },
    created(){
        this.$store.dispatch('orders/getOrdersListing')
    }
}
</script>

<style scoped>

</style>