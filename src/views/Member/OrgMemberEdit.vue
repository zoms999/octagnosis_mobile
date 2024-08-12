<template>
	<div id="content" class="join">
		<div class="container">
			<!-- 20230626 수정 -->
			<h2 class="title">
				{{ isEditMode ? $t('edit_info') : $t('join_member') }}
			</h2>
			<button class="btn btn-existing" v-if="!isEditMode">
				{{ $t('Member_4') }}<i class="ic-existing"></i>
			</button>
			<div class="form-wrap mt10">
				<div class="form-group">
					<p class="txt-guide">{{ $t('Member_1') }}</p>
					<div class="form">
						<div class="form-title">
							<p>{{ $t('Member_5') }}</p>
						</div>
						<div class="form-cont">
							<div class="inp-wrap">
								<input
									v-model.trim="Person.code"
									id="code"
									name="code"
									type="text"
									class="w300"
									:placeholder="$t('code_placeholder')"
									required
									:disabled="isEditMode"
								/>
								<button
									class="btn sm line-navy"
									v-if="!isEditMode"
									@click="validateCode"
								>
									{{ $t('code_validation_button') }}
								</button>
								<div v-if="orgName">{{ $t('Member_6') }}: {{ orgName }}</div>
								<div v-if="codeInvalid === false" class="error-message">
									{{ $t('code_invalid_message') }}
								</div>
							</div>
						</div>
					</div>
				</div>
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
									required
									:disabled="isEditMode"
								/>
								<button
									class="btn sm line-navy"
									v-if="!isEditMode"
									@click="checkDuplicateId"
								>
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
								required
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
								v-model.trim="pwConfirmation"
								id="pwConfirmation"
								name="pwConfirmation"
								class="w300"
								:placeholder="$t('Member_10')"
								required
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
								required
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
								required
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
								required
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
									required
								/>
								<button class="btn sm line-navy">{{ $t('search') }}</button>
								<input
									type="text"
									v-model.trim="Person.addrStret"
									id="addrStret"
									name="addrStret"
									:placeholder="$t('address')"
									required
								/>
								<input
									type="text"
									v-model.trim="Person.addrLotNum"
									id="addrLotNum"
									name="addrLotNum"
									:placeholder="$t('address_detail')"
									required
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
				<div class="btn-wrap mt20">
					<button class="btn md round fill-navy w165" @click="handleSubmit">
						{{ $t('edit') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // Import translation function
const router = useRouter();

// Reactive state
const isEditMode = ref(false);
const orgName = ref('');
const codeInvalid = ref(null);
const pwConfirmation = ref('');
const passwordsMatch = ref(true);
const duplicateIdChecked = ref(false);

const Person = reactive({
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
});

const Acunt = reactive({
	acuntId: '',
	pw: '',
});

// Check URL params to determine if it's edit mode
onMounted(() => {
	console.log('onMounted');
	const params = new URLSearchParams(window.location.search);
	if (params.get('mode') === 'edit') {
		isEditMode.value = true;
		loadUserData();
	}
});

// Methods
const validateCode = async () => {
	try {
		const response = await axios.post('/api/validate-code', {
			code: Person.code,
		});
		if (response.data.valid) {
			orgName.value = response.data.orgName;
			codeInvalid.value = false;
		} else {
			orgName.value = '';
			codeInvalid.value = true;
		}
	} catch (error) {
		console.error(error);
	}
};

const checkDuplicateId = async () => {
	try {
		const response = await axios.post('/api/check-duplicate-id', {
			acuntId: Acunt.acuntId,
		});
		duplicateIdChecked.value = response.data.isAvailable;
		if (!duplicateIdChecked.value) {
			alert(t('Member_27'));
		}
	} catch (error) {
		console.error(error);
	}
};

const checkPasswordMatch = () => {
	passwordsMatch.value = Acunt.pw === pwConfirmation.value;
};

const acuntId = ref(sessionStorage.getItem('acuntId') || '');

const loadUserData = async () => {
	try {
		if (!acuntId.value) {
			console.error('acuntId is not defined');
			return;
		}

		console.log('acuntId', acuntId.value);
		const response = await axios.post('/api/member/user-data', {
			acuntId: acuntId.value,
		});
		if (response.data) {
			Object.assign(Person, response.data.Personal);
			Object.assign(Acunt, response.data.Acunt);
			pwConfirmation.value = Acunt.pw; // 비밀번호 확인 필드에 pw 값을 설정
			isEditMode.value = true; // Set edit mode based on your logic
		}
	} catch (error) {
		console.error(error);
	}
};
const handleSubmit = async () => {
	if (!passwordsMatch.value) {
		alert(t('Member_11'));
		return;
	}

	if (!duplicateIdChecked.value && !isEditMode.value) {
		alert(t('Member_12'));
		return;
	}

	const combinedData = {
		acunt: Acunt,
		personal: Person,
	};

	try {
		const apiEndpoint = isEditMode.value
			? '/api/member/update-user'
			: '/api/signup';
		const response = await axios.post(apiEndpoint, combinedData);
		console.log('isEditMode', response.data);
		console.log('isEditMode', response.data.success);
		if (response.status === 200) {
			alert(isEditMode.value ? t('Member_28') : t('Member_29'));
			router.push({ name: 'testStart' });
		} else {
			alert(t('Member_26'));
		}
	} catch (error) {
		console.error(error);
		alert(t('Member_26'));
	}
};
</script>
