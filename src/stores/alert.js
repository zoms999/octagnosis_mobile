import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
	state: () => ({
		alerts: [],
	}),
	actions: {
		vAlert(msg, type = 'error') {
			this.alerts.push({ msg, type });

			setTimeout(() => {
				this.alerts.shift();
			}, 2000);
		},

		vSuccess(msg) {
			this.vAlert(msg, 'success');
		},
	},
});
