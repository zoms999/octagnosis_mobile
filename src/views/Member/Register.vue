<template>
	<div id="content" class="join">
		<div class="container">
			<!-- 20230626 수정 -->
			<h2 class="title">{{ $t('join_member') }}</h2>
			<button
				class="btn btn-existing d-flex justify-content-center"
				@click="navigateToLogin"
			>
				{{ $t('Member_4') }}<i class="ic-existing"></i>
			</button>
			<div class="form-wrap mt10">
				<div class="form-group">
					<p class="txt-guide">{{ $t('Member_2') }}</p>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('username') }}</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<input
									type="text"
									v-model.trim="Acunt.acuntId"
									id="acuntId"
									name="acuntId"
									class="w300"
									:placeholder="$t('enterUsername')"
									required="required"
									ref="acuntIdInput"
								/>
								<button class="btn sm line-navy" @click="checkDuplicateId">
									{{ $t('Member_7') }}
								</button>
								<div v-if="!Acunt.acuntId">
									{{ $t('Member_8') }}
								</div>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('password') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model.trim="Acunt.pw"
								id="pw"
								name="pw"
								class="w300"
								:placeholder="$t('Member_13')"
								required="required"
								@input="checkPasswordMatch"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('Member_9') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="password"
								v-model="pwConfirmation"
								id="pwConfirmation"
								name="pwConfirmation"
								class="w300"
								:placeholder="$t('Member_10')"
								required="required"
								@input="checkPasswordMatch"
							/>
						</div>
						<div v-if="!passwordsMatch" class="error-message">
							{{ $t('Member_11') }}
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('name') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.persnNm"
								id="persnNm"
								name="persnNm"
								class="w300"
								:placeholder="$t('Member_14')"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('sex') }}</p>
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
									<label for="male">
										<p>{{ $t('man') }}</p>
									</label>
								</div>
								<div class="radio">
									<input
										type="radio"
										v-model="Person.sex"
										id="female"
										value="F"
									/>
									<label for="female">
										<p>{{ $t('female') }}</p>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('phone') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.phone"
								id="phone"
								name="phone"
								class="w300"
								:placeholder="$t('Member_16')"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('email') }}</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model.trim="Person.email"
								id="email"
								name="email"
								class="w300"
								:placeholder="$t('Member_15')"
								required="required"
							/>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('address') }}</p>
						</div>
						<div class="form-cont">
							<div class="abode">
								<input
									type="text"
									v-model.trim="Person.zip"
									id="zip"
									name="zip"
									:placeholder="$t('zip')"
									required="required"
									disabled="disabled"
								/>
								<button class="btn sm line-navy" @click="popupAddr">
									{{ $t('search') }}
								</button>
								<div class="d-flex justify-content-start" style="width: 100%">
									<input
										type="text"
										v-model.trim="Person.addrStret"
										id="addrStret"
										name="addrStret"
										:placeholder="$t('address')"
										required="required"
										disabled="disabled"
										class="me-2"
										style="width: 60%"
									/>
									<input
										type="text"
										v-model.trim="Person.addr2"
										id="addrLotNum"
										name="addrLotNum"
										:placeholder="$t('address_detail')"
										required="required"
										disabled="disabled"
										style="width: 40%"
									/>
								</div>
								<input
									type="text"
									v-model.trim="Person.addr3"
									id="addr3"
									name="addr3"
									:placeholder="$t('address_add')"
									required="required"
									ref="txtAddr3"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<p class="txt-guide">
						{{ $t('Member_3') }}
					</p>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('last_edu') }}</p>
						</div>
						<div class="form-cont">
							<div class="education">
								<select v-model="Person.educt" id="educt" name="educt">
									<option value="" hidden selected>{{ $t('edu_1') }}</option>
									<option value="C01001">{{ $t('edu_2') }}</option>
									<option value="C01002">{{ $t('edu_3') }}</option>
									<option value="C01003">{{ $t('edu_4') }}</option>
									<option value="C01004">{{ $t('edu_5') }}</option>
									<option value="C01005">{{ $t('edu_6') }}</option>
									<option value="C01006">{{ $t('edu_7') }}</option>
									<option value="C01007">{{ $t('edu_8') }}</option>
								</select>
								<select
									v-model="Person.eductStus"
									id="eductStus"
									name="eductStus"
								>
									<option value="" hidden selected>
										{{ $t('eductStus_1') }}
									</option>
									<option value="C03001">{{ $t('eductStus_2') }}</option>
									<option value="C03002">{{ $t('eductStus_3') }}</option>
									<option value="C03003">{{ $t('eductStus_4') }}</option>
									<option value="C03004">{{ $t('eductStus_5') }}</option>
									<option value="C03005">{{ $t('eductStus_6') }}</option>
								</select>
							</div>
						</div>
					</div>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('academic_group') }}</p>
						</div>
						<div class="form-cont">
							<div class="study">
								<input
									type="text"
									v-model.trim="Person.scholNm"
									id="scholNm"
									name="scholNm"
									:placeholder="$t('Member_17')"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.scholMajor"
									id="scholMajor"
									name="scholMajor"
									:placeholder="$t('Member_18')"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.scholGrade"
									id="scholGrade"
									name="scholGrade"
									:placeholder="$t('Member_19')"
									required="required"
								/>
							</div>
						</div>
					</div>

					<div class="form">
						<div class="form-title">
							<p>{{ $t('Member_20') }}</p>
						</div>
						<div class="form-cont">
							<div class="education">
								<select name="job" id="job" v-model="Person.job">
									<option value="" hidden selected>{{ $t('job_1') }}</option>
									<option value="C02001">{{ $t('job_2') }}</option>
									<option value="C02002">{{ $t('job_3') }}</option>
									<option value="C02003">{{ $t('job_4') }}</option>
									<option value="C02004">{{ $t('job_5') }}</option>
									<option value="C02005">{{ $t('job_6') }}</option>
									<option value="C02006">{{ $t('job_7') }}</option>
									<option value="C02007">{{ $t('job_8') }}</option>
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
									:placeholder="$t('Member_21')"
									required="required"
								/>
								<input
									type="text"
									v-model.trim="Person.jobDuty"
									id="jobDuty"
									name="jobDuty"
									:placeholder="$t('Member_22')"
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
							<p>{{ $t('Member_23') }}</p>
						</label>
					</div>
				</div>
			</div>
			<div class="btn-wrap mt20">
				<button class="btn md round fill-navy w165" @click="signUpSubmit">
					{{ $t('save') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // Import translation function
const router = useRouter();
const txtAddr3 = ref();

const Acunt = ref({
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
});

const Person = reactive({
	code: '',
	persnNm: '',
	sex: '',
	phone: '',
	email: '',
	zip: '',
	addrStret: '',
	addrLotNum: '',
	addr2: '',
	addr3: '',
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
});

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

const navigateToLogin = () => {
	router.push('/login'); // Update this with your actual login route
};

// 회원가입 버튼 클릭 시 호출될 함수
const signUpSubmit = handleSubmit(async () => {
	const acuntRequiredFields = ['acuntId', 'pw'];
	const acuntEmptyFields = acuntRequiredFields.filter(
		field => !Acunt.value[field],
	);

	if (acuntEmptyFields.length > 0) {
		const missingFields = acuntEmptyFields
			.map(field => AcuntFieldsLabels[field])
			.join(', ');
		alert(`${t('Member_31')} : ${missingFields}`);
		return;
	}
	if (passwordsMatch.value == '') {
		alert(t('Member_34'));
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
		alert(`${t('Member_31')} : ${missingFields}`);
		return;
	}

	if (!passwordsMatch.value) {
		alert(t('Member_11'));
		return;
	}
	const combinedData = {
		acunt: Acunt.value,
		personal: Person,
	};

	try {
		const response = await axios.post('/api/member/register', combinedData);
		console.log(response.data);
		alert(t('Member_29') + ' ' + t('Member_30'));
		router.push({ name: 'login' });
	} catch (error) {
		console.error(error.response);
		alert(t('Member_26'));
	}
});

const checkDuplicateId = async () => {
	if (!Acunt.value.acuntId) {
		// 입력된 값이 없는 경우 메시지를 표시합니다.
		alert(t('enterUsername'));
		this.$refs.acuntIdInput.focus(); // 입력란에 포커스를 맞춥니다.
		return;
	}
	try {
		const response = await axios.post('/api/member/check-id', {
			acuntId: Acunt.value.acuntId,
		});
		if (response.data.isDuplicate) {
			alert(t('Member_31'));
		} else {
			alert(t('Member_32'));
		}
	} catch (error) {
		console.error(error);
		alert(t('Member_33'));
	}
};

const passwordsMatch = ref(true);
const pwConfirmation = ref('');
const checkPasswordMatch = () => {
	console.log('Password:', Acunt.value.pw);
	console.log('Confirmation:', pwConfirmation.value);
	passwordsMatch.value = Acunt.value.pw === pwConfirmation.value;
};

onMounted(() => {
	const script = document.createElement('script');
	script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
	script.async = true;
	document.body.appendChild(script);
});

const popupAddr = () => {
	new daum.Postcode({
		oncomplete: function (data) {
			Person.zip = data.zonecode;
			Person.addrStret = data.roadAddress;
			Person.addrLotNum = data.jibunAddress;
			Person.addr2 = data.buildingName;
			txtAddr3.value.focus();

			//alert(data);
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
			// 예제를 참고하여 다양한 활용법을 확인해 보세요.
		},
	}).open();
};
</script>

<style lang="scss" scoped>
.error-message {
	color: red;
}
</style>
