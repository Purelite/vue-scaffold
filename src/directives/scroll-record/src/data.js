/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-01-06 15:33:13
 * @version $Id$
 */

/**
 * 还原页面数据
 */
import Store from './store.js'
import Vue from 'vue'

const store = new Store()

/**
 * 初始化
 */
const init = function ($route) {
    if (typeof this.$options.pageData != 'function') {
        throw '必须是以方法返回对象'
    }
    this.$options.pageData._url = store.getUrl($route)
    var keepAlive = store.getItem(this.$options.pageData._url)
    if (keepAlive) {
        return keepAlive
    }
    return this.$options.pageData.call(this)
}
/**
 * 保存数据
 */
const saveData = function () {
    var data = this.$options.pageData()
    var newData = {}
    Object.keys(data).forEach((k) => newData[k] = this.$data[k])
    newData['dataSaved'] = true;
    store.setItem(this.$options.pageData._url, newData)
}

export default {
    data() {
        return init.call(this, this.$route)
    },
    destroyed() { //组件卸载
        saveData.call(this) //存储数据
    },
    mounted(){
        if (this.dataSaved && this.$route.params.init != 1) {
            Vue.$loading(false);
        }
    },
    watch: {
        $route(to, from) { //当前组件路由发生改变
            saveData.call(this) //存储数据
            Object.assign(this.$data, init.call(this, to)) //重置路由数据
        }
    }
}
