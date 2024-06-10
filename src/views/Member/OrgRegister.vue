<template>
	<div id="content" class="join">
		<div class="container">
			<h1 class="logo v2"><a href="javascript:void(0);">옥타그노시스</a></h1>
			<!-- 20230626 수정 -->
			<h2 class="title">회원가입</h2>
			<button class="btn btn-existing">
				이미 가입하신 분은 여기를 클릭하세요<i class="ic-existing"></i>
			</button>
			<div class="form-wrap mt10">
				<div class="form-group">
					<p class="txt-guide">소속기관에서 발급받으신 코드를 입력해주세요.</p>
					<div class="form">
						<div class="form-title">
							<p>코드입력</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<input
									v-model.trim="Person.code"
									id="code"
									name="code"
									type="text"
									class="w300"
									placeholder="발급받으신 코드 입력"
									required
								/>
								<button class="btn sm line-navy" @click="validateCode">
									유효성 확인
								</button>
								<div v-if="orgName">소속기관명: {{ orgName }}</div>
								<div v-if="codeInvalid == false" class="error-message">
									유효하지 않은 코드입니다.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<p class="txt-guide">아래 해당 사항을 입력해 주세요.</p>
					<div class="form">
						<div class="form-title">
							<p>아이디</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<input
									type="text"
									v-model.trim="Acunt.acuntId"
									id="acuntId"
									name="acuntId"
									class="w300"
									placeholder="아이디를 입력하세요"
									required="required"
									ref="acuntIdInput"
								/>
								<button class="btn sm line-navy" @click="checkDuplicateId">
									중복 체크
								</button>
								<div v-if="!Acunt.acuntId">
									입력란이 비어 있습니다. 아이디를 입력하세요.
								</div>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>비밀번호</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model.trim="Acunt.pw"
								id="pw"
								name="pw"
								class="w300"
								placeholder="6자 이상, 영문, 숫자, 특수문자 사용"
								required="required"
								@input="checkPasswordMatch"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>비밀번호 확인</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model="pwConfirmation"
								id="pwConfirmation"
								name="pwConfirmation"
								class="w300"
								placeholder="비밀번호를 재입력하세요"
								required="required"
								@input="checkPasswordMatch"
							/>
						</div>
						<div v-if="!passwordsMatch" class="error-message">
							비밀번호가 일치하지 않습니다.
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>이름</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.persnNm"
								id="persnNm"
								name="persnNm"
								class="w300"
								placeholder="이름을 입력하세요"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>성별</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<div class="radio">
									<input
										type="radio"
										v-model="Person.sex"
										id="male"
										value="M"
									/>
									<label for="">
										<p>남</p>
									</label>
								</div>
								<div class="radio">
									<input
										type="radio"
										v-model="Person.sex"
										id="female"
										value="F"
									/>
									<label for="">
										<p>여</p>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>연락처</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.phone"
								id="phone"
								name="phone"
								class="w300"
								placeholder="숫자만 입력해 주세요"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>이메일 주소</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.email"
								id="email"
								name="email"
								class="w300"
								placeholder="이메일 주소를 입력하세요"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>주소</p>
						</div>
						<div class="form-cont">
							<div class="abode">
								<input
									type="text"
									v-model.trim="Person.zip"
									id="zip"
									name="zip"
									placeholder="우편번호"
									required="required"
								/>
								<button class="btn sm line-navy">검색</button>
								<input
									type="text"
									v-model.trim="Person.addrStret"
									id="addrStret"
									name="addrStret"
									placeholder="주소"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.addrLotNum"
									id="addrLotNum"
									name="addrLotNum"
									placeholder="상세주소"
									required="required"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<p class="txt-guide">
						아래 해당 사항을 입력해 주세요.
						<span class="txt-orange"
							>(현재 또는 최종학력으로 빈 칸에 직접 기재하시기 바랍니다.)</span
						>
					</p>
					<div class="form">
						<div class="form-title">
							<p>최종 학업</p>
						</div>
						<div class="form-cont">
							<div class="education">
								<select v-model="Person.educt" id="educt" name="educt">
									<option value="" hidden selected>학력</option>
									<option value="C01001">초등</option>
									<option value="C01002">중등</option>
									<option value="C01003">고등</option>
									<option value="C01004">2,3년제 대학</option>
									<option value="C01005">4년제 대학교</option>
									<option value="C01006">대학원 석사</option>
									<option value="C01007">대학원 박사</option>
								</select>
								<select
									v-model="Person.eductStus"
									id="eductStus"
									name="eductStus"
								>
									<option value="" hidden selected>상태</option>
									<option value="C03001">재학</option>
									<option value="C03002">휴학</option>
									<option value="C03003">자퇴</option>
									<option value="C03004">수료</option>
									<option value="C03005">졸업</option>
								</select>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>학업군</p>
						</div>
						<div class="form-cont">
							<div class="study">
								<input
									type="text"
									v-model.trim="Person.scholNm"
									id="scholNm"
									name="scholNm"
									placeholder="학교명을 입력하세요"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.scholMajor"
									id="scholMajor"
									name="scholMajor"
									placeholder="전공을 입력하세요"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.scholGrade"
									id="scholGrade"
									name="scholGrade"
									placeholder="학년을 입력하세요"
									required="required"
								/>
							</div>
						</div>
					</div>

					<div class="form">
						<div class="form-title">
							<p>직업군</p>
						</div>
						<div class="form-cont">
							<div class="education">
								<select name="job" id="job" v-model="Person.job">
									<option value="" hidden selected>기타</option>
									<option value="C02001">학생</option>
									<option value="C02002">회사원</option>
									<option value="C02003">전문직</option>
									<option value="C02004">사업가</option>
									<option value="C02005">공무원</option>
									<option value="C02006">주부</option>
									<option value="C02007">무직</option>
								</select>
							</div>
						</div>
					</div>

					<div class="form">
						<div class="form-title">
							<p></p>
						</div>
						<div class="form-cont">
							<div class="job">
								<input
									type="text"
									v-model.trim="Person.jobNm"
									id="jobNm"
									name="jobNm"
									placeholder="직장명을 입력하세요"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.jobDuty"
									id="jobDuty"
									name="jobDuty"
									placeholder="하시는 일을 입력하세요"
									required="required"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="check">
						<input
							type="checkbox"
							name="agreement"
							id="agreement"
							v-model="Person.agreement"
							required
						/>
						<label for="agreement">
							<p>개인정보 동의</p>
						</label>
					</div>
				</div>
			</div>
			<div class="btn-wrap mt20">
				<button class="btn md round fill-navy w165" @click="signUpSubmit">
					회원가입
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useForm } from 'vee-validate';
import router from '@/router';

