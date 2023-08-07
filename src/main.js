import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from '@/services/Axios'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

app.use(store)
    .use(router)
    .use(Axios)
    .use(Notifications)

app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
