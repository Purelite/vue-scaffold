/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-01-06 15:33:13
 * @version $Id$
 */

import Store from './store.js'

const store = new Store()
const scrollTop = (el, value) => {
    if (value === undefined) return window.scrollY
    // console.log('scrollTop===',value)
    window.scrollTo(el.scrollX, value)

}
var route;
const scroll = () => { //监听滚动条改变事件
    var top = scrollTop(event)
    // console.log('scroll--------',event.target.URL,top)
    store.setItem(/*event.target.URL*/store.getUrl(route), top)
}

export default {
    inserted(el, binding, vnode) {
        const init = (to) => {
            route = to;
            //var _el = binding.expression == 'window' ? window : el
            var _url = store.getUrl(to)//location.href
            //_el.addEventListener('scroll', scroll, false) //绑定滚动事件
            window.addEventListener('scroll', scroll, false) //绑定滚动事件
            var top = store.getItem(_url)
            // console.log('initTop===',top)
            // binding.value 为false时不滚动
            // alert(top && (binding.value ===true || binding.value === undefined))
            if (top && (binding.value === true || binding.value === undefined)) {
                scrollTop(window, top)
            } else {
                scrollTop(window, 0)
            }
        }
        init(vnode.context.$route) //DOM渲染完成后重新初始化
        vnode.context.$watch('$route', init) //路由更改后，重新初始化
    },
    unbind(_el, binding, vnode) {
        route = vnode.context.$route;
        window.removeEventListener('scroll', scroll, false) //解除滚动事件绑定
    }
}