const Acunt = {
	acuntId: '',
	userType: 'C00102',
	userId: '',
	pw: '',
	useYn: 'Y',
	regDt: '',
	leaveDt: '',
	expirDt: '',
	termsUse: 'Y',
	termsPersn: 'Y',
	termsEvent: 'Y',
	insId: '',
	insDt: '',
	uptId: '',
	uptDt: '',
};

const Person = {
	code: '',
	persnNm: '',
	sex: '',
	phone: '',
	email: '',
	zip: '',
	addrStret: '',
	addrLotNum: '',
	educt: '', //학력
	eductStus: '', //상태 재학 휴학 자퇴 수료 졸업
	scholNm: '',
	scholMajor: '', //전공
	scholGrade: '', //학년
	job: '', //직업군
	jobNm: '', //직장명
	jobDuty: '',
	agreement: false,
	orgId: 0, // 조직Id
};

const { handleSubmit, errors } = useForm();
const AcuntFieldsLabels = {
	acuntId: '계정 ID',
	pw: '비밀번호',
};
const PersonFieldsLabels = {
	code: '코드',
	persnNm: '이름',
	sex: '성별',
	phone: '전화번호',
	email: '이메일',
	zip: '우편번호',
	addrStret: '도로명 주소',
	addrLotNum: '지번 주소',
	educt: '학력',
	scholNm: '학교명',
	scholMajor: '전공',
	scholGrade: '학년',
	job: '직업',
	jobNm: '직장명',
	jobDuty: '직무',
	agreement: '동의',
};

