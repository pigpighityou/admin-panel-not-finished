import { createRouter, createWebHistory } from 'vue-router'

const routes=[
  {
    path:"/",
    name:"Home",
    components:{
      default:()=>import('@/pages/Home/home.vue'),
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
