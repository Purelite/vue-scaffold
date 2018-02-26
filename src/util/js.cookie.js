/**
 * [getCookie description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */

function getCookie(name) {
    var cookie_start = document.cookie.indexOf(name + "="),
        cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? "" : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
};

/**
 *   isSession 标识cookie是否在关闭浏览器后清除,默认有效期一个月
 *   $.setCookie(key, value, isSession)
 *
 *   $.setCookie({key1:value1, key2:value2}, isSession)
 *
 */
function setCookie(name, value, expiresTime, isSession) {
    var expiresTime = expiresTime || 2592000000; //1month 单位ms
    var expires = new Date();
    expires.setTime(expires.getTime() + expiresTime);
    var path_domain = "; path=/" + (document.domain.indexOf("domain.com") != -1 ? "; domain=domain.com" : "");
   


    if (typeof(name) === "object") {
        for (var v in name) {
            if (name[v] != '' || name[v] === 0 || name[v].length) { //如果值为空，就不设置cookie
                console.log(Number(name[v]) + '_' + name[v].length)
                //console.log(name[v].length)
                var cookie_content = escape(v) + "=" + escape(name[v]);
                document.cookie = cookie_content + "; expires=" + expires.toGMTString() + path_domain;
            }
        }
    } else {
        if (value != '' || value === 0 || value.length) { ////如果值为空，就不设置cookie
            var cookie_content = escape(name) + "=" + escape(value);
            document.cookie = cookie_content + (isSession ? "" : ("; expires=" + expires.toGMTString())) + path_domain;
        }
    }
};

function delCookie(name) {
    var path_domain = "; path=/" + (document.domain.indexOf("domain.com") != -1 ? "; domain=domain.com" : "");
    document.cookie = escape(name) + "=; expires=" + new Date(0).toUTCString() + path_domain;
};

function clearCookie() {
    var _keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (_keys) {
        var l = _keys.length;
        for (var i = l; i--;) {
            delCookie(_keys[i]);
        }
    }
};

let ignores = ['cuid', 'platform'];

function clearCookieWithoutIgnores() {
    var _keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (_keys) {
        var l = _keys.length;
        for (var i = l; i--;) {
            if (ignores.indexOf(_keys[i]) == -1) {
                delCookie(_keys[i]);
            }
        }
    }
}

function getInfos() {
    var _keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    var infos = {};
    if (_keys) {
        var l = _keys.length;
        for (var i = l; i--;) {
            infos[_keys[i]] = getCookie(_keys[i])
        }
    }
    return infos;
}

export default {
    get: getCookie,
    set: setCookie,
    remove: delCookie,
    clear: clearCookie,
    clearWithout: clearCookieWithoutIgnores,
    getInfos: getInfos,
}
