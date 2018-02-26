<template>
    <div class="ui-loading-mask" v-show="visible">
        <div class="ui-loading">
            <div class="ui-loading-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                     preserveAspectRatio="xMidYMid"
                     class="uil-default">
                    <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(0 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(30 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(60 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(90 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(120 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(150 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(180 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(210 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(240 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(270 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(300 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s'
                                 repeatCount='indefinite'/>
                    </rect>
                    <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff'
                          transform='rotate(330 50 50) translate(0 -30)'>
                        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s'
                                 repeatCount='indefinite'/>
                    </rect>
                </svg>
            </div>
            <span class="ui-loading-text">{{message}}</span>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            message: String
        },

        data() {
            return {
                visible: false
            };
        }
    };
</script>
<style>
    .ui-loading-mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: transparent;
        z-index: 10001;
    }

    .ui-loading {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 194px;
        height: 172px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #FFF;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        transition: opacity .3s linear;
    }

    .ui-loading-icon {
        fill: #FFF;
        width: 80px;
        height: 80px;
        margin: 20px auto 10px;
    }

    .ui-loading-text {
        font-size: 28px; /*px*/
    }
</style>
