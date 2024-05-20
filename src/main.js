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

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import globalFunction from './plugins/global-function';

const app = createApp(App);
app.use(globalFunction);
app.use(createPinia());
app.use(router);

app.mount('#app');

console.log('MODE', import.meta.env.VITE_APP_API_URL);
