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
		<div class="container-fluid" style="padding: 0">
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

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const store = useAuthStore();

store.checkAuth();
const isAuthenticated = computed(() => store.isAuthenticated);

router.beforeEach((to, from, next) => {
	if (
		!isAuthenticated.value &&
		to.name !== 'login' &&
		to.name !== 'orglogin' &&
		to.name !== 'register' &&
		to.name != 'orgregister'
	) {
		next({ name: 'login' });
	} else {
		next();
	}
});
</script>
<style scoped>
.LayoutTop {
	height: 90px;
}
.LayoutCenter {
	width: 100%;
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
