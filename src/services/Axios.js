import axios from 'axios'

const Base_URL = 'http://localhost:8000/'

const Axios = axios.create({
    baseURL: Base_URL
})

export default Axios;