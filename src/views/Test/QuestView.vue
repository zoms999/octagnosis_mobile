<template>
	<div class="mobile-test-app">
		<header class="test-header">
			<h1 class="test-title">{{ $t('total_test') }}</h1>
			<div class="test-progress" v-for="item in TestList" :key="item.testId">
				<div
					class="step"
					:class="{ 'current-step': item.testId == QuestPage.testId }"
				>
					{{ $t('step') }} {{ item.seq }}
				</div>
				<div class="step-title">{{ item.testNm }}</div>
				<div v-if="item.testId == QuestPage.testId" class="question-progress">
					<span class="material-icons">timer</span>
					<span class="question-count"
						><strong>{{ QuestPage.questPageSeq }}</strong> /
						{{ item.questPageCnt }}</span
					>
				</div>
			</div>
		</header>

		<main class="question-container">
			<component
				:is="getQuestionComponent"
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
					<span class="spinner"></span>
				</template>
				<template v-else>
					<span>{{ $t('next') }}</span>
					<span class="material-icons">arrow_forward</span>
				</template>
			</button>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBase64Utils } from '@/plugins/base64.js';
import { useI18n } from 'vue-i18n';

// Import question components
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
const { acuntId, orgId, turnConnCd, userId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const { encodeBase64, decodeBase64 } = useBase64Utils();

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
					QuestList.value = data.value.QuestList;
					QuestItemList.value = data.value.QuestItemList;
					QuestImgList.value = data.value.QuestImgList;

					QuestList.value.forEach(quest => {
						quest.val1 = 0;
						quest.val2 = 0;
					});
					QuestItemList.value.forEach(item => {
						item.selected = false;
					});
					QuestImgList.value.forEach(item => {
						item.showYn = true;
					});
					break;
				case Procs.value.saveAns.path:
					Procs.value.saveAns.loading = false;
					vSuccess(t('saved'));
					TestParm.value.testId = data.value.testId;
					TestParm.value.questPageId = data.value.questPageId;
					TestParm.value.questList = '';

					if (TestParm.value.questPageId == '0') {
						const parm = encodeBase64(JSON.stringify(TestParm.value));
						router.push(`questMain?p=${parm}`);
					} else {
						const parm = encodeBase64(JSON.stringify(TestParm.value));
						router.replace({
							path: 'quest',
							query: { p: parm, t: Date.now() },
						});
					}
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			for (const key in Procs.value) {
				Procs.value[key].loading = false;
			}
		},
	},
);

const getQuestionComponent = computed(() => {
	switch (QuestPage.value.questPageType) {
		case 'C00402':
			return MultiQuestItemA;
		case 'C00401':
			return OneQuestItemA;
		case 'C00407':
			return OneQuestItemB;
		case 'C00403':
			return OneQuestImgA;
		case 'C00404':
			return OneQuestImgB;
		case 'C00408':
			return OneQuestImgC;
		case 'C00405':
			return OneQuestImgTimeA;
		case 'C00406':
			return FreeTypeTime1;
		case 'C00409':
			return FreeTypeTime2;
		default:
			return null;
	}
});

const getQuestPageForTest = () => {
	const Parm = {
		testId: TestParm.value.testId,
		questPageId: TestParm.value.questPageId,
		prodtId: TestParm.value.prodtId,
	};
	execUrl(Procs.value.getQuestPageForTest.path, Parm);
};

const saveAns = async () => {
	if (
		QuestList.value.some(
			quest => quest.val1 === 0 || (quest.questId === 25 && quest.val2 === 0),
		)
	) {
		vAlert(t('select_menu'));
		return;
	}

	if (!TestParm.value.ansPrgrsId || TestParm.value.ansPrgrsId === '0') {
		vAlert(t('test_info_missing'));
		return;
	}

	try {
		Procs.value.saveAns.loading = true;
		TestParm.value.questList = QuestList.value;
		await execUrl(Procs.value.saveAns.path, TestParm.value);

		const parm = encodeBase64(JSON.stringify(TestParm.value));
		if (TestParm.value.questPageId === '0') {
			window.location.href = `questMain?p=${parm}`;
		} else {
			window.location.href = `quest?p=${parm}&t=${Date.now()}`;
		}
	} catch (error) {
		console.error('Error saving answer:', error);
		Procs.value.saveAns.loading = false;
		vAlert('저장 중 오류가 발생했습니다.');
	}
};

// Lifecycle hooks
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
	const P = JSON.parse(decodeBase64(route.query.p));
	Object.assign(TestParm.value, P);
	getQuestPageForTest();
});
</script>

<style scoped>
.mobile-test-app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #f5f5f5;
}

.test-header {
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 1rem;
}

.test-title {
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
}

.test-progress {
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
}

.step {
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	padding: 0.25rem 0.5rem;
	font-size: 0.875rem;
	margin-right: 0.5rem;
}

.current-step {
	background-color: #1db1ad;
}

.step-title {
	font-size: 1rem;
	font-weight: 600;
	flex-grow: 1;
}

.question-progress {
	display: flex;
	align-items: center;
}

.question-count {
	margin-left: 0.25rem;
}

.question-container {
	flex-grow: 1;
	padding: 1rem;
	background-color: #ffffff;
}

.test-footer {
	padding: 1rem;
	background-color: #ffffff;
}

.btn-next {
	width: 100%;
	background-color: #0d4f8a;
	color: #ffffff;
	border: none;
	border-radius: 2rem;
	padding: 0.75rem;
	font-size: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.btn-next:disabled {
	opacity: 0.7;
}

.spinner {
	width: 1.5rem;
	height: 1.5rem;
	border: 2px solid #ffffff;
	border-top: 2px solid transparent;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
