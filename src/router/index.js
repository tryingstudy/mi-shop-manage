import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
    	path: "/",
    	component: Login
    },
    {
    	path: "/login",
    	component: Login
    },
    {
      path: "/Home",
    		component: resolve => require(['../components/Home.vue'], resolve),
    		children: [
    			{
    				path: "/info",
    				component: resolve => require(['../view/info.vue'], resolve),
    				meta: { title: 'info'}
    			},
          {
          	path: "/consumer",
          	component: resolve => require(['../view/consumer.vue'], resolve),
          	meta: { title: 'consumer'}
          },
          {
          	path: "/category",
          	component: resolve => require(['../view/category.vue'], resolve),
          	meta: { title: 'category'}
          }
    		],
    }
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
