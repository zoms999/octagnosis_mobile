<template>
	<div class="login-container">
		<div class="login-card">
			<h2 class="login-title">{{ $t('login') }}</h2>

			<div class="form-group">
				<div class="input-wrapper">
					<label>{{ $t('username') }}</label>
					<input
						type="text"
						v-model="loginData.acuntId"
						:placeholder="$t('enterUsername')"
						required
						ref="txtAcuntId"
					/>
				</div>

				<div class="input-wrapper">
					<label>{{ $t('password') }}</label>
					<input
						type="password"
						v-model="loginData.pw"
						:placeholder="$t('enterPassword')"
						required
						ref="txtPw"
					/>
				</div>
			</div>

			<button class="login-button" @click="goLogin">
				{{ $t('login') }}
			</button>

			<div class="action-links">
				<button class="link-button" @click="showFindIdModal = true">
					{{ $t('findId') }}
				</button>
				<span class="divider">|</span>
				<button class="link-button" @click="showFindPwModal = true">
					{{ $t('findPassword') }}
				</button>
				<span class="divider">|</span>
				<button class="link-button" @click="goRegister()">
					{{ $t('join_member') }}
				</button>
			</div>
		</div>

		<FindIdModal
			:isVisible="showFindIdModal"
			@close="showFindIdModal = false"
		/>
		<FindPasswordModal
			:isVisible="showFindPwModal"
			@close="showFindPwModal = false"
		/>
	</div>
</template>

<script setup name="UserLogin">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import FindIdModal from '@/views/Member/FindIdModal.vue';
import FindPasswordModal from '@/views/Member/FindPasswordModal.vue';

const { t } = useI18n();
const store = useAuthStore();
const { login } = store;
const router = useRouter();

const loginData = ref({
	acuntId: '',
	pw: '',
	code: '',
	orgId: '0',
});

const { vAlert } = useAlert();

const txtAcuntId = ref(null);
const txtPw = ref(null);

const showFindIdModal = ref(false);
const showFindPwModal = ref(false);

const Procs = ref({
	login: { path: '/api/member/login', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.login.path:
					Procs.value.login.loading = false;

					if (data.value.success) {
						login(data.value.acunt, data.value.persn, '');
						router.push('/testStart');
					} else {
						switch (data.value.errCode) {
							case '100':
								alert(t('org_member'));
								router.push('/OrgLogin');
								break;
							case '200':
								vAlert(t('login_info1'));
								break;
							case '300':
								vAlert(t('login_info2'));
								break;
						}
					}
					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

const goLogin = () => {
	if (
		!validNotBlank(loginData.value.acuntId, t('username'), txtAcuntId.value)
	) {
		return;
	}
	if (!validNotBlank(loginData.value.pw, t('password'), txtPw.value)) {
		return;
	}

	execUrl(Procs.value.login.path, loginData.value);
};

const goRegister = () => {
	router.push({ name: 'register' });
};

const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? t('enter1') : `${tit} ${t('enter2')}`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};

onMounted(() => {
	const userId = sessionStorage.getItem('userId');
	if (userId) {
		router.push({ name: 'testStart' });
	}
});
</script>

<style lang="scss" scoped>
.login-container {
	min-height: calc(100vh - 200px);
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f5f7fa;
}

.login-card {
	width: 100%;
	max-width: 400px;
	padding: 32px 24px;
	background: white;
	border-radius: 16px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
	font-size: 24px;
	font-weight: 700;
	text-align: center;
	color: #1a1a1a;
	margin-bottom: 32px;
}

.form-group {
	margin-bottom: 24px;
}

.input-wrapper {
	margin-bottom: 16px;

	label {
		display: block;
		font-size: 14px;
		color: #4a5568;
		margin-bottom: 8px;
	}

	input {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.2s;

		&:focus {
			outline: none;
			border-color: #3d7aed;
		}
	}
}

.login-button {
	width: 100%;
	padding: 14px;
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.9;
	}

	&:active {
		transform: translateY(1px);
	}
}

.action-links {
	margin-top: 24px;
	text-align: center;

	.link-button {
		background: none;
		border: none;
		color: #4a5568;
		font-size: 14px;
		cursor: pointer;
		padding: 4px 8px;
		transition: color 0.2s;

		&:hover {
			color: #3d7aed;
		}
	}

	.divider {
		color: #cbd5e0;
		margin: 0 4px;
	}
}

@media screen and (max-width: 480px) {
	.login-container {
		padding: 16px;
		background: white;
		min-height: calc(100vh - 160px);
	}

	.login-card {
		box-shadow: none;
		padding: 20px 16px;
	}

	.login-title {
		font-size: 20px;
		margin-bottom: 24px;
	}

	.input-wrapper {
		margin-bottom: 20px;

		label {
			font-size: 15px;
		}

		input {
			padding: 12px 14px;
			font-size: 16px;
			-webkit-appearance: none;
			border-radius: 8px;
		}
	}

	.login-button {
		padding: 16px;
		font-size: 16px;
		border-radius: 8px;
	}

	.action-links {
		margin-top: 32px;

		.link-button {
			font-size: 14px;
			padding: 8px;
		}

		.divider {
			margin: 0 8px;
		}
	}
}
</style>
