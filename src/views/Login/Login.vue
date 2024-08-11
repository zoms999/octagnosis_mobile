<template>
	<div id="content" class="login">
		<div class="container">
			<div class="login-form">
				<h2 class="title">{{ $t('login') }}</h2>
				<div class="form-group">
					<div class="form">
						<div class="form-title">
							<p>{{ $t('username') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model="loginData.acuntId"
								class="w300"
								:placeholder="$t('enterUsername')"
								required="required"
								ref="txtAcuntId"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('password') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model="loginData.pw"
								class="w300"
								:placeholder="$t('enterPassword')"
								required="required"
								ref="txtPw"
							/>
						</div>
					</div>
				</div>

				<div class="btn-wrap mt30">
					<button class="btn md round fill-navy w300" @click="goLogin">
						{{ $t('login') }}
					</button>
				</div>

				<div class="user-offer">
					<ul>
						<li>
							<button
								class="btn-txt btn-find-id"
								@click="showFindIdModal = true"
							>
								{{ $t('findId') }}
							</button>
						</li>
						<li>
							<button
								class="btn-txt btn-find-pw"
								@click="showFindPwModal = true"
							>
								{{ $t('findPassword') }}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<FindIdModal :isVisible="showFindIdModal" @close="showFindIdModal = false" />
	<FindPasswordModal
		:isVisible="showFindPwModal"
		@close="showFindPwModal = false"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';

import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import FindIdModal from '@/views/Member/FindIdModal.vue';
import FindPasswordModal from '@/views/Member/FindPasswordModal.vue';
import LanguageSwitcher from '@/components/app/LanguageSwitcher.vue';

const { t, locale } = useI18n();

const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const { login } = store;

const router = useRouter();

const loginData = ref({
	acuntId: '',
	pw: '',
	code: '',
	orgId: '0',
});

const { vAlert, vSuccess } = useAlert();

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
const findId = () => {
	alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
};

const findPw = () => {
	alert('비밀번호 찾기 기능은 아직 구현되지 않았습니다.');
};

const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? t('enter1') : `${tit}${t('enter2')}`);
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

<style lang="scss" scoped></style>
