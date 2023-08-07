import { mapState, mapActions } from 'vuex';
import ProductFields from '@/components/Forms/ProductFields.vue'
import ProductFormValidation from '@/services/ProductFormValidation';
import { notify } from "@kyvg/vue3-notification";

import firebase from '@/services/firebaseInit';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
    components:{
        ProductFields
    },
    data(){
        return {
            isEdit:false,
            error_exists:false,
            uploaded_images:null,
            invalidImage:false,
            invalidDimensions:false,
            formData:{
                category_id:'',
                title:null,
                short_description:null,
                description:null,
                regular_price:0,
                sale_price:0,
                quantity:10,
                product_image:null,
                status:1
            },
            form_errors:{
                title:null,
                short_description:null,
                regular_price:null,
                quantity:null,
                sale_price:null,
                product_image:null,
                category_id:null
            },
        }
    },
    methods:{
        ...mapActions({
            addUpdateProduct:'product/addUpdateProduct',
            fetchProductByID : 'product/fetchProductByID'
        }),
        async createUpdateProduct(product_id = null){

            // Validate Submit Form 
            let validation = new ProductFormValidation(this.formData)
            let errors = validation.checkFormValidation()
            let check_validation_array = ['title','short_description','regular_price','quantity','sale_price','product_image','category_id']
            
            let state = this
            state.error_exists = false
            check_validation_array.forEach((element) => {
                if (element in errors) {
                    state.error_exists = true
                    state.form_errors[element] = errors[element]
                }

            })

            // Based on Validation Submit form submission
            if (!state.error_exists) {

                const form_Data = new FormData();
                const This = this
                Object.keys(this.formData).forEach(key => form_Data.append(key, This.formData[key]));

                if (this.uploaded_images) {
                    form_Data.append('file',this.uploaded_images)
                }

                await this.addUpdateProduct({ postData:form_Data , product_id })

                if (!this.is_error) {
                     notify({
                        title: (product_id) ? "Product Updated" : "Product Added",
                        text: (product_id) ? "Product updated successfully" : "Product added successfully",
                        type: 'success',
                        position:'center'
                    });
                    this.$router.push({name:'ProductsList'})
                }
            }

        },
        handleImageUpload(file){
            let vm = this
            this.uploaded_images = file
            this.ImageUploadOnFireBase()
        },
        ImageUploadOnFireBase(){
            let prodState = this
            if (this.uploaded_images) {
                
                // Generate a unique name for the image file (you can use any logic here)
                const imageName = `ecommerce/${Date.now()}-${this.uploaded_images.name}.jpg`;
                
                const storage = getStorage();
                const storageRef = ref(storage, imageName);
                
                const uploadTask = uploadBytesResumable(storageRef, this.uploaded_images);
                
                prodState.$store.commit('SET_LOADER',true,{root:true})

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        prodState.$store.commit('SET_LOADER',false,{root:true})
                        // Handle unsuccessful uploads
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            prodState.$store.commit('SET_LOADER',false,{root:true})
                            prodState.formData.product_image = downloadURL
                        });
                    }
                );


                
            }
        },
        
    }, 
    computed:{
        ...mapState('product',{
            editSelectedProduct: (state) => state.editSelectedProduct,
            is_error: (state) => state.errors,
            pageRequiredData:(state) => state.productRequiredData
        }),
        
    },
}