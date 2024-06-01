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
					<p class="txt-guide">소속기관에서 발급받으신 코드를 입력해주세요.</p>

					<div class="form">
						<div class="form-title">
							<p>회차코드</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<input
									type="text"
									v-model="loginData.code"
									placeholder="발급받으신 코드 입력"
									required="required"
								/>
								<button class="btn sm line-navy w120 p0" @click="validateCode">
									유효성 확인
								</button>
							</div>
							<div v-if="orgName">소속기관명: {{ orgName }}</div>
							<div v-if="codeInvalid" class="error-message">
								유효하지 않은 코드입니다.
							</div>
						</div>
					</div>
				</div>

				<div class="btn-wrap mt30">
					<button class="btn md round fill-navy w300" @click="submit">
						로그인
					</button>
				</div>

				<div class="user-offer">
					<ul>
						<li>
							<button
								class="btn-txt btn-find-id"
								onclick="popOpenAndDim('layerFindId', true)"
							>
								아이디 찾기
							</button>
						</li>
						<li>
							<button
								class="btn-txt btn-find-pw"
								onclick="popOpenAndDim('layerFindPw', true)"
							>
								비밀번호 찾기
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const { login } = store;

const router = useRouter();

const loginData = ref({
	acuntId: '',
	pw: '',
	code: '',
});

const submit = async () => {
	try {
		const response = await axios.post(
			'http://localhost:8080/api/member/login',
			loginData.value,
		);
		alert(codeInvalid.value);
		if (response.data.success && codeInvalid.value == false) {
			console.log(response.data);
			login(response.data.acunt);
			console.log('codeInvalid  ' + codeInvalid.value);
			window.alert('로그인하였습니다.');
			console.log('LoginView isAuthenticated --' + isAuthenticated.value);
			console.log('LoginView acuntId --' + response.data.acunt.acuntId);
			router.push('/dashboard');
		} else {
			alert('로그인 실패: ' + response.data.message);
		}
	} catch (error) {
		console.error(error);
		alert('로그인 중 오류가 발생했습니다.');
	}
};

const orgName = ref('');
const codeInvalid = ref(false);

const validateCode = async () => {
	try {
		//alert(Person.code);
		const response = await axios.post(
			'http://localhost:8080/api/member/validate-code',
			{ urlCd: loginData.value.code },
		);
		if (response.data.exists) {
			orgName.value = response.data.compyNm;
			codeInvalid.value = false;
		} else {
			orgName.value = '';
			codeInvalid.value = true;
		}
	} catch (error) {
		console.error(error);
		codeInvalid.value = true;
	}
};

const findId = () => {
	alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
};

const findPw = () => {
	alert('비밀번호 찾기 기능은 아직 구현되지 않았습니다.');
};
</script>

<style lang="scss" scoped></style>
