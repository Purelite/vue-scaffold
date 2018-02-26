const install = function (Vue) {
    Vue.directive('loading', {
        inserted: function (el, binding) {
            Vue.$loading(true);
        },
        unbind: function (el, binding) {
            Vue.$loading(false);
        }
    })
}
export default install;
