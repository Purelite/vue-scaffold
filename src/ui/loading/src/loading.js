import Vue from 'vue';

const LoadingConstructor = Vue.extend(require('./loading.vue'));
let instance = null;

let getAnInstance = () => {
    if (!instance) {
        instance = new LoadingConstructor({
            el: document.createElement('div')
        });
    }
    return instance;
};


LoadingConstructor.prototype.close = function (cb) {
    this.visible = false;
    cb();
};

let Loading = (options) => {
    if (typeof options == 'boolean') {
        options = {visible: options}
    }
    let instance = getAnInstance();
    instance.message = options.message || '正在加载...';
    instance.callback = options.callback || function () {
        };
    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        if (options.visible) {
            instance.visible = options.visible;
        } else {
            instance.close(instance.callback);
        }
    });

    return instance;
};

export default Loading;
