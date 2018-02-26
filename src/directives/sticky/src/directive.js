import Utils from '../../../util/utils'

const ctx = '@@Sticky'

var throttle = function (fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function () {
        fn.apply(context, args);
        lastExec = now;
    };

    return function () {
        context = this;
        args = arguments;

        now = Date.now();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (lastExec) {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            } else {
                timer = setTimeout(() => {
                    execute();
                }, diff);
            }
        } else {
            execute();
        }
    };
};

let getScrollTop = function (element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
    }

    return element.scrollTop;
}

let getComputedStyle = document.defaultView.getComputedStyle;

let getScrollEventTarget = function (element) {
    var currentNode = element
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        var overflowY = getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode
        }
        currentNode = currentNode.parentNode
    }
    return window
};

let isAttached = function (element) {
    let currentNode = element.parentNode
    while (currentNode) {
        if (currentNode.tagName === 'HTML') {
            return true
        }
        if (currentNode.nodeType === 11) {
            return false
        }
        currentNode = currentNode.parentNode
    }
    return false
}

let doBind = function () {
    if (this.binded) {
        return
    }

    this.binded = true

    let directive = this
    let element = directive.el
    let arg = directive.arg
    let value = directive.value

    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ipod") != -1) {
        element.classList.add('dtv-sticky')
        element.style[arg] = `${value}px`
    } else {
        let createDiv = document.createElement('div')
        createDiv.style.position = '-webkit-sticky'
        createDiv.style.position = 'sticky'
        if (['-webkit-sticky', 'sticky'].indexOf(createDiv.style.position) !== -1) {
            element.classList.add('dtv-sticky')
            element.style[arg] = `${value}px`
        } else {
            directive.scrollEventTarget = getScrollEventTarget(element)
            directive.scrollListener = throttle(doCheck.bind(directive), 10)
            directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener)
            let loadedExpr = element.getAttribute('sticky-loaded')

            if (loadedExpr) {
                this.vm.$watch(loadedExpr, function (value) {
                    if (value) {
                        let rec = element.getBoundingClientRect()
                        directive.top = element.offsetTop
                        directive.bottom = rec.bottom
                        directive.height = rec.height
                        doCheck.call(directive)
                    }
                })
            } else {
                let rec = element.getBoundingClientRect()
                directive.top = element.offsetTop
                directive.bottom = rec.bottom
                directive.height = rec.height
                doCheck.call(directive)
            }
        }
    }
}

let doCheck = function () {
    let directive = this
    let element = directive.el
    let scrollTop = getScrollTop(directive.scrollEventTarget)
    if (directive.arg === 'top') {
        // 固定顶部
        if (scrollTop >= directive.top - directive.value) {
            if (!directive.fixed) {
                element.classList.add('dtv-fixed')
                element.style[directive.arg] = `${directive.value}px`
                let nextEl = element.nextElementSibling
                let cssStyle = getComputedStyle(nextEl) || nextEl.currentStyle
                directive.paddingTop = parseInt(cssStyle.paddingTop)
                nextEl.style.paddingTop = (directive.paddingTop + directive.height) + 'px'
                directive.fixed = true
            }
        } else {
            if (directive.fixed) {
                element.classList.remove('dtv-fixed')
                let nextEl = element.nextElementSibling
                let cssStyle = getComputedStyle(nextEl) || nextEl.currentStyle
                directive.paddingTop = parseInt(cssStyle.paddingTop)
                nextEl.style.paddingTop = parseInt(directive.paddingTop - directive.height) + 'px'
                directive.fixed = false
            }
        }
    } else if (directive.arg === 'bottom') {
        /**
         * TODO
         */
    }
}

export default {
    bind(el, binding, vnode) {
        el[ctx] = {
            el,
            vm: vnode.context,
            arg: binding.arg,
            value: !isNaN(binding.value) ? Utils.calcPx(binding.value) : binding.value
        }
        //不启用sticky属性
        if (binding.value === 'disable') {
            return
        }
        let args = arguments

        el[ctx].vm.$on('hook:mounted', function () {
            el[ctx].vm.$nextTick(function () {
                if (isAttached(el)) {
                    doBind.call(el[ctx], args)
                }

                el[ctx].bindTryCount = 0

                let tryBind = function () {
                    if (el[ctx].bindTryCount > 3) {
                        return
                    }
                    el[ctx].bindTryCount++
                    if (isAttached(el)) {
                        doBind.call(el[ctx], args)
                    } else {
                        setTimeout(tryBind, 50)
                    }
                }
                tryBind()
            })
        })
    },
    unbind(el) {
        if (el[ctx].scrollEventTarget) {
            el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener)
        }

    }

}
