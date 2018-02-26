/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-03-10 13:35:46
 * @version $Id$
 */
import '../assets/common.css'
export default {
    data() {
        return {
            open: false,
            touchStatusCache: {
                clientY: 0,
                scrolling: false
            }
        }
    },
    methods: {
        lockBody(type) {
            let className = document.documentElement.className;
            if (type) {
                document.documentElement.className = className + ' lock-body';
            } else {
                document.documentElement.className = className.replace(/lock\-body/g, '');
            }
        },
        removeWheelEvent(e) {
            e.stopPropagation()
            e.preventDefault()
            e.cancelBubble = false
            return false
        },
        preventScroll(e) {
            document.addEventListener('mousewheel', this.removeWheelEvent, false)
            document.addEventListener('touchmove', this.removeWheelEvent, false)
        },
        enableScrollable() {
            this.lockBody(true);
            let $scrollable = Array.prototype.slice.call(this.$el.querySelectorAll('.wd-popup-scrollable,.lock-scrollable'))
            $scrollable.forEach((e) => {
                e.addEventListener('mousewheel', this.enableWheelScrollEventHandler.bind(this, e), false)
                e.addEventListener('touchmove', this.enableTouchScrollEventHandler.bind(this, e), false)
                e.addEventListener('touchstart', this.touchStartEventHandler.bind(this, e), false)
            })
        },
        enableWheelScrollEventHandler(el, e) {
            e.stopPropagation()
            e.cancelBubble = false
            /*
             * 滑到顶部咯
             */
            if (e.deltaY < 0 && el.scrollTop === 0) {
                e.preventDefault()
                return false
            }
            /*
             * 滑到底部咯
             */
            if (e.deltaY > 0 && el.offsetHeight + el.scrollTop >= el.scrollHeight) {
                e.preventDefault()
                return false
            }
        },
        enableTouchScrollEventHandler(el, e) {
            e.stopPropagation()
            e.cancelBubble = false
            if (!this.touchStatusCache.clientY) {
                this.touchStatusCache.clientY = e.touches[0].clientY
            } else {
                let delta = e.touches[0].clientY - this.touchStatusCache.clientY
                this.touchStatusCache.clientY = e.touches[0].clientY
                /*
                 * 滑到顶部咯
                 */
                if (delta > 0 && el.scrollTop === 0) {
                    e.preventDefault()
                }
                /*
                 * 滑到底部咯
                 */
                //if(delta < 0 && el.offsetHeight + el.scrollTop === el.scrollHeight) {
                if (delta < 0 && el.offsetHeight + el.scrollTop >= el.scrollHeight) {
                    e.preventDefault()
                }
            }
        },
        touchStartEventHandler(el, e) {
            if (!this.touchStatusCache.scrolling) {
                this.touchStatusCache.scrolling = true
                /*
                 * 如果滑动时在滑动区域头部/尾部，移动1px来防止背景跟随滚动

                 if (e.currentTarget.scrollTop === 0) {
                 e.currentTarget.scrollTop = 1
                 } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                 e.currentTarget.scrollTop -= 1
                 }*/
                this.touchStatusCache.scrolling = false
            }
            this.touchStatusCache.clientY = e.touches[0].clientY
        },
        allowScroll() {
            document.removeEventListener('mousewheel', this.removeWheelEvent, false)
            document.removeEventListener('touchmove', this.removeWheelEvent, false)
        },
        disableScrollable() {
            this.lockBody(false);
            let $scrollable = Array.prototype.slice.call(this.$el.querySelectorAll('.wd-popup-scrollable,.lock-scrollable'))
            $scrollable.forEach((e) => {
                e.removeEventListener('mousewheel', this.enableWheelScrollEventHandler.bind(this, e), false)
                e.removeEventListener('touchmove', this.enableTouchScrollEventHandler.bind(this, e), false)
                e.removeEventListener('touchstart', this.touchStartEventHandler.bind(this, e), false)
            })
        }
    },
}