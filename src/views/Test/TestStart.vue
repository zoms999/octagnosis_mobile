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
					<th class="w100">순번</th>
					<th>검사상품</th>
					<th class="w220">검사 유효일자</th>
					<th class="w220">검사완료일자</th>
					<th class="w140">검사상태</th>
					<th class="w140">결과보기</th>
				</tr>
			</thead>
			<tbody>
				<!-- 여기에 데이터를 반복 렌더링 할 수 있습니다 -->
				<template v-if="orgId == 0">
					<tr
						class="text-center"
						v-for="(item, idx) in TestList"
						:key="item.TurnId"
					>
						<td>{{ idx + 1 }}</td>
						<td>{{ item.ProdtNm }}</td>
						<td>{{ dayjs(item.ExpirDt).format('YYYY-MM-DD') }}</td>
						<td>
							{{
								item.AnsPrgrsEndDt !== ''
									? dayjs(item.AnsPrgrsEndDt).format('YYYY-MM-DD')
									: '-'
							}}
						</td>
						<td class="text-center">
							<div v-if="item.PayYn === 'Y'">
								<button
									class="btn btn-primary"
									@click="navigateToTestSelect(item.TestId, item.QuestPageId)"
								>
									검사진행
								</button>
							</div>
							<div v-else-if="item.PayYn === 'N'">결제하기</div>
							<div v-else-if="item.AnsPrgrsDoneYn === 'N'">검사진행중</div>
							<div v-else-if="item.AnsPrgrsDoneYn === 'Y'">검사완료</div>
						</td>
						<td>
							<div v-if="item.AnsPrgrsDoneYn === 'Y'">
								<button class="btn btn-primary">결과보기</button>
							</div>
							<div v-else>-</div>
						</td>
					</tr>
				</template>
				<template v-else>
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
								item.AnsPrgrsEndDt !== ''
									? dayjs(item.AnsPrgrsEndDt).format('YYYY-MM-DD')
									: '-'
							}}
						</td>
						<td class="text-center">
							<div v-if="item.TurnReqCnt - item.TurnUseCnt === 0">
								검사라이센스 부족
							</div>
							<div v-else-if="item.RegDt === ''">
								<button
									class="btn btn-primary"
									@click="
										popupPage({
											testId: item.TestId,
											questPageId: item.QuestPageId,
										})
									"
								>
									검사진행
								</button>
							</div>
							<div v-else-if="item.AnsPrgrsDoneYn === 'N'">검사진행중</div>
							<div v-else-if="item.AnsPrgrsDoneYn === 'Y'">검사완료</div>
						</td>
						<td>
							<div v-if="item.AnsPrgrsDoneYn === 'Y'">
								<button class="btn btn-primary">결과보기</button>
							</div>
							<div v-else>-</div>
						</td>
					</tr>
				</template>
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

const { acuntId, orgId, turnConnCd } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();
const router = useRouter();
const dayjs = inject('dayjs');
const { encodeBase64 } = useBase64Utils();

const TestList = ref([]);

const TestParm = {
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,
};

let windowRef = null;

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getTestList: { path: '/api/Test/getTestList', loading: false },
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

const getTestList = () => {
	execUrl(Procs.value.getTestList.path, TestParm);
};
console.log('orgId', orgId.value);
console.log('acuntId', acuntId.value);
// Watch  ***********************************

// Method  **********************************

const popupPage = q => {
	var nm = q.questPageId == '0' ? 'questMain' : 'quest';

	//let uri = `/views/Test/QuestMainView?testId=${q.testId}&questPageId=${q.questPageId}`;
	//let uri = `/src/views/Test/QuestMainView.vue?testId=${q.testId}&questPageId=${q.questPageId}`;
	const parm = encodeBase64(JSON.stringify(q));
	let uri = `${nm}?p=${parm}`;

	//localhost:5200/QuestMain?TestId=1&QuestPageId=2

	if (windowRef != null) {
		windowRef.focus();
		return;
	}
	const width = 1560;
	const height = 900;

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
	if (windowRef != null) {
		//windowRef.addEventListener('beforeunload', this.evtClose);
	} else {
		alert('window.open fail!!!');
	}
};

const navigateToTestSelect = (testId, questPageId) => {
	const encodedParams = encodeBase64(JSON.stringify({ testId, questPageId }));
	router.push({ name: 'testSelect', query: { p: encodedParams } });
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
