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
								ref="txtAcuntId"
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
								ref="txtPw"
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
									type="password"
									v-model="loginData.code"
									placeholder="발급받으신 코드 입력"
									ref="txtTurnConnCd"
									required="required"
								/>
								<button class="btn sm line-navy w110 p0" @click="validateCode">
									유효성 확인
								</button>
							</div>
							<div v-if="codeInvalid == false" class="NotOk">
								유효하지 않은 코드입니다.
							</div>
							<div v-if="codeInvalid == true" class="Ok">
								정상코드 확인되었습니다.
							</div>
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
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const store = useAuthStore();
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
const txtTurnConnCd = ref(null);

const Procs = ref({
	login: { path: '/api/member/login', loading: false },
	chkTurnConnCd: { path: '/api/OrgTurn/chkTurnConnCd', loading: false },
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
						login(data.value.acunt, data.value.persn, loginData.value.code);
						router.push('/testStart');
					} else {
						switch (data.value.errCode) {
							case '100':
								alert(
									'기관소속 사용자 입니다. 기관 로그인 화면으로 이동합니다.',
								);
								router.push('/OrgLogin');
								break;
							case '200':
								vAlert('기관에 소속된 검사 회차코드가 아닙니다.');
								break;
							case '300':
								vAlert('사용자 정보를 확인하세요.');
								break;
						}
					}

					break;
				case Procs.value.chkTurnConnCd.path:
					if (data.value.ExistYn == 'Y') {
						loginData.value.orgId = data.value.OrgTurn.orgId;
						codeInvalid.value = true;
					} else {
						loginData.value.code = '';
						loginData.value.orgId = '0';
						codeInvalid.value = false;
						vAlert('잘못된 회차코드 입니다.');
					}
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

const codeInvalid = ref(null);

const goLogin = () => {
	if (!validNotBlank(loginData.value.acuntId, '아이디', txtAcuntId.value)) {
		return;
	}
	if (!validNotBlank(loginData.value.pw, '비밀번호', txtPw.value)) {
		return;
	}

	if (!validNotBlank(loginData.value.code, '회차코드', txtTurnConnCd.value)) {
		return;
	}

	if (loginData.value.orgId == '0') {
		vAlert('회차코드 유효성 검사를 진행하세요.');
		txtTurnConnCd.value.focus();
		return;
	}

	if (loginData.value.orgId) execUrl(Procs.value.login.path, loginData.value);
};

const validateCode = () => {
	const OrgTurn = ref({
		turnConnCd: loginData.value.code,
		valid: false,
	});

	if (!validNotBlank(loginData.value.code, '회차코드', txtTurnConnCd.value)) {
		return;
	}

	Procs.value.chkTurnConnCd.loading = true;
	execUrl(Procs.value.chkTurnConnCd.path, OrgTurn.value);
};

const findId = () => {
	alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
};

const findPw = () => {
	alert('비밀번호 찾기 기능은 아직 구현되지 않았습니다.');
};

// Etc	**************************************

const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};
</script>

<style scoped>
.Ok {
	margin: 10px 0 0 10px;
	color: deepskyblue;
}

.NotOk {
	margin: 10px 0 0 10px;
	color: red;
}
</style>
