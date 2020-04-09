<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control v-show="isTabFixed" class="fixed" @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']"></tab-control><!--itemClick子组件传过来的自定义方法-->
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :data="showGoodsList"
            :pull-up-load="true"
            :probe-type="3">
      <div>
        <home-swiper :banners="banners"
                     ref="hSwiper"></home-swiper>
        <feature-view :features="recommends"></feature-view>
        <recommend-view></recommend-view>
        <tab-control @itemClick="tabClick"
                     :titles="['流行', '新款', '精选']"
                     ref="tabControl"></tab-control>
        <goods-list :goods-list="showGoodsList"></goods-list>
      </div>
    </scroll>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'
  import TabControl from 'content/tabControl/TabControl'
  import BackTop from 'content/backTop/BackTop'
  import HomeSwiper from './childComps/HomeSwiper'//轮播图
  import FeatureView from './childComps/FeatureView'
  import RecommendView from './childComps/RecommendView'
  import GoodsList from './childComps/GoodsList'
  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";//服务器数据请求：导入首页数据
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";

  export default {
		name: "Home",
    components: {
		  NavBar,
      Scroll,
      TabControl,
      BackTop,
      HomeSwiper,
      FeatureView,
      RecommendView,
      GoodsList,
    },
    data() {
		  return {
		    banners: [],//存储请求到的banner数据
        recommends: [],
        goodsList: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}
        },//goods:{流行{page:1,list:[]}/新款{page:1,list:[]}/精选{page:1,list:[]}}
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        showBackTop: false
      }
    },
    computed: {
		  showGoodsList() {
		    return this.goodsList[this.currentType].list
      }
    },//展示图片
    created() {//组件一创建好后就发送请求
      console.log('创建Home');
      // 1.请求多个数据
      this.getMultiData()

      // 2.请求商品数据
      this.getHomeProducts(POP)
      this.getHomeProducts(NEW)
      this.getHomeProducts(SELL)
    },
    activated: function () {
      this.$refs.hSwiper.startTimer()
    },
    deactivated: function () {
      this.$refs.hSwiper.stopTimer()//使轮播图停止，目的是为了回到home页面时还是离开时的位置
    },
    updated() {
      //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;$el拿到组件中的元素
      // console.log(this.tabOffsetTop);
    },
    methods: {
      /**
       *点击事件相关方法
       */
		  tabClick(index) {
		    switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
      },
      contentScroll(position) {
		    // 1.决定tabFixed是否显示
        this.isTabFixed = position.y < -this.tabOffsetTop

        // 2.决定backTop是否显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE
      },
      loadMore() {
		    this.getHomeProducts(this.currentType)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)//300毫秒内回到顶部
      },
      /**
       * 网络请求相关方法
       */
      getMultiData() {//请求数据的方法，因为axios直接返回的是promise对象，所以可以直接用then得到成功后的数据res
        getHomeMultidata().then(res => {//将请求到的数据保存到data(){}中,避免回收
          this.banners = res.data[BANNER].list//res.data.BANNER.list得到res中的data中的banner中的list数组
          this.recommends = res.data[RECOMMEND].list
          // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
          this.$nextTick(() => {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          })
        })
      },
      getHomeProducts(type) {//请求数据，此时需传参type和page
        getHomeData(type, this.goodsList[type].page).then(res => {
          const goodsList = res.data.list;
          this.goodsList[type].list.push(...goodsList)//将请求到的res.data.list数组复制到goodList[type].list中
          this.goodsList[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
	}
</script>

<style scoped>
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
