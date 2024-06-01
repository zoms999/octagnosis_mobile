import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		acuntId: null,
		expirDt: null,
		regDt: null,
	}),
	actions: {
		login(userData) {
			this.isAuthenticated = true;
			this.acuntId = userData.acuntId;
			this.expirDt = userData.expirDt;
			this.regDt = userData.regDt;

			sessionStorage.setItem('acuntId', userData.acuntId);
			sessionStorage.setItem('expirDt', userData.expirDt);
		},
		logout() {
			this.isAuthenticated = false;
			this.userEmail = null;
			sessionStorage.removeItem('acuntId');
			sessionStorage.removeItem('expirDt');
		},
	},
});
