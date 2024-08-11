<template>
	<div id="header" style="height: 90px">
		<div class="container" style="padding-top: 5px">
			<!-- 20230626 수정 -->
			<h1 class="logo v1">
				<a href="javascript:void(0);" style="cursor: default">옥타그노시스</a>
			</h1>
			<div class="etc">
				<div v-if="!isLoginOrSignUpPage">
					<div v-if="isAuthenticated" class="logout">
						<span class="user">
							{{ $t('welcome') }}<strong>{{ persnNm }}</strong
							>님
						</span>
						<span class="mx-3">|</span>
						<span @click="handleHome" class="Poit" style="cursor: pointer">
							Home
						</span>
						<span class="mx-3">|</span>
						<span @click="handleInfoEdit" class="Poit" style="cursor: pointer">
							{{ $t('edit_info') }}
						</span>
						<span class="mx-3">|</span>
						<span @click="handleLogout" class="Poit" style="cursor: pointer">
							{{ $t('logout') }}
						</span>
					</div>
				</div>
				<div v-else class="user">{{ $t('logout_please') }}</div>
				<LanguageSwitcher />
			</div>
			<!--// 20230626 수정 -->
		</div>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import LanguageSwitcher from '@/components/app/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';

const store = useAuthStore();
const {
	acuntId,
	userId,
	expirDt,
	isAuthenticated,
	persnNm,
	email,
	phone,
	orgId,
} = storeToRefs(store);
const { logout } = store;
const router = useRouter();
const route = useRoute();
const { t } = useI18n(); // Import translation function

const acuntIdFromStorage = sessionStorage.getItem('acuntId');
if (acuntIdFromStorage) {
	isAuthenticated.value = true;
	acuntId.value = acuntIdFromStorage;
	userId.value = sessionStorage.getItem('userId');
} else {
	isAuthenticated.value = false;
	acuntId.value = null;
	userId.value = null;
}
console.log('sessionStorage acuntId ->' + acuntId.value);
console.log('sessionStorage userId ->' + userId.value);
const handleLogout = () => {
	if (!confirm(t('logout_question'))) {
		return;
	}
	const loginRoute = orgId.value == '0' ? 'login' : 'orglogin';
	logout();
	router.push({ name: loginRoute });
};

const handleHome = () => {
	router.push({ name: 'testStart', query: {} });
};
const handleInfoEdit = () => {
	console.log('orgId.value', orgId.value);
	if (orgId.value == 1) {
		router.push({ name: 'orgmemberedit', query: { mode: 'edit' } });
	} else {
		router.push({ name: 'memberedit', query: { mode: 'edit' } });
	}
};

const isLoginOrSignUpPage = computed(() => {
	const loginPages = ['login', 'orglogin', 'register', 'orgregister']; // Add your login and signup route names here
	return loginPages.includes(route.name);
});
</script>

<style scoped>
.TopRight {
	background-color: transparent;
	height: 40px;
	margin: 20px 30px !important;
	color: #ffffff;
}

.logo {
	width: 230px;
	margin: 15px 0 0 14px;
}

.header {
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1db1ad', endColorstr='#3d7aed',GradientType=1 );
	height: 120px !important;
}

.logout {
	color: #ffffff;
}
</style>
