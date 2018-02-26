<template>
    <div v-show="loadShow" class="page-loading">
        <div class="spinner"></div>
    </div>
</template>

<script>
    export default {
        props: ['show'],
        computed: {
            loadShow: function () {
                return this.show
            }
        }
    }
</script>

<style lang="sass" scope>
    .page-loading {
        text-align: center;
        height: 100px;
        line-height: 100px;
    }

    .spinner {
        display: inline-block;
        vertical-align: middle;
        animation: spinner-rotate 0.8s infinite linear;
        border: 8px solid transparent;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        border-top-color: #CCC;
        border-left-color: #CCC;
        border-bottom-color: #CCC;
    }

    @keyframes spinner-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>