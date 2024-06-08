<template>
	<div v-if="isAuthenticated" class="LayoutTop">
		<TheTop></TheTop>
	</div>
	<div
		class="LayoutCenter"
		:class="{
			LayoutCenterTopYes: isAuthenticated,
			LayoutCenterTopNo: !isAuthenticated,
		}"
	>
		<div class="container py-4">
			<RouterView></RouterView>
		</div>
	</div>

	<div class="LayoutBottom">
		<TheBottom></TheBottom>
	</div>
	<AppAlert></AppAlert>
</template>
<script setup>
import TheTop from './layouts/TheTop.vue';
import TheBottom from './layouts/TheBottom.vue';

import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);

// router.beforeEach((to, from, next) => {
// 	if (!isAuthenticated.value && to.name !== 'login') {
// 		next({ name: 'login' });
// 	} else {
// 		next();
// 	}
// });
</script>
<style scoped>
.LayoutTop {
	height: 90px;
}
.LayoutCenter {
}
.LayoutBottom {
	height: 110px;
}

.LayoutCenterTopYes {
	min-height: 719px;
}
.LayoutCenterTopNo {
	min-height: 805px;
}
</style>
