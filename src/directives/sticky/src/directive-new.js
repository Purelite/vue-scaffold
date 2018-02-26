/*
 *
 *  v-sticky="{ zIndex: Number, stickyTop: Number }" or v-sticky="Number"
 <div v-sticky="{ zIndex: Number, stickyTop: Number }"> <!-- sticky wrapper, IMPORTANT -->
 CONTENT
 </div>
 *
 * */

import Utils from '../../../util/utils'

let listenAction
let stickyTop
let params
let zIndex

export default {
    bind(el, binding, vnode) {
        const elStyle = el.style
        const params = typeof binding.value === 'number' ? {top: binding.value, zIndex: 3} : {}
        stickyTop = params.top ? Utils.calcPx(params.top) : 0
        zIndex = params.zIndex || 3

        if (!binding.modifiers.fixed) {
            elStyle.position = '-webkit-sticky'
            elStyle.position = 'sticky'

            // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
            if (~elStyle.position.indexOf('sticky')) {
                elStyle.top = `${stickyTop}px`
                elStyle.zIndex = zIndex
                return
            }
        }
        let childStyle = el.firstElementChild.style
        childStyle.cssText = `top: ${stickyTop}px; z-index: ${zIndex}`;
        el.firstElementChild.className = el.firstElementChild.className + ' sticky-fix';

        let active = false

        const sticky = () => {
            if (active) {
                return
            }
            if (!elStyle.height) {
                elStyle.height = `${el.offsetHeight}px`
            }
            childStyle.position = 'fixed'
            active = true
        }

        const reset = () => {
            if (!active) {
                return
            }
            childStyle.position = ''
            active = false
        }

        const check = () => {
            const offsetTop = el.getBoundingClientRect().top

            if (offsetTop && offsetTop <= stickyTop) {
                sticky()
                return
            }
            reset()
        }

        listenAction = () => {
            check()
        }
        vnode.context.$nextTick(() => {
            window.addEventListener('scroll', listenAction)
        })
    },

    unbind(el, binding, vnode) {
        window.removeEventListener('scroll', listenAction)
    },

}