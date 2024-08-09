import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PersonJoinView from '../views/Member/Register.vue';
import OrgJoinView from '../views/Member/OrgRegister.vue';
import LoginView from '../views/Login/Login.vue';
import OrgLoginView from '../views/Login/OrgLogin.vue';
import TestStartView from '../views/Test/TestStart.vue';
import TestSelectView from '../views/Test/TestSelect.vue';
import TestPaymentView from '../views/Test/TestPayment.vue';
import CheckoutView from '../views/TossPayment/CheckoutView.vue';
import SuccessView from '../views/TossPayment/SuccessView.vue';
import FailView from '../views/TossPayment/FailView.vue';
import QuestMain from '../views/Test/QuestMainView.vue';
import Quest from '../views/Test/QuestView.vue';
import OrgMemberEditView from '../views/Member/OrgMemberEdit.vue';
import MemberEditView from '../views/Member/MemberEdit.vue';
import TestRsltMain from '../views/Test/TestRsltMain.vue';

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
		path: '/OrgMemberEdit',
		name: 'orgmemberedit',
		component: OrgMemberEditView,
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
		path: '/TestSelect',
		name: 'testSelect',
		component: TestSelectView,
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
		path: '/Quest',
		name: 'quest',
		component: Quest,
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
	{
		path: '/success',
		name: 'success',
		component: () => import('../views/TossPayment/SuccessView.vue'),
	},
	{
		path: '/fail',
		name: 'fail',
		component: () => import('../views/TossPayment/FailView.vue'),
	},
	{
		path: '/TestRsltMain',
		name: 'TestRsltMain',
		component: TestRsltMain,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
