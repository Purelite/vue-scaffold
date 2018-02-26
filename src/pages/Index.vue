<template>
  <div v-loading
       v-scroll-record
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="50"
       infinite-scroll-immediate-check="false">
    <div class="top">Top Content</div>
    <div v-sticky="0">
        <div class="header">
            Sticky Demo
        </div>
    </div>
    <goods-template check v-for="item in data " :data="item" @clickItem="clickGoods" @selectedClick = "selected" />
   
    <Spinner :show="loading"/>
  </div>
</template>
<script>
import Vue from 'vue'
import Api from '../apis/apis.js'
import Cookie from '../util/js.cookie.js'
import {pageData} from '../directives/scroll-record/index.js'
import GoodsTemplate from '../components/GoodsTemplate/index.js'
import Spinner from '../components/Spinner.vue'

export default {
  mixins: [pageData],
  pageData(){
    return {
      loading:false,
      isLastPage:false,
      data:[
        { 
          name:'1111',
          url:'',
          price:'10.00',
          sellnum:'10',
          sku:10,
          ischecked:false
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },

        { 
          name:'2222222',
          url:'',
          price:'20.00',
          sellnum:'20',
          sku:20,
          ischecked:true
        },
        { 
          name:'666',
          url:'',
          price:'30.00',
          sellnum:'30',
          sku:30,
          ischecked:false
        },
      ]
    }
  },
  created(){

  },
  mounted(){
    Vue.$loading(false)
  },
  methods:{
    loadMore(){
      if(this.isLastPage){
        return
      }
      this.loading = true;
      this.isLastPage = !this.isLastPage

      console.log('loadMore');
      setTimeout(()=>{
        console.log('dadsa')
        this.loading = false;
      },1000)
    },
    clickGoods(data){
      console.log('goods',data)
    },
    selected(data){
      console.log('checked',data)
    }
  },
  components: {
    GoodsTemplate,
    Spinner
  },
}
</script>
<style src="../assets/reset.css"></style>
<style lang="sass" scoped>
  .top{
    height:120px;
    background:#ccc;
  }
  .header{
    background: red;
    padding: 30px;
    display: flex;
    box-sizing: border-box;
  }
</style>
