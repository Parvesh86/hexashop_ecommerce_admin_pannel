export default class ProductFormValidation{
    constructor(formData){
        this.formData = formData
    }

    checkFormValidation(){

        let errors = [];
        
        if (this.formData.hasOwnProperty('title') && !this.formData.title) {
            errors['title'] = 'Please provide a valid title for product'
        }

        if (this.formData.hasOwnProperty('short_description') && !this.formData.short_description) {
            errors['short_description'] = 'Please provide short description'
        }

        if (this.formData.hasOwnProperty('regular_price') && !this.formData.regular_price > 0 ) {
            errors['regular_price'] = 'Regular price should be greater than 0'
        }

        if (this.formData.hasOwnProperty('quantity') && !this.formData.quantity > 0 ) {
            errors['quantity'] = 'Quantity must be greater than 0'
        }

        if (this.formData.hasOwnProperty('product_image') && !this.formData.product_image ) {
            errors['product_image'] = 'Please provide a valid image for product'
        }
        if (this.formData.hasOwnProperty('category_id') && !this.formData.category_id ) {
            errors['category_id'] = 'Please select category'
        }
        
        if (this.formData.hasOwnProperty('sale_price') && this.formData.sale_price > 0 ) {
            
            if (this.formData.sale_price > this.formData.regular_price) {
                
                errors['sale_price'] = 'Sale price cannot be greater than actual cost of the product'
            }

        }


        return errors;
    }
}