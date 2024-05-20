import AppGrid from '@/components/app/AppGrid.vue';
import AppModal from '@/components/app/AppModal.vue';
import AppPagination from '@/components/app/AppPagination.vue';
import AppAlert from '@/components/app/AppAlert.vue';
// import AppCard from '@/components/app/AppCard.vue';

export default {
	install(app) {
		app.component('AppGrid', AppGrid);
		app.component('AppModal', AppModal);
		app.component('AppPagination', AppPagination);
		app.component('AppAlert', AppAlert);
		// app.component('AppCard', AppCard);
	},
};
