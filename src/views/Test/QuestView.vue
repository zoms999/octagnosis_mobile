<template>
	<div class="mobile-test-interface">
		<header class="test-header">
			<div class="category">{{ $t('total_test') }}</div>
			<div class="test-progress" v-for="item in TestList" :key="item.testId">
				<div
					class="step"
					:class="{ 'current-step': item.testId == QuestPage.testId }"
				>
					{{ $t('step') }} {{ item.seq }}
				</div>
				<div class="step-title">{{ item.testNm }}</div>
				<div v-if="item.testId == QuestPage.testId" class="question-progress">
					<span class="current">{{ QuestPage.questPageSeq }}</span>
					<span class="total">/ {{ item.questPageCnt }}</span>
				</div>
			</div>
		</header>

		<main class="question-area">
			<component
				:is="currentQuestionComponent"
				v-model:QuestPage="QuestPage"
				v-model:QuestList="QuestList"
				v-model:QuestItemList="QuestItemList"
				v-model:QuestImgList="QuestImgList"
			></component>
		</main>

		<footer class="test-footer">
			<button
				class="btn-next"
				@click="saveAns"
				:disabled="Procs.saveAns.loading"
			>
				<template v-if="Procs.saveAns.loading">
					<span class="loader"></span>
				</template>
				<template v-else>
					{{ $t('next') }}
					<span class="material-icons">arrow_forward</span>
				</template>
			</button>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBase64Utils } from '@/plugins/base64.js';
import { useI18n } from 'vue-i18n';

import MultiQuestItemA from '@/components/Test/QuestPage/MultiQuestItemA.vue';
import OneQuestItemA from '@/components/Test/QuestPage/OneQuestItemA.vue';
import OneQuestItemB from '@/components/Test/QuestPage/OneQuestItemB.vue';
import OneQuestImgA from '@/components/Test/QuestPage/OneQuestImgA.vue';
import OneQuestImgB from '@/components/Test/QuestPage/OneQuestImgB.vue';
import OneQuestImgC from '@/components/Test/QuestPage/OneQuestImgC.vue';
import OneQuestImgTimeA from '@/components/Test/QuestPage/OneQuestImgTimeA.vue';
import FreeTypeTime1 from '@/components/Test/QuestPage/FreeType/Time1.vue';
import FreeTypeTime2 from '@/components/Test/QuestPage/FreeType/Time2.vue';

const { t } = useI18n();
const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const { encodeBase64, decodeBase64 } = useBase64Utils();
const { acuntId, orgId, turnConnCd, userId } = storeToRefs(useAuthStore());

const TestList = ref([]);
const QuestPage = ref({});
const QuestList = ref([]);
const QuestItemList = ref([]);
const QuestImgList = ref([]);

const TestParm = ref({
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,
	insId: userId.value,
	uptId: userId.value,
	ansPrgrsId: '0',
	prodtId: '0',
	testId: '0',
	questPageId: '0',
	questList: null,
});

const Procs = ref({
	getQuestPageForTest: {
		path: '/api/Test/getQuestPageForTest',
		loading: false,
	},
	getNextTest: { path: '/api/Test/getNextTest', loading: false },
	saveAns: { path: '/api/Test/saveAns', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getQuestPageForTest.path:
					Procs.value.getQuestPageForTest.loading = false;
					TestList.value = data.value.TestList;
					QuestPage.value = data.value.QuestPage;
					QuestList.value = data.value.QuestList.map(quest => ({
						...quest,
						val1: 0,
						val2: 0,
					}));
					QuestItemList.value = data.value.QuestItemList.map(item => ({
						...item,
						selected: false,
					}));
					QuestImgList.value = data.value.QuestImgList.map(item => ({
						...item,
						showYn: true,
					}));
					break;
				case Procs.value.saveAns.path:
					Procs.value.saveAns.loading = false;
					vSuccess(t('saved'));
					TestParm.value = {
						...TestParm.value,
						testId: data.value.testId,
						questPageId: data.value.questPageId,
						questList: '',
					};
					const parm = encodeBase64(JSON.stringify(TestParm.value));
					if (TestParm.value.questPageId == '0') {
						router.push(`questMain?p=${parm}`);
					} else {
						location.href = `quest?p=${parm}`;
					}
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			Object.keys(Procs.value).forEach(
				key => (Procs.value[key].loading = false),
			);
		},
	},
);

