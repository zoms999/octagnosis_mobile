<template>
	<header class="header">
		<div class="container">
			<h1 class="logo">
				<a href="javascript:void(0);" @click="handleLogoClick">옥타그노시스</a>
			</h1>
			<button
				class="menu-toggle"
				@click="toggleMenu"
				:class="{ 'is-open': isMenuOpen }"
				aria-label="Toggle menu"
			>
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</button>
		</div>

		<Transition name="slide-fade">
			<nav v-show="isMenuOpen" class="nav-menu">
				<div class="nav-content">
					<div v-if="!isLoginOrSignUpPage">
						<div v-if="isAuthenticated" class="user-info">
							<div class="avatar">
								<img :src="avatarUrl" :alt="persnNm" />
							</div>
							<span class="welcome-text">
								{{ $t('welcome') }}<strong>{{ persnNm }}</strong
								>님
							</span>
							<div class="nav-links">
								<button @click="handleNavigation('testStart')">
									<i class="icon-home"></i>
									Home
								</button>
								<button @click="handleInfoEdit">
									<i class="icon-user"></i>
									{{ $t('edit_info') }}
								</button>
								<button @click="handleNavigation('inquiry')">
									<i class="icon-message-square"></i>
									{{ $t('inquiry.button') }}
								</button>
								<button @click="handleLogout">
									<i class="icon-log-out"></i>
									{{ $t('logout') }}
								</button>
							</div>
						</div>
						<div v-else>
							<button @click="handleNavigation('inquiry')" class="inquiry-link">
								<i class="icon-message-square"></i>
								{{ $t('inquiry.button') }}
							</button>
						</div>
					</div>
					<div v-else class="logout-text">{{ $t('logout_please') }}</div>
					<LanguageSwitcher class="language-switcher" />
				</div>
			</nav>
		</Transition>

		<Transition name="fade">
			<div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>
		</Transition>
	</header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import LanguageSwitcher from '@/components/app/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';

const store = useAuthStore();
const { isAuthenticated, persnNm, orgId } = storeToRefs(store);
const { logout } = store;
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const isMenuOpen = ref(false);
const avatarUrl = computed(() => `/placeholder.svg?height=40&width=40`);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

watch(isMenuOpen, newValue => {
	document.body.style.overflow = newValue ? 'hidden' : '';
});

const handleLogout = () => {
	if (!confirm(t('logout_question'))) return;
	logout();
	router.push({ name: orgId.value == '0' ? 'login' : 'orglogin' });
	closeMenu();
};

const handleInfoEdit = () => {
	router.push({
		name: orgId.value == 1 ? 'orgmemberedit' : 'memberedit',
		query: { mode: 'edit' },
	});
	closeMenu();
};

const handleNavigation = routeName => {
	router.push({ name: routeName });
	closeMenu();
};

const handleLogoClick = () => {
	router.push({ name: 'testStart' });
	closeMenu();
};

const closeMenu = () => {
	isMenuOpen.value = false;
};

const isLoginOrSignUpPage = computed(() => {
	const loginPages = ['login', 'orglogin', 'register', 'orgregister'];
	return loginPages.includes(route.name);
});
</script>

<style lang="scss" scoped>
.header {
	background: linear-gradient(135deg, #20b2aa 0%, #4169e1 100%);
	padding: 12px 16px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}
}

.logo {
	a {
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: -0.02em;
	}
}

.menu-toggle {
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 18px;
	width: 24px;
	padding: 0;
	position: relative;
	z-index: 1001;

	.bar {
		background-color: #fff;
		height: 2px;
		width: 100%;
		border-radius: 2px;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	&.is-open {
		.bar:nth-child(1) {
			transform: translateY(8px) rotate(45deg);
		}
		.bar:nth-child(2) {
			opacity: 0;
		}
		.bar:nth-child(3) {
			transform: translateY(-8px) rotate(-45deg);
		}
	}
}

.nav-menu {
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 85%;
	max-width: 360px;
	background: #111827;
	z-index: 1000;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

.nav-content {
	padding: 80px 24px 24px;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	z-index: 999;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(100%);
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.user-info {
	margin-bottom: 24px;

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 16px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.welcome-text {
		color: #fff;
		font-size: 0.95rem;
		margin-bottom: 16px;
		display: block;
		opacity: 0.9;

		strong {
			font-weight: 600;
			margin: 0 4px;
			color: #fff;
		}
	}
}

.nav-links {
	display: flex;
	flex-direction: column;
	gap: 16px;

	button,
	a {
		background: none;
		border: none;
		color: #fff;
		font-size: 1.1rem;
		cursor: pointer;
		padding: 12px 16px;
		text-decoration: none;
		text-align: left;
		opacity: 0.9;
		transition: all 0.2s ease;
		border-radius: 8px;
		display: flex;
		align-items: center;

		&:active {
			background-color: rgba(255, 255, 255, 0.1);
			opacity: 1;
		}

		i {
			margin-right: 12px;
			font-size: 1.2rem;
		}
	}
}

.inquiry-link {
	color: #fff;
	text-decoration: none;
	font-size: 1.1rem;
	display: flex;
	align-items: center;
	padding: 12px 16px;
	opacity: 0.9;
	border-radius: 8px;
	transition: all 0.2s ease;

	&:active {
		background-color: rgba(255, 255, 255, 0.1);
		opacity: 1;
	}

	i {
		margin-right: 12px;
		font-size: 1.2rem;
	}
}

.logout-text {
	color: #fff;
	font-size: 0.95rem;
	opacity: 0.9;
	margin-bottom: 16px;
	padding: 12px 16px;
}

.language-switcher {
	margin-top: 24px;
	padding-top: 24px;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
}

// Add these icon classes or import an icon library
.icon-home,
.icon-user,
.icon-message-square,
.icon-log-out {
	// Add your icon styles or use an icon font
}
</style>
