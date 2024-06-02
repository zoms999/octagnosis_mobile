import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PersonJoinView from '../views/Member/Register.vue';
import OrgJoinView from '../views/Member/OrgRegister.vue';
import LoginView from '../views/Member/Login.vue';
import OrgLoginView from '../views/Member/OrgLogin.vue';
import TestStartView from '../views/Test/TestStart.vue';

const routes = [
	{
		path: '/Register',
		name: 'register',
		component: PersonJoinView,
	},
	{
		path: '/OrgRegister',
		name: 'orgregister',
		component: OrgJoinView,
	},
	{
		path: '/Login',
		name: 'login',
		component: LoginView,
	},
	{
		path: '/OrgLogin',
		name: 'orglogin',
		component: OrgLoginView,
	},
	{
		path: '/TestStart',
		name: 'testStart',
		component: TestStartView,
	},
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/AboutView.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
