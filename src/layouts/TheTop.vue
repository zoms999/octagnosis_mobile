<template>
	<div id="header" style="height: 90px">
		<div class="container" style="padding-top: 5px">
			<!-- 20230626 수정 -->
			<h1 class="logo v1"><a href="javascript:void(0);">옥타그노시스</a></h1>
			<div class="etc">
				<LanguageSwitcher />
				<div v-if="!isLoginOrSignUpPage">
					<p class="user">
						Welcome,<strong>{{ persnNm }}</strong
						>님
					</p>
					<div v-if="isAuthenticated" class="logout">
						<span class="mx-3">|</span>
						<span @click="handleInfoEdit" class="Poit" style="cursor: pointer">
						<span @click="handleLogout" class="Poit" style="cursor: pointer">
							정보수정
						</span>
						<span class="mx-3">|</span>
						<span @click="handleLogout" class="Poit" style="cursor: pointer">
							로그아웃
						</span>
					</div>
				</div>
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
	const loginRoute = orgId.value == '0' ? 'login' : 'orglogin';
	logout();
	router.push({ name: loginRoute });
};

const handleInfoEdit = () => {
	console.log('orgId.value', orgId.value);
	if (orgId.value == 1) {
		router.push({ name: 'orgmemberedit', query: { mode: 'edit' } });
	} else {
		router.push({ name: 'register' });
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
