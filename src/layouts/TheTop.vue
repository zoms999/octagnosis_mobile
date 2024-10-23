<template>
	<div id="header" class="header">
		<div class="container">
			<!-- 20230626 수정 -->
			<h1 class="logo v1">
				<a href="javascript:void(0);" @click="handleLogoClick">옥타그노시스</a>
			</h1>
			<div class="etc">
				<div v-if="!isLoginOrSignUpPage">
					<div v-if="isAuthenticated" class="logout">
						<span class="user">
							{{ $t('welcome') }}<strong>{{ persnNm }}</strong
							>님
						</span>
						<span class="separator">|</span>
						<span @click="handleHome" class="link">Home</span>
						<span class="separator">|</span>
						<span @click="handleInfoEdit" class="link">{{
							$t('edit_info')
						}}</span>
						<span class="separator">|</span>
						<router-link to="/inquiry" class="link">{{
							$t('inquiry.button')
						}}</router-link>
						<span class="separator">|</span>
						<span @click="handleLogout" class="link">{{ $t('logout') }}</span>
					</div>
					<div v-else>
						<router-link to="/inquiry" class="link">{{
							$t('inquiry.button')
						}}</router-link>
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

const handleLogoClick = () => {
	//const loginRoute = orgId.value == '0' ? 'login' : 'orglogin';
	//router.push({ name: loginRoute });
	router.push({ name: 'testStart' });
};
</script>

<style scoped>
.header {
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
	display: flex;
	align-items: center;
	width: 100%;
}

.logo {
	font-size: 24px;
	font-weight: bold;
	color: #ffffff;
	margin-right: 20px;
}

.logo a {
	color: inherit;
	text-decoration: none;
}

.etc {
	display: flex;
	align-items: center;
}

.logout {
	display: flex;
	align-items: center;
	color: #ffffff;
}

.user {
	margin-right: 10px;
}

.separator {
	margin: 0 10px;
	color: #ffffff;
}

.link {
	cursor: pointer;
	color: #ffffff;
	text-decoration: none;
}

.link:hover {
	text-decoration: underline;
}

.inquiry-btn {
	padding: 0;
	background-color: transparent;
	color: #ffffff;
	text-decoration: none;
	border-radius: 0;
	margin-left: 0;
}

.inquiry-btn:hover {
	background-color: transparent;
	text-decoration: underline !important;
}
</style>