const orgName = ref('');
const codeInvalid = ref(false);
const codeValidationAttempted = ref(false);

const validateCode = async () => {
	try {
		//alert(Person.code);
		const response = await axios.post(
			'http://localhost:8080/api/member/validate-code',
			{ urlCd: Person.code },
		);
		codeValidationAttempted.value = true;
		if (response.data.exists) {
			orgName.value = response.data.compyNm;
			Person.orgId = response.data.orgId;
			codeInvalid.value = true;
		} else {
			orgName.value = '';
			codeInvalid.value = false;
		}
	} catch (error) {
		console.error(error);
		codeValidationAttempted.value = true;
		codeInvalid.value = false;
	}
};

// 회원가입 버튼 클릭 시 호출될 함수
const signUpSubmit = handleSubmit(async () => {
	if (codeInvalid.value == false) {
		alert('유효하지 않은 코드입니다.유효성을 진행해 주세요.');
		return;
	}

	const acuntRequiredFields = ['acuntId', 'pw'];
	const acuntEmptyFields = acuntRequiredFields.filter(field => !Acunt[field]);

	if (acuntEmptyFields.length > 0) {
		const missingFields = acuntEmptyFields
			.map(field => AcuntFieldsLabels[field])
			.join(', ');
		alert(`다음 필드를 작성해주세요: ${missingFields}`);
		return;
	}
	if (passwordsMatch.value == '') {
		alert('비밀번호 확인을 입력하세요.');
		return;
	}

	const personRequiredFields = [
		//'code',
		'persnNm',
		'sex',
		'phone',
		'email',
		'zip',
		'addrStret',
		'addrLotNum',
		'educt',
		'scholNm',
		'scholMajor',
		'scholGrade',
		'job',
		'jobNm',
		'jobDuty',
		'agreement',
	];
	const personEmptyFields = personRequiredFields.filter(
		field => !Person[field],
	);

	if (personEmptyFields.length > 0) {
		const missingFields = personEmptyFields
			.map(field => PersonFieldsLabels[field])
			.join(', ');
		alert(`다음 필드를 작성해주세요: ${missingFields}`);
		return;
	}

	if (!passwordsMatch.value) {
		alert('비밀번호가 일치하지 않습니다.');
		return;
	}
	const combinedData = {
		acunt: Acunt,
		personal: Person,
	};

	try {
		const response = await axios.post(
			'http://localhost:8080/api/member/register',
			combinedData,
		);
		console.log(response.data);
		alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
		router.push({ name: 'orglogin' });
	} catch (error) {
		console.error(error.response);
		alert('회원가입에 실패했습니다. 다시 시도해주세요.');
	}
});

const checkDuplicateId = async () => {
	if (!Acunt.acuntId) {
		// 입력된 값이 없는 경우 메시지를 표시합니다.
		alert('아이디를 입력하세요.');
		this.$refs.acuntIdInput.focus(); // 입력란에 포커스를 맞춥니다.
		return;
	}
	try {
		const response = await axios.post(
			'http://localhost:8080/api/member/check-id',
			{ acuntId: Acunt.acuntId },
		);
		if (response.data.isDuplicate) {
			alert('사용 가능한 아이디입니다.');
		} else {
			alert('이미 사용 중인 아이디입니다.');
		}
	} catch (error) {
		console.error(error);
		alert('아이디 중복 체크에 실패했습니다.');
	}
};

const passwordsMatch = ref(true);
const pwConfirmation = ref('');
const checkPasswordMatch = () => {
	console.log('Password:', Acunt.pw);
	console.log('Confirmation:', pwConfirmation.value);
	passwordsMatch.value = Acunt.pw === pwConfirmation.value;
};
</script>

<style lang="scss" scoped>
.error-message {
	color: red;
}
</style>
