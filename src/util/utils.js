/**
 * 工具集
 */
import Vue from 'vue'
import Api from '../apis/apis.js'
import Cookie from './js.cookie.js'


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var utils = {
    updateWXShare(o){
        wxShare.updateStatus(o)
    },
    /**
     * [delSpecialChar 删除特殊符号]
     * @param  {[type]} s [description]
     * @return {[type]}   [description]
     */
    delSpecialChar: function (s) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
        var str = "";
        for (var i = 0; i < s.length; i++) {
            str = str + s.substr(i, 1).replace(pattern, '');
        }
        return str
    },
    /**
     * [isNullObj description]
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    isNullObj: function (obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    },
    ua: function () {
        return navigator.userAgent.toLowerCase();
    },
    isMobile: function () {
        return utils.ua().match(/iPhone|iPad|iPod|Android|IEMobile/i);
    },
    isAndroid: function () {
        return utils.ua().indexOf("android") != -1
    },
    isIOS: function () {
        var a = utils.ua();
        return (a.indexOf("iphone") != -1 || a.indexOf("ipad") != -1 || a.indexOf("ipod") != -1);
    },
    isWeixin: function () {
        return (utils.ua().indexOf("micromessenger") != -1);
    },
    isQQ: function () {
        return (utils.ua().indexOf("qq") != -1);
    },
    /**
     * [getSringBytes 字符串字节长度]
     * @param  {[type]} s [description]
     * @return {[type]}   [description]
     */
    getSringBytes: function (s) {
        var cArr = s.match(/[^x00-xff]/ig);
        return s.length + (cArr === null ? 0 : cArr.length);
    },
    /**
     * [setTtile description] setPage title
     * @param {[type]} title [description]
     */
    setPageTtile(title) {
        document.title = title || 'Title';
        if (utils.isIOS()) {
            let iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            var iframeCallback = function () {
                setTimeout(() => {
                    iframe.removeEventListener('load', iframeCallback)
                    document.body.removeChild(iframe)
                }, 0)
            }
            iframe.addEventListener('load', iframeCallback)
            document.body.appendChild(iframe)
        }
    },
    /**
     * [对连续事件的频率控制]
     * @param  {[type]} func      [description]
     * @param  {[type]} wait      [description]
     * @param  {[type]} immediate [description]
     * @return {[type]}           [description]
     */
    debounce: function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function () {
            var last = new Date().getTime() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    },
    /**
     * [throttle description]
     * @param  {[type]} func      [description]
     * @param  {[type]} wait      [description]
     * @param  {[type]} immediate [description]
     * @return {[type]}           [description]
     */
    throttle: function (func, wait, scope) {
        wait || (wait = 250)
        var last, deferTimer
        return function () {
            var context = this
            var now = +new Date,
                args = arguments;
            if (last && now < last + wait) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    func.apply(context, args)
                }, wait)
            } else {
                last = now
                func.apply(context, args)
            }
        }
    },
    /**
     * @param  {[type]} param [获取UA中的参数]
     * @return {[type]}       [description]
     */
    getParamByUA: function (param) {
        if (!param) {
            return;
        }
        var reg = new RegExp(param + "\/([\\S]*)\\b", "i"),
            result = reg.exec(window.navigator.userAgent);
        return result && result[1];
    },
    /**
     * 从URL（的查询字符串）中取key对应的值
     */
    urlQuery: function (url, name) {
        let query = '';
        if (url.indexOf('?') > -1) {
            query = url.substr(url.indexOf('?') + 1)
        }
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        let r = query.match(reg); // 匹配目标参数
        if (r !== null) {
            return unescape(r[2]);
        }

        return null; // 返回参数值
    },
    /**
    * 埋点统计
    */
    trackAction: function(obj){
        let actionName = obj.actionName;

        if(actionName && TrackActionName[actionName] && window.spider){
          window.spider.trackAction({
            actionName: TrackActionName[actionName]
          })
        }
    },
}


Vue.$utils = Vue.prototype.$utils = utils
export default utils
