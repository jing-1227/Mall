import Vue from 'vue'
import VueRouter from 'vue-router'//安装VueRouter：导入vue路由插件

//导入component组件:懒加载的写法
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.通过Vue.use(插件)，安装路由插件
Vue.use(VueRouter)

// 2.配置路由信息：一个映射关系就是一个对象
const routes = [
  {
    path: '/',
    redirect: '/home'  //设置默认：redirect重定向
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
]

// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',//默认hash模式，配置为history
  routes//配置组件和路径直接的映射关系，等价routes:routes[{ path: '/',redirect: '/home'.... },]
})

// 4.导出
export default router
