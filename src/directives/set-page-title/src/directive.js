/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-01-06 15:33:13
 * @version $Id$
 */

function setPageTitle(title) {
    let _title = title || '确认购买'
    document.title = _title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
        let iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.setAttribute('src', 'https://s.geilicdn.com/cart/20182/images/favicon.ico')
        let iframeCallback = function () {
            setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback)
                document.body.removeChild(iframe)
            }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
    }
}

const install = function (Vue) {
    Vue.directive('title', function (el, binding) {
        setPageTitle(binding.value)
    })
};

if (window.Vue) {
    Vue.use(install)
}

export default install;
