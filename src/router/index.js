import Vue from 'vue'
import VueRouter from 'vue-router'
import find from '../views/WyFind'
import localmui from '../views/LocalMui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'find',
    component: find
  },
  {
    path: '/wyvideo',
    name: 'wyvideo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Wyvideo.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/WyMe')
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('../views/WyFour'),
    
  },
  {
    path: '/BankAccount',
    name: 'BankAccount',
    component: () => import('../views/BankAccount')
  },
  
  {
    path: '/EveryDay',
    name: 'everyday',
    component: () => import('../views/EveryDay')
  },
  
	{
		path:'/LocalMui',
		name:'localmui',
		component: localmui
	},
	
	{
		path:'/Login',
		name:'login',
		component: () => import('../views/Login')
	},
	
	{
		path:'/SongList',
		name:'songlist',
		component: () => import('../views/SongList')
	},
	
	{
		path:'/PlayPage',
		name:'playpage',
		component: () => import('../views/PlayPage')
	}
	
]

const router = new VueRouter({
  routes,
	mode:'history'
})

export default router
