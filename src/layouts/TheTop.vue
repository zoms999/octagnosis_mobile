<template>
	<div id="header" style="height: 90px">
		<div class="container" style="padding-top: 5px">
			<!-- 20230626 수정 -->
			<h1 class="logo v1"><a href="javascript:void(0);">옥타그노시스</a></h1>
			<div class="etc">
				<p class="user">
					Welcome,<strong>{{ persnNm }}</strong
					>님
				</p>
				<div v-if="isAuthenticated" class="logout">
					<span class="mx-3">|</span>
					<span @click="handleLogout" clsss="Poit" style="cursor: pointer">
						정보수정
					</span>
					<span class="mx-3">|</span>
					<span @click="handleLogout" clsss="Poit" style="cursor: pointer">
						로그아웃
					</span>
				</div>
			</div>
			<!--// 20230626 수정 -->
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { acuntId, expirDt, isAuthenticated, persnNm, email, phone, orgId } =
	storeToRefs(store);
const { logout } = store;
const router = useRouter();

const acuntIdFromStorage = sessionStorage.getItem('acuntId');
if (acuntIdFromStorage) {
	isAuthenticated.value = true;
	acuntId.value = acuntIdFromStorage;
	expirDt.value = sessionStorage.getItem('acuntId');
} else {
	isAuthenticated.value = false;
	acuntId.value = null;
	expirDt.value = null;
}
console.log('acuntId ->' + acuntId.value);
const handleLogout = () => {
	const loginRoute = orgId.value == '0' ? 'login' : 'orglogin';
	logout();
	router.push({ name: loginRoute });
};
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
