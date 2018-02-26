import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import index from './module/index.js'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        index
    },
    actions,
    getters,
    strict: debug
})
