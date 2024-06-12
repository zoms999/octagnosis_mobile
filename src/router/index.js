import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PersonJoinView from '../views/Member/Register.vue';
import OrgJoinView from '../views/Member/OrgRegister.vue';
import LoginView from '../views/Login/Login.vue';
import OrgLoginView from '../views/Login/OrgLogin.vue';
import TestStartView from '../views/Test/TestStart.vue';
import TestPaymentView from '../views/Test/TestPayment.vue';
import CheckoutView from '../views/TossPayment/CheckoutView.vue';
import SuccessView from '../views/TossPayment/SuccessView.vue';
import FailView from '../views/TossPayment/FailView.vue';
import QuestMain from '../views/Test/QuestMainView.vue';

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
		path: '/TestPayment',
		name: 'testPayment',
		component: TestPaymentView,
	},
	{
		path: '/CheckoutView',
		name: 'checkoutView',
		component: CheckoutView,
	},
	{
		path: '/SuccessView',
		name: 'successView',
		component: SuccessView,
	},
	{
		path: '/FailView',
		name: 'failView',
		component: FailView,
	},
	{
		path: '/QuestMain',
		name: 'questMain',
		component: QuestMain,
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
