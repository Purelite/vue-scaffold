import Sticky from './directive-new'

const install = function (Vue, options) {

    Vue.directive('sticky', Sticky)
}

Sticky.install = install
export default Sticky
