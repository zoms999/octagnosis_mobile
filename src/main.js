import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';

import './assets/main.css';
import './assets/common.css';
import './assets/components.css';
import './assets/fonts.css';
import './assets/reset.css';
import './assets/sub.css';
import './assets/utility.css';
import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import globalFunction from './plugins/global-function';

const app = createApp(App);
app.use(globalFunction);
app.use(createPinia());

app.config.globalProperties.$authToken = localStorage.getItem('authToken');
router.beforeEach((to, from, next) => {
	const authToken = app.config.globalProperties.$authToken;

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 로그인 필요한 페이지 접근 시
		if (!authToken) {
			next('/login'); // 로그인 페이지로 리다이렉트
		} else {
			next();
		}
	} else {
		next();
	}
});

app.use(router);
app.mount('#app');
console.log('MODE', import.meta.env.VITE_APP_API_URL);
