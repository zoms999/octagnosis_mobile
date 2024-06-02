<template>
	<div class="header">
		<div class="d-flex justify-content-between">
			<div class="TopLeft">
				<!-- <img src="@/assets/img/logo3.png" class="logo" /> -->
			</div>
			<div class="TopRight">
				<div class="d-flex mt-1">
					<div class="me-3" v-if="isAuthenticated">
						{{ acuntId }}님 안녕하세요
					</div>
					<div v-if="!isAuthenticated">
						<router-link to="/login" class="text-white"></router-link>
					</div>
					<div v-if="isAuthenticated">
						<button @click="handleLogout" class="text-white btn btn-link">
							로그아웃
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { acuntId, expirDt, isAuthenticated } = storeToRefs(store);
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
	logout();
	router.push({ name: 'login' });
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
}
</style>
