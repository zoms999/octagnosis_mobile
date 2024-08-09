<template>
	<div id="content" class="join">
		<div class="container">
			<h1 class="logo v2"><a href="javascript:void(0);">옥타그노시스</a></h1>
			<h2 class="title">회원정보 수정</h2>
			<div class="form-wrap mt10">
				<div class="form-group">
					<p class="txt-guide">아래 해당 사항을 입력해 주세요.</p>
					<div class="form">
						<div class="form-title">
							<p>아이디</p>
						</div>
						<div class="form-cont">
							<input
								type="text"
								v-model="Acunt.acuntId"
								id="acuntId"
								name="acuntId"
								class="w300"
								disabled
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
								v-model.trim="Acunt.pw"
								id="pw"
								name="pw"
								class="w300"
								placeholder="6자 이상, 영문, 숫자, 특수문자 사용"
								required
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
								required
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
								required
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
									<label for="male">
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
									<label for="female">
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
								required
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
								required
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
									required
								/>
								<button class="btn sm line-navy" @click="searchAddress">
									검색
								</button>
								<input
									type="text"
									v-model.trim="Person.addrStret"
									id="addrStret"
									name="addrStret"
									placeholder="주소"
									required
								/>
								<input
									type="text"
									v-model.trim="Person.addrLotNum"
									id="addrLotNum"
									name="addrLotNum"
									placeholder="상세주소"
									required
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
									<option value="" hidden>학력</option>
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
									<option value="" hidden>상태</option>
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
				<div class="btn-wrap mt20">
					<button class="btn md round fill-navy w165" @click="updateProfile">
						수정하기
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const Acunt = reactive({
	acuntId: '',
	pw: '',
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
	educt: '', //학력
	eductStus: '', //상태 재학 휴학 자퇴 수료 졸업
	scholNm: '',
	scholMajor: '', //전공
	scholGrade: '', //학년
	job: '', //직업군
	jobNm: '', //직장명
	jobDuty: '',
});

const passwordsMatch = ref(true);
const pwConfirmation = ref('');

onMounted(async () => {
	console.log('onMounted');
	await loadUserData();
});
const acuntId = ref(sessionStorage.getItem('acuntId') || '');

const loadUserData = async () => {
	try {
		if (!acuntId.value) {
			console.error('acuntId is not defined');
			return;
		}
		console.log('acuntId.value', acuntId.value);
		const response = await axios.post('/api/member/user-data', {
			acuntId: acuntId.value,
		});
		if (response.data) {
			Object.assign(Acunt, response.data.Acunt);
			Object.assign(Person, response.data.Personal);
			pwConfirmation.value = Acunt.pw; // 비밀번호 확인 필드에 pw 값을 설정
			console.log('response.data', response.data);
		}
	} catch (error) {
		console.error('Failed to load user data', error);
	}
};

const checkPasswordMatch = () => {
	passwordsMatch.value = Acunt.pw === pwConfirmation.value;
};

const updateProfile = async () => {
	if (!passwordsMatch.value) {
		alert('비밀번호가 일치하지 않습니다.');
		return;
	}

	const combinedData = {
		acunt: Acunt,
		personal: Person,
	};

	try {
		const response = await axios.post('/api/member/update-user', combinedData);
		if (response.status === 200) {
			alert('회원정보가 성공적으로 수정되었습니다.');
		} else {
			alert('회원정보 수정에 실패했습니다.');
		}
	} catch (error) {
		console.error('Failed to update profile', error);
		alert('회원정보 수정에 실패했습니다.');
	}
};

const searchAddress = () => {
	// 주소 검색 로직 구현
	// 예: 다음 우편번호 서비스 API 사용
};
</script>

<style scoped>
.error-message {
	color: red;
	font-size: 0.8em;
	margin-top: 5px;
}
</style>
