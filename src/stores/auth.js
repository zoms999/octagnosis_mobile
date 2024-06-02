import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		acuntId: null,
		expirDt: null,
		regDt: null,
		email: null,
		persnNm: null,
		phone: null,
		sex: null,
	}),
	actions: {
		login(userData) {
			this.isAuthenticated = true;
			this.acuntId = userData.acunt.acuntId;
			this.expirDt = userData.acunt.expirDt;
			this.regDt = userData.acunt.regDt;
			this.email = userData.personal.email;
			this.persnNm = userData.personal.persnNm;
			this.phone = userData.personal.phone;
			this.sex = userData.personal.sex;

			sessionStorage.setItem('acuntId', userData.acunt.acuntId);
			sessionStorage.setItem('expirDt', userData.acunt.expirDt);
		},
		logout() {
			this.isAuthenticated = false;

			sessionStorage.removeItem('acuntId');
			sessionStorage.removeItem('expirDt');
		},
	},
});
