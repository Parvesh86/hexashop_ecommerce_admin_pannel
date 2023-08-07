<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="back-to-shop">
                    <router-link :to="{name:'OrdersList'}">
                        &leftarrow;
                    </router-link>
                    <span class="text-muted"> Orders Listings </span>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-5">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item p-3">
                            <h5 class="font-weight-bold pb-2">Order Info</h5>
                            <div class="">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                ID
                                            </td>
                                            <td>
                                                {{ order_detail.order_id }}
                                            </td>
                                        </tr>
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                Date &#38; Time
                                            </td>
                                            <td>
                                                {{ order_detail.order_date_time }}
                                            </td>
                                        </tr>
                                        
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                Status
                                            </td>
                                            <td>
                                                <p class="mb-0 text-primary font-weight-bold justify-content-start align-items-center">
                                                    <small>
                                                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                            <circle  cx="12" cy="12" r="8" fill="#0275d8"></circle>
                                                        </svg>
                                                    </small>
                                                    "Hold"
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>

                        <li class="list-group-item p-3">
                            <h5 class="font-weight-bold pb-2">Customer Details</h5>
                            <div class="">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                Name
                                            </td>
                                            <td>
                                                <div class="row">
                                                    <div class="col-md-12 text-left">
                                                        {{ customer_detail.name }}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                Email
                                            </td>
                                            <td>
                                                <div class="row">
                                                    <div class="col-md-12 text-left">
                                                        {{ customer_detail.email }}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="white-space-no-wrap">
                                            <td class="text-muted pl-0">
                                                Address
                                            </td>
                                            <td>
                                                <div class="row">
                                                    <div class="col-md-12 text-left">
                                                        {{ customer_detail.address }}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-7" v-if="order_items.length > 0">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item p-3">
                                    <h5 class="font-weight-bold">Order Items</h5>
                                </li>
                                <li class="list-group-item p-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr class="text-muted">
                                                <th scope="col">Product</th>
                                                <th scope="col" class="text-right">Quantity</th>
                                                <th scope="col" class="text-right">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="{
                                                        order_items_id,product_detail, 
                                                        ordered_product_quantity,ordered_product_price 
                                                    } in order_items" :key="order_items_id">
                                                    <td>
                                                        <div class="active-project-1 d-flex align-items-center mt-0 ">
                                                            <div class="h-avatar is-medium">
                                                                <!-- <img class="avatar rounded" alt="user-icon" src="{{ $product_image }}"> -->
                                                            </div>
                                                            <div class="data-content">
                                                                <span class="font-weight-bold">
                                                                    {{ product_detail.name }}
                                                                </span>   
                                                                <p class="m-0 mt-1">
                                                                    {{ product_detail.short_description }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        {{ ordered_product_quantity }}
                                                    </td>
                                                    <td class="text-right">
                                                        &#8377;{{ ordered_product_price }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                </li>
                                <li class="list-group-item p-3">
                                    <div class="d-flex justify-content-end">
                                        Total &nbsp; : &#8377;{{ currency_format(order_detail.total_amout) }}
                                    </div>
                                </li>
                                <li class="list-group-item p-3">
                                    <div class="d-flex justify-content-end">
                                        Delivery Cost &nbsp; : 0.00
                                    </div>
                                </li>
                                <li class="list-group-item p-3">
                                    <div class="d-flex justify-content-end">
                                        Total &nbsp; : &#8377;{{ currency_format(order_detail.total_amout) }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                order_detail:{
                    order_id:null,
                    order_date_time:null,
                    order_status:null,
                    total_amout:0.00
                },
                customer_detail:{
                    name:null,
                    email:null,
                    address:null
                },
                order_items:[],

            }
        },
        methods:{
            setPageDetails(detailObject){
                this.order_detail = {
                    order_id: detailObject.order_id,
                    order_date_time: detailObject.created_at,
                    order_status: detailObject.order_status,
                    total_amout: detailObject.payable_amount
                }

                this.customer_detail = {
                    name: `${detailObject.firstname} ${detailObject.lastname}`,
                    email: detailObject.email,
                    address: detailObject.shipment_address
                }

                this.order_items = detailObject.products_ordered
            },
            currency_format(value){
                return (!value) ? 0.00 : Number(value).toFixed(2)
            }
        },
        created(){
            let order_id = this.$route.params.orderID
            let vm = this
            this.$store.dispatch('orders/getOrderDetail',order_id)
                .then((response) => {
                    if (response.status) {
                        vm.setPageDetails(response.data)
                    }
                })
        }
    }
</script>

<style scoped>
.active-project-1 .h-avatar.is-medium .avatar {
    width: 60px;
    min-width: 60px;
    height: 60px;
}
.active-project-1 .h-avatar {
    position: relative;
    display: inline-block;
    vertical-align: bottom;
}
.active-project-1 .data-content {
    margin-left: 15px;
    line-height: 1.4;
}
.swal2-container {
    background-color: #05040487 !important;
}
.font-weight-bold{
    font-weight: bold;
}
</style>