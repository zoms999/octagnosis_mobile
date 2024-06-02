<template>
	<div id="content" class="login">
		<h1 class="logo v2"><a href="javascript:void(0);">옥타그노시스</a></h1>
		<!-- 20230626 수정 -->
		<div class="container">
			<div class="login-form">
				<h2 class="title">로그인</h2>
				<div class="form-group">
					<div class="form">
						<div class="form-title">
							<p>아이디</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model="loginData.acuntId"
								class="w300"
								placeholder="아이디를 입력하세요"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>비밀번호</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model="loginData.pw"
								class="w300"
								placeholder="6자 이상, 영문, 숫자, 특수문자 사용"
								required="required"
							/>
						</div>
					</div>
				</div>

				<div class="btn-wrap mt30">
					<button class="btn md round fill-navy w300" @click="goLogin">
						로그인
					</button>
				</div>

				<div class="user-offer">
					<ul>
						<li>
							<button
								class="btn-txt btn-find-id"
								@click="showFindIdModal = true"
							>
								아이디 찾기
							</button>
						</li>
						<li>
							<button
								class="btn-txt btn-find-pw"
								@click="showFindPwModal = true"
							>
								비밀번호 찾기
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
import { ref } from 'vue';
import axios from 'axios';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';

import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import FindIdModal from '@/views/Member/FindIdModal.vue';
import FindPasswordModal from '@/views/Member/FindPasswordModal.vue';

const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const { login } = store;

const router = useRouter();

const loginData = ref({
	acuntId: '',
	pw: '',
});

const { vAlert, vSuccess } = useAlert();

const showFindIdModal = ref(false);
const showFindPwModal = ref(false);

// Axios / Route	***************************

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

					login(data.value.acunt, data.value.persn);

					//vSuccess('로그인하였습니다.');
					//console.log('LoginView isAuthenticated --' + isAuthenticated.value);
					//console.log('LoginView acuntId --' + data.value.acunt.acuntId);
					router.push('/testStart');

					break;

				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

const goLogin = () => {
	execUrl(Procs.value.login.path, loginData.value);
};

const findId = () => {
	alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
};

const findPw = () => {
	alert('비밀번호 찾기 기능은 아직 구현되지 않았습니다.');
};
</script>

<style lang="scss" scoped></style>
