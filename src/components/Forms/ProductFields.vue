<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <div class="row clearfix">
                    <div class="col-12">
                        <div class="form-group">
                            <p style="font-size: 20px">
                                <slot name="page_title"></slot>
                                <em class="text-danger">*</em>
                            </p>
                            <input  type="text" 
                                    class="form-control form-control-lg" 
                                    :class="(form_errors.title) ? 'is-invalid' : null "
                                    placeholder="Product Title" 
                                    v-model="formData.title"
                                    style="font-size: 1.25rem!important;"
                                    @keyup="() => form_errors['title'] = null "
                                    required>
                            <div class="error" v-if="form_errors.title">{{ form_errors.title }}</div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <textarea class="form-control" 
                                                        :class="(form_errors.short_description) ? 'is-invalid' : null "
                                                        rows="6"
                                                        maxlength="250"
                                                        placeholder="Project Short Description" 
                                                        required 
                                                        spellcheck="true"
                                                        v-model="formData.short_description"
                                                        @keyup="() => form_errors['short_description'] = null "
                                                        style="resize:none"></textarea>
                                            <div class="error" v-if="form_errors.short_description">{{ form_errors.short_description }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <textarea class="form-control" 
                                                        rows="12" placeholder="Project Description" 
                                                        style="resize:none" 
                                                        v-model="formData.description"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-5">
                                        <span style="font-size: 30px">
                                            Gallery
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" style="min-height: 300px;">
                                <div class="form-group">
                                    <label class="custom-file">
                                        <input class="custom-file-input" type="file" @change="handleImage" accept="image/*">
                                        <span class="custom-file-control"></span>
                                    </label>
                                    <div class="error" v-if="form_errors.product_image">{{ form_errors.product_image }}</div>
                                </div>
                                <div class="your-file">
                                    <img :src="imgSRC" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-5">
                                        <span style="font-size: 30px">
                                            Product data
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" style="min-height: 300px;">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Regular price<em class="text-danger">*</em></label>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="number" 
                                                    min="0" 
                                                    class="form-control" 
                                                    :class="(form_errors.regular_price) ? 'is-invalid' : null "
                                                    autocomplete="off" 
                                                    placeholder="Regular price" 
                                                    @keyup="() => form_errors['regular_price'] = null "
                                                    v-model="formData.regular_price">
                                            <div class="error" v-if="form_errors.regular_price">{{ form_errors.regular_price }}</div>
                                        </div>      
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Sale price</label>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="number" 
                                                    class="form-control" 
                                                    autocomplete="off" 
                                                    placeholder="Sale price"
                                                    :class="(form_errors.sale_price) ? 'is-invalid' : null "
                                                    @keyup="() => form_errors['sale_price'] = null "
                                                    v-model="formData.sale_price">
                                            <div class="error" v-if="form_errors.sale_price">{{ form_errors.sale_price }}</div>
                                        </div>      
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Product Quantity<em class="text-danger">*</em></label>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="number" 
                                                    min="0" 
                                                    placeholder="Quantity" 
                                                    name="ProductQuantity" 
                                                    class="form-control"
                                                    @keyup="() => form_errors['quantity'] = null "
                                                    :class="(form_errors.quantity) ? 'is-invalid' : null "
                                                    v-model="formData.quantity"
                                                    required>
                                            <div class="error" v-if="form_errors.quantity">{{ form_errors.quantity }}</div>                                    </div>      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
            <div class="col-lg-4">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>
                                    Save Product
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="from-label"> Status <em class="text-danger">*</em></label>
                                            <select class="form-control" v-model="formData.status">
                                                <option value=" ">Select</option>
                                                <option value="1">Active</option>
                                                <option value="0">In-Active</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-primary" @click="$emit('submitForm')">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>
                                    Product Category
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row clearfix">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label class="form-label">Product Category<em class="text-danger">*</em></label>
                                                <select class="form-control" v-model="formData.category_id" :class="(form_errors.category_id) ? 'is-invalid' : null ">
                                                <option value="">Select Category</option>
                                                <template v-if="required_data && required_data.categories.length > 0 ">
                                                    <option v-for="{category_id, name} in required_data.categories" 
                                                            :key="category_id"
                                                            :value="category_id">
                                                        {{ name }}
                                                    </option>
                                                </template>
                                            </select>
                                            <div class="error" v-if="form_errors.category_id">{{ form_errors.category_id }}</div> 
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
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
                imgSRC:this.formData.product_image
            }
        },
        props:{
            required_data:{
                type:Object
            },
            formData:{
                type:Object,
                required:true
            },
            isEdit:{
                type:Boolean,
                required:true
            },
            form_errors :{
                type:Object,
                required:true
            }
        },
        methods :{
            syncFields(field_name){
                this.form_errors[field_name] = null
            },
            handleImage(event){

                const uploaded_images = event.target.files[0];
                this.imgSRC = URL.createObjectURL(uploaded_images)
                this.$emit('uploadImage',uploaded_images)
            }
        }
    }
</script>

<style lang="scss" scoped>
.error{
    color:red;
}
.your-file img {
    margin-top: 25px;
    width: 25%;
}
</style>