<template>
	<div v-if="isAuthenticated && TopYn" class="LayoutTop">
		<TheTop></TheTop>
	</div>
	<div
		class="LayoutCenter"
		:class="{
			LayoutCenterTopYes: isAuthenticated,
			LayoutCenterTopNo: !isAuthenticated,
		}"
	>
		<div
			class="container-fluid"
			style="padding: 0; background-color: #ffffff !important"
		>
			<RouterView></RouterView>
		</div>
	</div>

	<div
		v-if="BottomYn"
		class="LayoutBottom"
		style="background-color: #ffffff !important"
	>
		<TheBottom></TheBottom>
	</div>
	<AppAlert></AppAlert>
</template>
<script setup>
import TheTop from './layouts/TheTop.vue';
import TheBottom from './layouts/TheBottom.vue';

import { computed, ref, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/stores/i18n';
const i18nStore = useI18nStore();
const { locale } = useI18n();

// Pinia store의 언어 설정을 vue-i18n의 locale에 반영
locale.value = i18nStore.language;

i18nStore.$subscribe((mutation, state) => {
	// 언어가 변경될 때마다 locale을 업데이트
	locale.value = state.language;
});

const router = useRouter();
const store = useAuthStore();
const TopYn = ref(true);
const BottomYn = ref(true);

store.checkAuth();
const isAuthenticated = computed(() => store.isAuthenticated);

router.beforeEach((to, from, next) => {
	if (to.name == 'questMain' || to.name == 'quest') {
		TopYn.value = false;
		BottomYn.value = false;
	}
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
