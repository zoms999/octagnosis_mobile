<template>
	<div class="mobile-test-management">
		<div class="visual">
			<div class="text-wrap">
				<h1 class="headline">
					<span class="dot"></span>
					<strong>{{ $t('find_yourself') }}</strong>
					{{ $t('test_name') }}
				</h1>
				<p class="subtitle">{{ $t('life_plan') }}</p>
				<p class="description">
					{{ $t('description') }}
				</p>
			</div>
		</div>

		<div class="container">
			<h2 class="test-title" @click="getTestList">
				{{ $t('test_history') }}
				<span class="sub-text">{{ $t('ongoing_test_message') }}</span>
			</h2>

			<button
				v-if="showPaymentButton"
				class="payment-button"
				@click="navigateToPayment"
			>
				{{ $t('start_test_after_payment') }}
			</button>

			<div class="test-list">
				<div
					v-for="(item, idx) in testList"
					:key="item.TurnId"
					class="test-item"
				>
					<h3 class="test-name">{{ item.ProdtNm }}</h3>
					<div class="test-details">
						<p>
							<strong>{{ $t('number') }}:</strong> {{ idx + 1 }}
						</p>
						<p v-if="testParm.orgId !== '0'">
							<strong>{{ $t('validity_date') }}:</strong>
							{{ formatDate(item.ValidEndDt) }}
						</p>
						<p>
							<strong>{{ $t('start_date') }}:</strong>
							{{ formatDate(item.AnsPrgrsStartDt) }}
						</p>
						<p>
							<strong>{{ $t('completion_date') }}:</strong>
							{{ formatDate(item.AnsPrgrsEndDt) }}
						</p>
						<p>
							<strong>{{ $t('status') }}:</strong>
							<span v-if="item.TurnReqCnt - item.TurnUseCnt === 0">{{
								$t('license_shortage')
							}}</span>
							<button
								v-else-if="item.RegDt === '' || item.AnsPrgrsDoneYn === 'N'"
								class="start-button"
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
									item.RegDt === '' ? $t('start_test') : $t('test_in_progress')
								}}
							</button>
							<span v-else-if="item.AnsPrgrsDoneYn === 'Y'">{{
								$t('test_completed')
							}}</span>
						</p>
					</div>
					<button
						v-if="item.AnsPrgrsDoneYn === 'Y'"
						class="result-button"
						@click="popupTestRslt(item)"
					>
						{{ $t('view_result') }}
					</button>
				</div>
			</div>

			<p class="notice-text">
				{{ $t('view_results_within_validity') }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, inject, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBase64Utils } from '@/plugins/base64.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const dayjs = inject('dayjs');
const { encodeBase64 } = useBase64Utils();
const { vAlert } = useAlert();

const { acuntId, orgId, turnConnCd, userId } = storeToRefs(useAuthStore());

const testList = ref([]);

const testParm = reactive({
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
});

const windowRef = ref(null);

const procs = reactive({
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
				case procs.getTestList.path:
					procs.getTestList.loading = false;
					testList.value = data.value.TestList;
					break;
				case procs.getNextTest.path:
					procs.getNextTest.loading = false;
					testParm.ansPrgrsId = data.value.ansPrgrsId;
					testParm.testId = data.value.testId;
					testParm.questPageId = data.value.questPageId;
					popupPage();
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			Object.keys(procs).forEach(key => {
				procs[key].loading = false;
			});
		},
	},
);

onMounted(() => {
	getTestList();
});

const formatDate = computed(() => date => {
	return date ? dayjs(date).format('YYYY-MM-DD') : '-';
});

const navigateToPayment = () => {
	router.push('/testPayment');
};

const getTestList = () => {
	console.log('getTestList 호출됨, testParm:', testParm);
	execUrl(procs.getTestList.path, testParm);
};

const getNextTest = (
	ansPrgrsId,
	turnId,
	payId,
	prodtId,
	testId,
	questPageId,
) => {
	console.log('getNextTest 파라미터:', {
		ansPrgrsId,
		turnId,
		payId,
		prodtId,
		testId,
		questPageId,
	});

	if (ansPrgrsId === '0') {
		const msg = turnId === '0' ? t('TestStart_1') : t('TestStart_2');
		if (!confirm(msg)) {
			return;
		}
	} else {
		alert(t('TestStart_3'));
	}

	Object.assign(testParm, {
		ansPrgrsId,
		turnId: turnId == null ? 0 : turnId,
		payId: payId == null ? 0 : payId,
		prodtId,
		testId,
		questPageId,
	});

	console.log('업데이트된 testParm:', testParm);
	execUrl(procs.getNextTest.path, testParm);
};

const popupPage = () => {
	console.log('popupPage 함수 호출됨');
	console.log('questPageId:', testParm.questPageId);
	const nm = Number(testParm.questPageId) === 0 ? 'questMain' : 'quest';
	const parm = encodeBase64(JSON.stringify(testParm));
	const uri = `${nm}?p=${parm}`;

	if (windowRef.value && !windowRef.value.closed) {
		console.log('기존 창이 열려 있으므로, 창을 포커스합니다.');
		windowRef.value.focus();
		return;
	}

	windowRef.value = window.open(uri, '_blank');

	if (windowRef.value && !windowRef.value.closed) {
		windowRef.value.focus();
	}
};

const popupTestRslt = item => {
	const parm = encodeBase64(
		JSON.stringify({
			ProdtId: item.ProdtId,
			AnsPrgrsId: item.AnsPrgrsId,
		}),
	);
	const uri = `TestRsltMain?p=${parm}`;

	if (windowRef.value && !windowRef.value.closed) {
		windowRef.value.focus();
		return;
	}

	windowRef.value = window.open(uri, '_blank');

	if (windowRef.value && !windowRef.value.closed) {
		windowRef.value.focus();
	}
};

const showPaymentButton = computed(() => {
	console.log('orgId type:', typeof testParm.orgId, 'value:', testParm.orgId);
	return !testParm.orgId || testParm.orgId === 0 || testParm.orgId === '0';
});
</script>

<style lang="scss" scoped>
.mobile-test-management {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
		Arial, sans-serif;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.visual {
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	padding: 2rem 1rem;
	color: white;
	text-align: center;
}

.headline {
	font-size: 1.8rem;
	font-weight: 700;
	margin-bottom: 0.5rem;

	.dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		background-color: white;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
}

.subtitle {
	font-size: 1.4rem;
	margin-bottom: 1rem;
}

.description {
	font-size: 1rem;
	line-height: 1.5;
}

.container {
	padding: 1rem;
}

.test-title {
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 1rem;

	.sub-text {
		display: block;
		font-size: 1rem;
		color: #666;
		font-weight: normal;
		margin-top: 0.25rem;
	}
}

.payment-button {
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	color: white;
	border: none;
	border-radius: 8px;
	padding: 0.75rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	width: 100%;
	margin-bottom: 1rem;
}

.test-list {
	.test-item {
		background: white;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.test-name {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.test-details {
		font-size: 0.9rem;
		color: #333;

		p {
			margin-bottom: 0.25rem;
		}
	}
}

.start-button,
.result-button {
	background: #3d7aed;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 0.5rem 1rem;
	font-size: 0.9rem;
	margin-top: 0.5rem;
	width: 100%;
}

.result-button {
	background: #1db1ad;
}

.notice-text {
	text-align: center;
	color: #666;
	margin-top: 1rem;
	font-size: 0.9rem;
}
</style>
