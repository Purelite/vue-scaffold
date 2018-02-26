import Vue from 'vue';

const ToastConstructor = Vue.extend(require('./toast.vue'));
let toastPool = [];

let getAnInstance = () => {
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ToastConstructor.prototype.close = function (cb) {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    cb();
    returnAnInstance(this);
};

let Toast = (options = {}) => {
    let duration = options.duration || 1200;

    let instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = typeof options === 'string' ? options : options.message;
    instance.position = options.position || 'middle';
    instance.className = options.className || '';
    instance.iconClass = options.iconClass || '';
    instance.callback = options.callback || function () {
        };
    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        instance.timer = setTimeout(function () {
            if (instance.closed || options.duration === 0) return;
            instance.close(instance.callback);
        }, duration);
    });
    return instance;
};

export default Toast;
