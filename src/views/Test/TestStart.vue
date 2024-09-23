<template>
	<div id="content" class="main">
		<div class="visual">
			<div class="text-wrap">
				<div class="headline">
					<p class="text01">
						<span class="dot"></span>
						<strong>{{ $t('find_yourself') }}</strong>
						{{ $t('test_name') }}
					</p>
					<p class="text02">{{ $t('test_name') }}</p>
					<p class="text03">{{ $t('life_plan') }}</p>
				</div>
				<p class="text04">
					{{ $t('description') }}
				</p>
			</div>
		</div>
		<div class="container">
			<div class="d-flex justify-content-between">
				<div class="tit" @click="getTestList">
					{{ $t('test_history') }}
					<span class="sub">{{ $t('ongoing_test_message') }}</span>
				</div>
				<div class="actions">
					<button
						class="btn btn-primary"
						@click="navigateToPayment"
						style="
							font-size: 1.8rem;
							padding: 0.8rem 1rem 0.8rem 1rem;
							margin: 10px 0 0 0;
						"
					>
						{{ $t('start_test_after_payment') }}
					</button>
				</div>
			</div>
			<table class="table table-bordered Tbl1">
				<thead>
					<tr>
						<th class="w80">{{ $t('number') }}</th>
						<th>{{ $t('test_item') }}</th>
						<th class="w150" :class="{ 'd-none': TestParm.orgId == '0' }">
							{{ $t('validity_date') }}
						</th>
						<th class="w150">{{ $t('start_date') }}</th>
						<th class="w150">{{ $t('completion_date') }}</th>
						<th class="w140">{{ $t('status') }}</th>
						<th class="w140">{{ $t('view_result') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="text-center"
						v-for="(item, idx) in TestList"
						:key="item.TurnId"
					>
						<td>{{ idx + 1 }}</td>
						<td>{{ item.ProdtNm }}</td>
						<td :class="{ 'd-none': TestParm.orgId == '0' }">
							{{ dayjs(item.ValidEndDt).format('YYYY-MM-DD') }}
						</td>
						<td>
							{{
								item.AnsPrgrsStartDt !== ''
									? dayjs(item.AnsPrgrsStartDt).format('YYYY-MM-DD')
									: '-'
							}}
						</td>
						<td>
							{{
								item.AnsPrgrsEndDt !== ''
									? dayjs(item.AnsPrgrsEndDt).format('YYYY-MM-DD')
									: '-'
							}}
						</td>
						<td class="text-center">
							<div v-if="item.TurnReqCnt - item.TurnUseCnt === 0">
								{{ $t('license_shortage') }}
							</div>
							<div v-else-if="item.RegDt === '' || item.AnsPrgrsDoneYn === 'N'">
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
									{{
										item.RegDt === ''
											? $t('start_test')
											: $t('test_in_progress')
									}}
								</button>
							</div>
							<div v-else-if="item.AnsPrgrsDoneYn === 'Y'">
								{{ $t('test_completed') }}
							</div>
						</td>
						<td>
							<div v-if="item.AnsPrgrsDoneYn === 'Y'">
								<button class="btn btn-primary" @click="popupTestRslt(item)">
									{{ $t('view_result') }}
								</button>
							</div>
							<div v-else>-</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="text-center mb-5">
				{{ $t('view_results_within_validity') }}
			</div>
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
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/components/app/LanguageSwitcher.vue';

const { t, locale } = useI18n();
// Props / Emit  ****************************

// Hook  ************************************

onMounted(() => {
	getTestList();
});

// Model / Data  ****************************

const { acuntId, orgId, turnConnCd, userId, persnNm } =
	storeToRefs(useAuthStore());
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
		const msg = turnId == '0' ? t('TestStart_1') : t('TestStart_2');
		if (!confirm(msg)) {
			return;
		}
	} else {
		alert(t('TestStart_3'));
	}
	TestParm.ansPrgrsId = ansPrgrsId;
	TestParm.turnId = turnId == null ? 0 : turnId;
	TestParm.payId = payId == null ? 0 : payId;

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

	if (windowRef != null && !windowRef.closed) {
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

const popupTestRslt = item => {
	var Parm = {
		ProdtId: item.ProdtId,
		AnsPrgrsId: item.AnsPrgrsId,
	};

	const parm = encodeBase64(JSON.stringify(Parm));
	let uri = `TestRsltMain?p=${parm}`;

	//localhost:5200/QuestMain?TestId=1&QuestPageId=2

	if (windowRef != null && !windowRef.closed) {
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
