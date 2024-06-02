import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		acuntId: null,
		expirDt: null,
		regDt: null,
		name: null,
		email: null,
	}),
	actions: {
		login(userData, persn) {
			this.isAuthenticated = true;
			this.acuntId = userData.acuntId;
			this.expirDt = userData.expirDt;
			this.regDt = userData.regDt;
			this.name = persn.persnNm;
			this.email = persn.email;

			sessionStorage.setItem('acuntId', userData.acuntId);
			sessionStorage.setItem('expirDt', userData.expirDt);
		},
		logout() {
			this.isAuthenticated = false;

			sessionStorage.removeItem('acuntId');
			sessionStorage.removeItem('expirDt');
		},
	},
});
