//async support
import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import store from './store'
import router from './router/router.js'
import http from './util/http.js'
import utils from './util/utils.js'
import UI from './ui/index.js'
import infiniteScroll from './directives/infinite-scroll/index.js'
import setPageTitle from './directives/set-page-title/index.js'
import loading from './directives/loading/index.js'
import sticky from './directives/sticky/index.js'
import {scrollRecord}  from './directives/scroll-record/index.js'
import 'lazysizes'
import 'babel-polyfill'
Vue.use(scrollRecord)
Vue.use(infiniteScroll)
Vue.use(setPageTitle)
Vue.use(loading)
Vue.use(sticky)



let app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render(h) {
        return (
            <div>
                <router-view class="main-view" v-title={this.$route.meta.title}></router-view>
            </div>
        )
    }
})
