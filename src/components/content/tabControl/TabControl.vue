<template>
  <div class="tab-control">
    <div class="tab-control-item"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)"
         v-for="(item, index) in titles">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "TabControl",
    props: {
		  titles: {
		    type: Array,
        default() {
		      return []
        }
      }//根据传进来的title数目判断需要几个div
    },
    data: function () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick: function (index) {
        // 1.改变currentIndex
        this.currentIndex = index;

        // 2.发出事件
        this.$emit('itemClick', index)//子组件传递给父组件，自定义事件itenClick
      }
    }
	}
</script>

<style scoped>
  .tab-control {
    display: flex;
    position: sticky;
    top: 44px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
