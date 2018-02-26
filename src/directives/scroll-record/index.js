/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-01-06 15:32:11
 * @version $Id$
 */
import scrollRecord from './src/record.js'
import pageData from './src/data.js'

const install = function (Vue) {
    Vue.directive('scroll-record', scrollRecord)
}

if (window.Vue) {
    Vue.use(install)
}

scrollRecord.install = install
export {scrollRecord, pageData}

