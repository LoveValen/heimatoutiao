import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      default: '',
      path: '/',
      redirect: '/index'
    },
    {
      name: 'index',
      path: '/index',
      component: () => import('@/views/index.vue'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/register.vue'),
    },
    {
      name: 'pensonal',
      path: '/pensonal/:id',
      component: () => import('@/views/pensonal.vue'),
    },
    {
      name: 'edituserinfo',
      path: '/edituserinfo/:id',
      component: () => import('@/views/edituserinfo.vue'),
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: () => import('@/views/articleDetail.vue'),
    }
  ],
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  let pathArr = ['/pensonal'];
  for (let i = 0; i < pathArr.length; i++) {
    if (to.path.indexOf(pathArr[i]) !== -1) {
      let token = localStorage.getItem('token');
      if (token) {
        next();
      } else {
        next({ name: 'login' });
      }
    } else {
      next();
    }
  }

})

export default router;