const currentQuestionComponent = computed(() => {
	const componentMap = {
		C00402: MultiQuestItemA,
		C00401: OneQuestItemA,
		C00407: OneQuestItemB,
		C00403: OneQuestImgA,
		C00404: OneQuestImgB,
		C00408: OneQuestImgC,
		C00405: OneQuestImgTimeA,
		C00406: FreeTypeTime1,
		C00409: FreeTypeTime2,
	};
	return componentMap[QuestPage.value.questPageType] || null;
});

const getQuestPageForTest = () => {
	const Parm = {
		testId: TestParm.value.testId,
		questPageId: TestParm.value.questPageId,
		prodtId: TestParm.value.prodtId,
	};
	execUrl(Procs.value.getQuestPageForTest.path, Parm);
};

const saveAns = () => {
	const notAnsweredQuest = QuestList.value.find(
		quest =>
			(quest.questId == 25 && (quest.val1 == 0 || quest.val2 == 0)) ||
			(quest.questId != 25 && quest.val1 == 0),
	);

	if (notAnsweredQuest) {
		vAlert(t('select_menu') + ' : ' + notAnsweredQuest.questNo);
		return;
	}

	if (TestParm.value.ansPrgrsId == 0 || TestParm.value.ansPrgrsId == '') {
		vAlert(
			'검사 정보가 누락되었습니다. 검사창을 닫고 검사를 다시 진행해 주십시요.',
		);
	} else {
		Procs.value.saveAns.loading = true;
		TestParm.value.questList = QuestList.value;
		execUrl(Procs.value.saveAns.path, TestParm.value);
	}
};

onMounted(() => {
	const P = JSON.parse(decodeBase64(route.query.p));
	TestParm.value = { ...TestParm.value, ...P };
	getQuestPageForTest();
});
</script>

<style lang="scss" scoped>
.mobile-test-interface {
	font-family: 'Noto Sans KR', sans-serif;
	background-color: #f5f5f5;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.test-header {
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 1rem;

	.category {
		background-color: #1db1ad;
		color: #ffffff;
		font-size: 1rem;
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.test-progress {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 0.5rem;

		.step {
			border: 1px solid #ffffff;
			border-radius: 12px;
			font-size: 0.8rem;
			padding: 0.2rem 0.4rem;
			margin-right: 0.5rem;
			margin-bottom: 0.3rem;

			&.current-step {
				background-color: #28a745;
			}
		}

		.step-title {
			font-size: 0.9rem;
			font-weight: 600;
			margin-right: 0.5rem;
		}

		.question-progress {
			font-size: 0.9rem;

			.current {
				color: #ffd62c;
				font-weight: bold;
			}
		}
	}
}

.question-area {
	flex-grow: 1;
	padding: 1rem;
	background-color: #ffffff;
	overflow-y: auto;
}

.test-footer {
	padding: 1rem;
	background-color: #ffffff;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

	.btn-next {
		width: 100%;
		background-color: #0d4f8a;
		color: #ffffff;
		border: none;
		border-radius: 25px;
		padding: 0.8rem;
		font-size: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:disabled {
			background-color: #cccccc;
			cursor: not-allowed;
		}

		.material-icons {
			margin-left: 0.5rem;
			font-size: 1.2rem;
		}

		.loader {
			width: 20px;
			height: 20px;
			border: 2px solid #ffffff;
			border-top: 2px solid transparent;
			border-radius: 50%;
			animation: spin 1s linear infinite;
		}
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@media (max-width: 480px) {
	.test-header {
		.category {
			font-size: 0.9rem;
		}

		.test-progress {
			.step {
				font-size: 0.7rem;
			}

			.step-title {
				font-size: 0.8rem;
			}

			.question-progress {
				font-size: 0.8rem;
			}
		}
	}

	.test-footer {
		.btn-next {
			font-size: 0.9rem;
		}
	}
}
</style>
