export default class commonValidation {
    static checkEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        {
          return (true)
        }else{
            return (false)
        }
    }

    static checkPassword(password){
        if (! password) {
            return false
        } else if (password.length > 6 && password.length < 20) {
            return true
        }else{
            return false
        }
    }
}