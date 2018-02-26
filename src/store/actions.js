import Vue from 'vue'
import api from '../apis/apis.js'
import * as types from './mutation-types.js'
import cookie from  '../util/js.cookie.js'

//首頁推薦數據
export const getIndexData = ({commit}, param) => {
    Vue.$loading(true);
    ;(async () => {
        //let res = await Vue.$_http(api.getIndexData, 'jsonp', {param: JSON.stringify(param)})
        //commit(types.GET_INDEX_DATA, res)
    })()
}