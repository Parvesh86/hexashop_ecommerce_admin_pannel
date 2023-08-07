<template>
    <div>
        <CRow>
            <CCol :lg="12">
                <h2>Welcome to the Hexashop</h2>
            </CCol>
        </CRow>
        <br>
        <CRow>
            <CCol :xs="3">
                <CWidgetStatsC
                    class="mb-3"
                    color="success"
                    inverse
                    title="Total Revenue Generated"
                    :value="`&#8377; ${revenue_generated}`"
                >
                    <template #icon>
                        <CIcon icon="cil-money" height="36"/>
                    </template>
                </CWidgetStatsC>
            </CCol>

            <CCol :xs="3">
                <CWidgetStatsC
                    class="mb-3"
                    color="warning"
                    inverse
                    title="Orders Received"
                    :value="(orders_received > 0 ) ? orders_received : '0'"
                >
                    <template #icon>
                        <CIcon icon="cil-basket" height="36"/>
                    </template>
                </CWidgetStatsC>
            </CCol>
            
            <!-- <CCol :xs="3">
                <CWidgetStatsC
                    class="mb-3"
                    color="primary"
                    inverse
                    title="Registered Users"
                    :value="(registered_users > 0 ) ? registered_users : '0'"
                >
                    <template #icon>
                        <CIcon icon="cil-people" height="36"/>
                    </template>
                </CWidgetStatsC>
            </CCol> -->
        </CRow>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4">
                    <CCardHeader> 
                        <h3>Latest Orders</h3>
                    </CCardHeader>
                    <CCardBody>
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
                                <template v-if="latest_orders.length > 0">
                                    <CTableRow v-for="(orders, index) in latest_orders" :key="orders.id">
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
                                    <CTableRow>
                                        <CTableDataCell colspan="6" class="text-center">
                                            <router-link :to="{name:'OrdersList'}">
                                                View all orders
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
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
export default {
    data(){
        return {
            revenue_generated:0.00,
            orders_received:0,
            registered_users:0.00,
            latest_orders:[]
        }
    },
    methods:{
        currency_format(value){
            return (!value) ? 0.00 : Number(value).toFixed(2)
        }
    },
    created(){
        let vm = this
        vm.$store.dispatch('getDashboardData')
                    .then(({status,orders_count, latest_orders,revenue}) => {
                       if (status) {
                            vm.revenue_generated = revenue
                            vm.orders_received = orders_count
                            vm.latest_orders = latest_orders
                       }
                    })
    }
}
</script>