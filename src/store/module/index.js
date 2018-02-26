import * as types from '../mutation-types'

const state = {
    indexData: {
        
    },//首页数据
    
}

const mutations = {
    [types.GET_INDEX_DATA] (state, data){
        state.indexData = data;
    },
}
export default {
    state,
    mutations
}
