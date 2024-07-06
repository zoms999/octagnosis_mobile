import { createI18n } from 'vue-i18n';

// const messages = {
// 	en: {
// 		login: 'Login',
// 		username: 'Username',
// 		password: 'Password',
// 		enterUsername: 'Please enter your username',
// 		enterPassword: 'Please enter your password',
// 		findId: 'Find ID',
// 		findPassword: 'Find Password',
// 	},
// 	ko: {
// 		login: '로그인',
// 		username: '아이디',
// 		password: '비밀번호',
// 		enterUsername: '아이디를 입력하세요',
// 		enterPassword: '비밀번호를 입력하세요',
// 		findId: '아이디 찾기',
// 		findPassword: '비밀번호 찾기',
// 	},
// };

import en from '../locales/en.json';
import ko from '../locales/ko.json';

const i18n = createI18n({
	legacy: false, // Use Composition API
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en,
		ko,
	},
});

export default i18n;
