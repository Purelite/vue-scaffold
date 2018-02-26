<template>
    <div class="ui-toast-mask" v-show="visible">
        <div class="ui-toast" :class="customClass" :style="{ 'padding': iconClass === '' ? '14px' : '20px' }">
            <i class="ui-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
            <span class="ui-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{message}}</span>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            message: String,
            className: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'middle'
            },
            iconClass: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                visible: false
            };
        },

        computed: {
            customClass() {
                var classes = [];
                switch (this.position) {
                    case 'top':
                        classes.push('placetop');
                        break;
                    case 'bottom':
                        classes.push('placebottom');
                        break;
                    default:
                        classes.push('placemiddle');
                }
                classes.push(this.className);

                return classes.join(' ');
            }
        }
    };
</script>
<style src="./toast.css"></style>
