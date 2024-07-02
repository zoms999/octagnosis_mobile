<template>
	<div id="content" class="main">
		<div class="visual">
			<div class="text-wrap">
				<div class="headline">
					<p class="text01">
						<span class="dot"></span>
						<strong>진짜 나</strong>를 찾아주는
					</p>
					<p class="text02">옥타그노시스 검사</p>
					<p class="text03">나답게 살아갈 인생설계도를 제시합니다!</p>
				</div>
				<p class="text04">
					해외의 진로적성검사를 짜깁기 한 검사가 아닙니다. <br />
					교육과학적 문항을 기반으로 특허받은 진로적성검사입니다.
				</p>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="d-flex justify-content-between">
			<div class="tit" @click="getTestList">
				검사이력
				<span class="sub">( 진행중인 검사는 신속히 완료하여 주십시요. )</span>
			</div>
			<div class="actions">
				<button
					class="btn btn-primary"
					@click="navigateToPayment"
					style="font-size: 1.8rem; padding: 0.8rem 1rem 0.8rem 1rem"
				>
					결제 후 검사시작
				</button>
			</div>
		</div>
		<table class="table table-bordered Tbl1">
			<thead>
				<tr>
					<th class="w80">순번</th>
					<th>검사상품</th>
					<th class="w150">검사유효일</th>
					<th class="w150">검사시작일</th>
					<th class="w150">검사완료일</th>
					<th class="w140">검사상태</th>
					<th class="w140">결과보기</th>
				</tr>
			</thead>
			<tbody>
				<!-- 여기에 데이터를 반복 렌더링 할 수 있습니다 -->
				<tr
					class="text-center"
					v-for="(item, idx) in TestList"
					:key="item.TurnId"
				>
					<td>{{ idx + 1 }}</td>
					<td>{{ item.ProdtNm }}</td>

					<td>{{ dayjs(item.ValidEndDt).format('YYYY-MM-DD') }}</td>
					<td>
						{{
							item.AnsPrgrsStartDt != ''
								? dayjs(item.AnsPrgrsStartDt).format('YYYY-MM-DD')
								: '-'
						}}
					</td>
					<td>
						{{
							item.AnsPrgrsEndDt != ''
								? dayjs(item.AnsPrgrsEndDt).format('YYYY-MM-DD')
								: '-'
						}}
					</td>

					<td class="text-center">
						<div v-if="item.TurnReqCnt - item.TurnUseCnt == 0">
							검사라이센스 부족
						</div>
						<div v-else-if="item.RegDt == '' || item.AnsPrgrsDoneYn == 'N'">
							<button
								class="btn btn-primary"
								@click="
									getNextTest(
										item.AnsPrgrsId,
										item.TurnId,
										item.PayId,
										item.ProdtId,
										item.TestId,
										item.QuestPageId,
									)
								"
							>
								{{ item.RegDt == '' ? '검사 시작' : '검사 진행중' }}
							</button>
						</div>
						<div v-else-if="item.AnsPrgrsDoneYn == 'Y'">검사완료</div>
					</td>
					<td>
						<div v-if="item.AnsPrgrsDoneYn == 'Y'">
							<button class="btn btn-primary">결과보기</button>
						</div>
						<div v-else>-</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="text-center mb-5">
			검사결과 '다시 보기'는 유효일자 안에서만 가능합니다.
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBase64Utils } from '@/plugins/base64.js';

// Props / Emit  ****************************

// Hook  ************************************

onMounted(() => {
	getTestList();
});

// Model / Data  ****************************

const { acuntId, orgId, turnConnCd, userId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();
const router = useRouter();
const dayjs = inject('dayjs');
const { encodeBase64 } = useBase64Utils();

const TestList = ref([]);

const TestParm = {
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,
	insId: userId.value,

	ansPrgrsId: '0',
	turnId: '0',
	payId: '0',

	prodtId: 0,
	testId: 0,
	questPageId: 0,
};

var windowRef = null;

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getTestList: { path: '/api/Test/getTestList', loading: false },
	getNextTest: { path: '/api/Test/getNextTest', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getTestList.path:
					Procs.value.getTestList.loading = false;
					TestList.value = data.value.TestList;
					break;
				case Procs.value.getNextTest.path:
					Procs.value.getNextTest.loading = false;

					TestParm.ansPrgrsId = data.value.ansPrgrsId;
					TestParm.testId = data.value.testId;
					TestParm.questPageId = data.value.questPageId;
					popupPage();
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

// Modal  ***********************************

const navigateToPayment = () => {
	router.push('/testPayment');
};

// Watch  ***********************************

// Method  **********************************

const getTestList = () => {
	execUrl(Procs.value.getTestList.path, TestParm);
};

const getNextTest = (
	ansPrgrsId,
	turnId,
	payId,
	prodtId,
	testId,
	questPageId,
) => {
	if (ansPrgrsId == '0') {
		if (
			!confirm(
				'기관에서 부여받은 검사회차 라이센스를 사용합니다.\n\n검사를 시작하시겠습니까 ?',
			)
		) {
			return;
		}
	} else {
		alert('진행중인 검사를 계속 합니다.');
	}
	TestParm.ansPrgrsId = ansPrgrsId;
	TestParm.turnId = turnId;
	TestParm.payId = payId;

	TestParm.prodtId = prodtId;
	TestParm.testId = testId;
	TestParm.questPageId = questPageId;

	execUrl(Procs.value.getNextTest.path, TestParm);
};

const popupPage = () => {
	var nm = TestParm.questPageId == '0' ? 'questMain' : 'quest';

	const parm = encodeBase64(JSON.stringify(TestParm));
	let uri = `${nm}?p=${parm}`;

	//localhost:5200/QuestMain?TestId=1&QuestPageId=2

	if (windowRef != null) {
		windowRef.focus();
		return;
	}

	const width = screen.width;
	const height = screen.height;

	let left = screen.width ? (screen.width - width) / 2 : 0;
	let top = screen.height ? (screen.height - height) / 2 : 0;

	let attr =
		'top=' +
		top +
		', left=' +
		left +
		', width=' +
		width +
		', height=' +
		height +
		', resizable=no,status=no';

	// 1. 윈도우 팝업 띄우기
	windowRef = window.open(uri, '', attr);

	if (!windowRef && windowRef.closed) {
		//windowRef.addEventListener('beforeunload', this.evtClose);
	} else {
		windowRef.focus();
	}
};

// Etc  *************************************
</script>

<style lang="scss" scoped>
.tit {
	font-size: 2.5rem;
	font-weight: 700;
	margin: 5px 0 0 0px;
	padding: 0 0 0 10px;
}
.tit span.sub {
	font-size: 1.8rem;
	margin: 0 0 0 10px;
}

.test-page {
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 280px);

	.header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;
	}

	.main {
		flex: 1;
		padding: 1rem;

		.test-table {
			width: 100%;
			border-collapse: collapse;

			th,
			td {
				border: 1px solid #ccc;
				padding: 0.5rem;
				text-align: center;
			}

			th {
				background-color: #e9e9e9;
			}
		}
	}

	.footer {
		padding: 1rem;
		background-color: #f5f5f5;
		border-top: 1px solid #ccc;
		text-align: center;
		font-size: 0.9rem;
	}
}
</style>
