import Vue from 'vue'
import Toast from './toast/index.js'
import Msg from './message-box/index.js'
import Loading from './loading/index.js'

Vue.$toast = Vue.prototype.$toast = Toast
Vue.$msg = Vue.prototype.$msg = Msg
Vue.$loading = Vue.prototype.$loading = Loading

export {
    Toast,
    Msg,
    Loading
}