<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'//通过npm install better-scroll --save 安装框架，然后导入

	export default {
		name: "Scroll",
    props: {
		  probeType: {
		    type: Number,
        default: 1
      },
      data: {
		    type: Array,
        default: () => {
          return []
        }
      },
      pullUpLoad: {
		    type: Boolean,
        default: false
      }
    },
    data() {
		  return {
		    scroll: {}
      }
    },
    mounted() {//在组件挂载之后创建
		  setTimeout(this.__initScroll, 20)
    },
    methods: {
      //BScroll默认不能实时监听滚动的位置
		  __initScroll() {
		    // 1.初始化BScroll对象，必须是外层的（wrapper）而不能直接是里面的内容
		    if (!this.$refs.wrapper) return//通过this.$refs明确的拿到wrapper
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,//侦测，0和1都不侦测实时的位置;2在手指滚动的过程中侦测，离开后的惯性滚动不侦测;3只要滚动都侦测
          click: true,//内部按钮是否监听
          pullUpLoad: this.pullUpLoad//上拉加载
        })

        // 2.将监听事件回调，监听事件类型scroll，函数传入position位置
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })

        // 3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载');
          this.$emit('pullingUp')
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },//重新计算可滚动区域
      finishPullUp() {
		    this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      scrollTo(x, y, time) {
		    this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
	}
</script>

<style scoped>

</style>
