<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h2>
                        Categories
                        <CButton style="float: right;" color="primary" @click="handleModalOpen">
                            Add +
                        </CButton>
                    </h2>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Short description</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">On Index Page</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="catList.length > 0">
                                        <tr v-for="({catId,name,short_description,slug,status,show_on_index},catIndex) in catList" :key="catId">
                                            <td>{{ catIndex+1 }}</td>
                                            <td>{{ name }}</td>
                                            <td>
                                                <p v-if="short_description">{{ short_description }}</p>
                                                <p v-else>N/A</p>
                                                
                                            </td>
                                            <td>{{ slug }}</td>
                                            <td>
                                                <CBadge :color="(status == 1) ? 'success' : 'danger' ">{{ (status == 1) ? 'Active' : 'In-Active' }}</CBadge>
                                            </td>
                                            <td>
                                                <CBadge :color="(show_on_index == 1) ? 'success' : 'danger' ">{{ (show_on_index == 1) ? 'Enabled' : 'Disabled' }}</CBadge>
                                            </td>
                                            <td>
                                                <CButton color="warning" @click="handleCategoryEdit(catId)">
                                                    <CIcon icon="cil-pencil" size="lg" />
                                                </CButton>
                                                &nbsp;
                                                <CButton color="danger" @click="handleDeletion(catId)">
                                                    Delete
                                                </CButton>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr class="text-center"><td colspan="7"> No Catgeories Found </td></tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddEditModalVue :showModal="showAddEditModal" @handleSubmit="handleCategorySubmit" @handleClose="handleModalClose">
            <template v-slot:modal-heading>
                {{ modal_heading }}
            </template>
            <template v-slot:modal-body>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="">Category name</label>
                            <input type="text" 
                                    class="form-control" 
                                    :class="(form_error.name) ? 'is-invalid' : null"
                                    placeholder="Category name" 
                                    v-model="formData.name"
                                    @keyup="() => form_error.name = null"
                                    >
                            <div class="error" v-if="form_error.name">{{ form_error.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="">Short description</label>
                            <input type="text" 
                                    class="form-control" 
                                    placeholder="Short description" 
                                    v-model="formData.short_description"
                                    >
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <div class="form-group">
                          <label class="form-label" for="">Slug</label>
                          <input type="text" class="form-control" placeholder="slug" v-model="formData.slug" readonly>
                        </div>
                    </div>
                </div>
                
                <div class="row col-md-12 mt-2">
                    <div class="form-group">
                      <label class="form-label">Status</label>
                      <select class="form-control" @change="form_error.status = ''" :class="(form_error.status) ? 'is-invalid' : null" v-model="formData.status">
                        <option value="">Select</option>
                        <option value="1">Active</option>
                        <option value="0">In-Active</option>
                      </select>
                    </div>
                    <div class="error" v-if="form_error.status">{{ form_error.status }}</div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-12">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" v-model="formData.show_on_index">
                            Show on index page ?
                          </label>
                        </div>
                    </div>
                </div> 
            </template>
        </AddEditModalVue>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import AddEditModalVue from '../../components/Modals/AddEditModal.vue'
import { notify } from "@kyvg/vue3-notification";

export default {
    data(){
        return {
            showAddEditModal:false,
            modal_heading:'Add Catgeory',
            formData : {
                name:null,
                short_description:null,
                slug:null,
                status:'',
                show_on_index:false,
                flag:'add'
            },
            form_error:{
                name:null,
                status:null
            }
        }
    },
    watch:{
        'formData.name':function(newValue, oldValue){

            let sluggable_string = (newValue) ? newValue.toLowerCase().replace(" ",'-') : null
            this.formData.slug = sluggable_string
            
        }
    },
    components:{
        AddEditModalVue
    },
    computed:{
        ...mapState('category',{
            any_backend_errors : (state) => state.errors,
            catList:(state) => state.categoryList
        })
    },
    methods:{
        handleModalOpen(){
            this.showAddEditModal = true
        },
        handleModalClose(){
            this.formData = {
                name:null,
                short_description:null,
                slug:null,
                status:'',
                flag:'add',
                category_id:null,
                show_on_index:false,
                
            }
            this.showAddEditModal = false
        },
        handleCategoryEdit(category_id){
            let select_category = this.catList.find((element => element.catId == category_id))
            if (select_category) {
                this.formData = {
                    name:select_category.name,
                    short_description:select_category.short_description,
                    slug:select_category.slug,
                    status:select_category.status,
                    flag:'edit',
                    category_id:select_category.catId,
                    show_on_index:(select_category.show_on_index == 1) ? true : false
                }
                this.modal_heading = "Edit Category"
                this.showAddEditModal = true
            }
        },
        async handleCategorySubmit(){
            let errors = this.form_error;
            let can_go_through = true
            // Check Validation
            if (!this.formData.name) {
                errors['name'] = 'Please provide catgeory name'
                can_go_through = false
            }else if(this.formData.name.length < 5 ){
                errors['name'] = 'Category name should be greater than 8 characters'
                can_go_through = false
            }
            
            if (![0,1].includes(Number(this.formData.status))) {
                errors['status'] = 'Please select any one option'
                can_go_through = false
            }

            this.form_error = errors
            
            if (can_go_through) {

                await this.$store.dispatch('category/addUpdateCategory',this.formData)
                let success_message = null;
                if (this.formData.flag == 'add') {
                    success_message = 'Category added succeefully'
                }else{
                    success_message = 'Category updated succeefully'
                }

                if (!this.any_backend_errors) {
                    this.formData = {
                        ...this.formData,
                        name:null,
                        slug:null,
                        status:''
                    }

                    notify({
                        title: "Category",
                        text: success_message,
                        type: 'success',
                    });

                    this.showAddEditModal = false
                    this.$store.dispatch('category/fetchCategory')
                }

            }
        },
        async handleDeletion(category_id){
            await this.$store.dispatch('category/deleteCategory', category_id)
        }
    },
    created(){
        this.$store.dispatch('category/fetchCategory')
    }
}
</script>

<style lang="scss" scoped>
.error{
    color:red;
}
</style>