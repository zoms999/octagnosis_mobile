import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		acuntId: null,
		userType: null,
		userId: null,
		expirDt: null,
		regDt: null,
		email: null,
		persnNm: null,
		phone: null,
		sex: null,
		orgId: null,
		turnConnCd: null,
	}),
	actions: {
		login(acunt, persn, turnConnCd) {
			this.isAuthenticated = true;
			this.acuntId = acunt.acuntId;
			this.userType = acunt.userType;
			this.userId = acunt.userId;
			this.expirDt = acunt.expirDt;
			this.regDt = acunt.regDt;
			this.email = persn.email;
			this.persnNm = persn.persnNm;
			this.phone = persn.phone;
			this.sex = persn.sex;
			this.orgId = persn.orgId;
			this.turnConnCd = turnConnCd;

			sessionStorage.setItem('isAuthenticated', true);
			sessionStorage.setItem('acuntId', acunt.acuntId);
			sessionStorage.setItem('userType', acunt.userType);
			sessionStorage.setItem('userId', acunt.userId);
			sessionStorage.setItem('expirDt', acunt.expirDt);
			sessionStorage.setItem('regDt', acunt.regDt);
			sessionStorage.setItem('email', persn.email);
			sessionStorage.setItem('persnNm', persn.persnNm);
			sessionStorage.setItem('phone', persn.phone);
			sessionStorage.setItem('sex', persn.sex);
			sessionStorage.setItem('orgId', persn.orgId);
			sessionStorage.setItem('turnConnCd', turnConnCd);
			console.log('orgId', persn.orgId);
		},
		logout() {
			this.isAuthenticated = false;

			sessionStorage.removeItem('isAuthenticated');
			/**
			sessionStorage.removeItem('acuntId');
			sessionStorage.removeItem('userType');
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('expirDt');
			sessionStorage.removeItem('regDt');
			sessionStorage.removeItem('email');
			sessionStorage.removeItem('persnNm');
			sessionStorage.removeItem('phone');
			sessionStorage.removeItem('sex');
			sessionStorage.removeItem('orgId');
			sessionStorage.removeItem('turnConnCd');
			 */
		},
		checkAuth() {
			const isAuthenticated = sessionStorage.getItem('isAuthenticated');

			if (isAuthenticated) {
				this.isAuthenticated = isAuthenticated;
				this.acuntId = sessionStorage.getItem('acuntId');
				this.userType = sessionStorage.getItem('userType');
				this.userId = sessionStorage.getItem('userId');
				this.expirDt = sessionStorage.getItem('expirDt');
				this.regDt = sessionStorage.getItem('regDt');
				this.email = sessionStorage.getItem('email');
				this.persnNm = sessionStorage.getItem('persnNm');
				this.phone = sessionStorage.getItem('phone');
				this.sex = sessionStorage.getItem('sex');
				this.orgId = sessionStorage.getItem('orgId');
				this.turnConnCd = sessionStorage.getItem('turnConnCd');
			} else {
				this.logout();
			}
		},
		getters: {
			isAuthenticated: state => !!state.isAuthenticated,
		},
	},
});
