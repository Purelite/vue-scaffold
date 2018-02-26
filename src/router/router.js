import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './route-config.js'
import utils from '../util/utils.js'
import Cookie from '../util/js.cookie.js'
import Api from '../apis/apis.js'

Vue.use(VueRouter)
const router = new VueRouter(configRouter)

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to,from) => {

});

export default router
