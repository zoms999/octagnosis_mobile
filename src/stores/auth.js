import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		userMngrId: null,
		userEmail: null,
		authPersn: 0,
		authRsltView: 0,
		authAdmin: 0,
		authLogView: 0,
		authStati: 0,
		authBbs: 0,
		authOrg: 0,
	}),
	actions: {
		login(userData) {
			this.isAuthenticated = true;
			this.userMngrId = userData.mngrId;
			this.userEmail = userData.email;
			this.authPersn = userData.authPersn;
			this.authRsltView = userData.authRsltView;
			this.authAdmin = userData.authAdmin;
			this.authLogView = userData.authLogView;
			this.authStati = userData.authStati;
			this.authBbs = userData.authBbs;
			this.authOrg = userData.authOrg;
			sessionStorage.setItem('mngrId', userData.mngrId);
			sessionStorage.setItem('email', userData.email);
		},
		logout() {
			this.isAuthenticated = false;
			this.userEmail = null;
			sessionStorage.removeItem('mngrId');
			sessionStorage.removeItem('email');
		},
	},
});
