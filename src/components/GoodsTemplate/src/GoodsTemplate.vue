<template>
    <div  class="goods-tpl g-flex">
        <div :class="['check',data.ischecked ? 'selected' : '']" v-if="check" @click="checkClick"><em class="circle"></em></div>
        <div class="wrap g-flex-auto" @click="itemClick">
            <img class="image" :src="data.url" alt="">
            <div class="name g-vt line1">{{data.name}}</div>
            <div class="price">¥{{data.price}}</div>
            <div class="sku">总销量:<span class="gap">{{data.sellnum}}</span>库存:{{data.sku}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'goods-tpl',
  props: {
    data:{
        type: Object,
        default:function(){
            return{
                name:'',
                url:'',
                price:'0.00',
                sellnum:'0',
                sku:0,
                ischecked:false
            }
        }
    },
    check:{
        type:Boolean,
        default:false   
    },
  },
  computed: {

    showCheck(){
        if(this.check){
            return true
        }
     }
  },
  methods:{
    itemClick(){
        this.$emit('clickItem',this.data)
    },
    checkClick(){
        this.data.ischecked = !this.data.ischecked
        this.$emit('selectedClick',this.data)
    }
  }
}
</script>

<style lang="sass">
.goods-tpl{
    background: #fff;
    border-bottom: 1px solid #ccc;/*no*/
    position:relative;
    height: 160px;
    padding:30px 30px 30px  0;
    margin-left: 30px;
    font-size: 28px;/*px*/
    
    &:last-child{
        border-bottom: none;
    }
    .check{
        width: 84px;
        margin: -30px 20px -30px -30px;
        position: relative;
        .circle{
            width: 40px;
            height: 40px;
            border: 1px solid #ccc;/*no*/
            position: absolute;
            left: 20px;
            top: 50%;
            margin-top: -20px;
            border-radius: 50%;
        }
    }
    .selected{
        .circle{
            border: 1px solid #c60a1e;/*no*/
            background: #c60a1e;
            &:after{
                width: 10px;
                height: 20px;
                border-bottom: 2px solid #fff;/*no*/
                border-right: 2px solid #fff;/*no*/
                position: absolute;
                content: "";
                top: 4px;
                left: 14px;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
    }
    .wrap{
        position:relative;
        overflow: hidden;
        padding-left:180px;
        .image{
            width: 160px;
            position:absolute;
            top:0;
            left:0;
        }
        .name{
            color: #404040;
            height: 60px;
            line-height: 60px;
        }
        .price{
            height: 60px;
            line-height: 60px;
            color: #d0021b;
        }
        .sku{
            color: #9a9a9a;
            font-size: 24px;/*px*/
            .gap{
                margin-right: 20px;
            }
        }
    }
    
    
}
</style>