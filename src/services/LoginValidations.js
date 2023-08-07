import commonValidations from './commonValidations'

export default class LoginValidations {
    constructor(email, password){
        this.email = email;
        this.password = password
    }

    checkValidations(){
        let errors = [];
        
        // Email validation
        if (!commonValidations.checkEmail(this.email)) {
           errors['email'] = 'Please provide a valid email address' 
        }
        
        // Password validation
        if (!commonValidations.checkPassword(this.password)) {
            errors['password'] = 'Password must contain at least one numeric digit, one uppercase and one lowercase letter' 
        }
        
        return errors;
    }
}