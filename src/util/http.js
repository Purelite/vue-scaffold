import Vue from 'vue'
import VueResource from 'vue-resource'
import Cookie from './js.cookie.js'
import router from '../router/router.js'
import utils from './utils.js'

Vue.use(VueResource)
Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = {withCredentials: true}

function showToast(msg, fn) {
    Vue.$toast({
        message: msg,
        callback: function () {
            fn && fn()
        }
    })
}

function goIndex() {
    router.push({name: 'Index'});
}

function refreshPage() {
    window.location.reload();
}


function _http(url, method, data) {
    return Vue.http[method](url, data).then((response) => {
        Vue.$loading(false);
        if (Number(response.data.status.status_code) == 0) {
            return response.data.result;
        } else if(Number(response.data.status.code) == 0){
            return response.data
        }else {
            let msg = response.data.status.status_reason
            let fn = '', applyfn = true
            if(response.data.status.code){
                switch (response.data.status.code) {
                    case '2':
                        fn = utils.doLogin()
                        break
                    default:
                        fn = ''
                        msg = response.data.status.message
                }
            }else{
                switch (response.data.status.status_code) {
                    case '120':
                        fn = utils.doLogin()
                        break;
                    default:
                        fn = '' 
                }
            }
            if (applyfn) {
                showToast(msg, fn)
            }
        }
    }, (response) => {
        Vue.$loading(false);
        Vue.$toast({
            message: '网络异常,请刷新后重试',
            duration: 2000 //O 不关闭
        })
        if (window.watcher) {
            watcher.ajaxErr({
                url: url,
                req: data,
                rep: response
            })
        }
    })
}

Vue.$_http = Vue.prototype.$_http = _http

export default _http
