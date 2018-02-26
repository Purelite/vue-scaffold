/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-01-06 15:33:13
 * @version $Id$
 */
/**
 * [isSeeing description]
 * @return {Boolean} [description]
 */
/*function isSeeing(el, option) {
 const setting = Object.assign({
 top: 0, //元素在顶部伸出的距离
 right: 0, //元素在右边伸出的距离才
 bottom: 0, //元素在底部伸出的距离
 left: 0 //元素在左边伸出的距离
 }, option)

 let bcr = el.getBoundingClientRect(); //取得元素在可视区的位置

 let mw = el.offsetWidth; //元素自身宽度
 let mh = el.offsetHeight; //元素自身的高度
 let w = window.innerWidth; //视窗的宽度
 let h = window.innerHeight; //视窗的高度
 let boolX = (!((bcr.right - setting.left) <= 0 && ((bcr.left + mw) - setting.left) <= 0) && !((bcr.left + setting.right) >= w && (bcr.right + setting.right) >= (mw + w))); //上下符合条件
 let boolY = (!((bcr.bottom - setting.top) <= 0 && ((bcr.top + mh) - setting.top) <= 0) && !((bcr.top + setting.bottom) >= h && (bcr.bottom + setting.bottom) >= (mh + h))); //上下符合条件
 return el.width != 0 && el.height != 0 && boolX && boolY
 }*/

function imgLoad(Vue, options) {
    options = options || {
            fadein: false,
            speed: 20,
            nohori: false,
        }
    if (options.speed) {
        var cntr = 0
        var lastCntr = 0
        var diff = 0
        var scrollEnd = document.createEvent('HTMLEvents');
        scrollEnd.initEvent('scrollEnd', true, false)
        scrollEnd.eventType = 'message'

        function enterFrame() {
            if (cntr != lastCntr) {
                diff++
                if (diff == 5) {
                    window.dispatchEvent(scrollEnd)
                    cntr = lastCntr
                }
            }
            requestAnimationFrame(enterFrame);
        }

        window.requestAnimationFrame(enterFrame)
        document.addEventListener('scroll', function () {
            lastCntr = cntr
            diff = 0
            cntr++
        }, true)
    }
    //compute scroll speed
    var lastPosY = document.body ? document.body.getBoundingClientRect().top : document.head.parentNode.getBoundingClientRect().top
    var lastPosX = document.body ? document.body.getBoundingClientRect().left : document.head.parentNode.getBoundingClientRect().left
    var lastSpeeds = []
    var aveSpeed = 0

    function getSpeed(el) {
        var curPosY = el ? el.getBoundingClientRect().top : 0
        var curPosX = el ? el.getBoundingClientRect().left : 0
        var speedY = lastPosY - curPosY
        var speedX = lastPosX - curPosX
        if (lastSpeeds.length < 10) {
            lastSpeeds.push((speedY + speedX) / 2)
        } else {
            lastSpeeds.shift()
            lastSpeeds.push((speedY + speedX) / 2)
        }
        var sumSpeed = 0
        lastSpeeds.forEach(function (speed) {
            sumSpeed += speed
        })
        aveSpeed = Math.abs(sumSpeed / lastSpeeds.length)
        lastPosY = curPosY
        lastPosX = curPosX
    }

    document.addEventListener('scroll', function (e) {
        if (!options.speed) {
            return
        }
        var el = null
        for (var i = 0; i < e.target.childNodes.length; i++) {
            if (e.target.childNodes[i].nodeType == 1) {
                el = e.target.childNodes[i]
                break;
            }
        }
        getSpeed(el)
    }, true)

    function bind(el, binding) {
        var value = binding.value
        if (!value) {
            return;
        }
        var isFadeIn = options.fadein || false
        var isNoHori = options.nohori || false
        if (isFadeIn && !el.getAttribute('loaded')) {
            el.style.opacity = 0
            el.style.transition = 'opacity .2s'
            el.style.webkitTransition = 'opacity .2s'
        }
        var compute = function () {
            if (el === null) {
                return;
            }
            var rect = el.getBoundingClientRect();
            var vpWidth = document.head.parentNode.clientWidth
            var vpHeight = document.head.parentNode.clientHeight
            var loadImg = function () {
                el.src = value
                el.addEventListener('load', onloadEnd)
                window.removeEventListener('scrollEnd', compute, true)
                window.removeEventListener('resize', compute, true)
                window.removeEventListener('scroll', computeBySpeed, true)
                lastSpeeds = []
            }.bind(this)
            if (el.src == value) return
            if (isNoHori) {
                if (rect.bottom >= 0 && rect.top <= vpHeight) {
                    loadImg()
                }
            } else if (rect.bottom >= 0 && rect.top <= vpHeight && rect.right >= 0 && rect.left <= vpWidth) {
                loadImg()
            }
        }.bind(this)
        var computeBySpeed = function () {
            if (options.speed && aveSpeed > options.speed) return
            compute()
        }.bind(this)
        var onload = function () {
            compute();
            el && el.removeEventListener('load', onload)
            window.addEventListener('scrollEnd', compute, true)
            window.addEventListener('resize', compute, true)
            window.addEventListener('scroll', computeBySpeed, true)
        }.bind(this)
        var onloadEnd = function () {
            if (el === null) {
                return;
            }
            if (isFadeIn) {
                el.style.opacity = 1
            }
            el.setAttribute('loaded', true);
            el.removeEventListener('load', onloadEnd)
        }.bind(this)
        el.addEventListener('load', onload)

    }

    Vue.directive('lazyload', {bind})
}

const install = function (Vue, options) {
    imgLoad(Vue, options);
}

if (window.Vue) {
    Vue.use(install);
}
export default install;
