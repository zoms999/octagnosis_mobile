<template>
	<div class="examine-head">
		<div class="d-flex justify-content-start">
			<div class="category">종합검사</div>
			<div
				class="d-flex justify-content-start"
				v-for="item in TestList"
				:key="item.testId"
			>
				<div class="step" :class="{ curStep: item.testId == QuestPage.testId }">
					{{ item.seq }}단계
				</div>
				<div class="stepTit">{{ item.testNm }}</div>
				<div class="timer" v-if="item.testId == QuestPage.testId">
					<img src="@/assets/img/icon/ic_timer.png" />
				</div>
				<div class="questNum" v-if="item.testId == QuestPage.testId">
					<strong>{{ QuestPage.questPageSeq }}</strong
					>/ {{ item.questPageCnt }}
				</div>
			</div>
		</div>
	</div>

	<div class="quest" style="background-color: #ffffff !important">
		<MultiQuestItemA
			v-if="QuestPage.questPageType == 'C00402'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></MultiQuestItemA>
		<OneQuestItemA
			v-if="QuestPage.questPageType == 'C00401'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestItemA>
		<OneQuestItemB
			v-if="QuestPage.questPageType == 'C00407'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestItemB>
		<OneQuestImgA
			v-if="QuestPage.questPageType == 'C00403'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestImgA>
		<OneQuestImgB
			v-if="QuestPage.questPageType == 'C00404'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestImgB>
		<OneQuestImgC
			v-if="QuestPage.questPageType == 'C00408'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestImgC>
		<OneQuestImgTimeA
			v-if="QuestPage.questPageType == 'C00405'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></OneQuestImgTimeA>

		<FreeTypeTime1
			v-if="QuestPage.questPageType == 'C00406'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></FreeTypeTime1>
		<FreeTypeTime2
			v-if="QuestPage.questPageType == 'C00409'"
			v-model:QuestPage="QuestPage"
			v-model:QuestList="QuestList"
			v-model:QuestItemList="QuestItemList"
			v-model:QuestImgList="QuestImgList"
		></FreeTypeTime2>
	</div>
	<div class="bottom d-flex justify-content-center">
		<div class="btnNext d-flex" @click="saveAns">
			<template v-if="Procs.saveAns.loading">
				<div
					class="spinner-border"
					style="width: 2.5rem; height: 2.5rem; margin-top: 5px"
					role="status"
				>
					<span class="visually-hidden">Loading...</span>
				</div>
			</template>
			<template v-else>
				<span class="fs190">다 음</span>&nbsp;
				<span
					class="material-icons"
					style="border: none; font-size: 1.8rem; margin-top: 8px"
				>
					forward
				</span>
			</template>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBase64Utils } from '@/plugins/base64.js';

import MultiQuestItemA from '@/components/Test/QuestPage/MultiQuestItemA.vue';
import OneQuestItemA from '@/components/Test/QuestPage/OneQuestItemA.vue';
import OneQuestItemB from '@/components/Test/QuestPage/OneQuestItemB.vue';
import OneQuestImgA from '@/components/Test/QuestPage/OneQuestImgA.vue';
import OneQuestImgB from '@/components/Test/QuestPage/OneQuestImgB.vue';
import OneQuestImgC from '@/components/Test/QuestPage/OneQuestImgC.vue';
import OneQuestImgTimeA from '@/components/Test/QuestPage/OneQuestImgTimeA.vue';

import FreeTypeTime1 from '@/components/Test/QuestPage/FreeType/Time1.vue';
import FreeTypeTime2 from '@/components/Test/QuestPage/FreeType/Time2.vue';

// Props / Emit  ****************************

var ModalParm = defineModel('ModalParm');

// Hook	 *************************************

onBeforeMount(() => {
	window.removeEventListener('keydown', preventRefresh);

	const P = JSON.parse(decodeBase64(route.query.p));

	TestParm.ansPrgrsId = P.ansPrgrsId;
	TestParm.prodtId = P.prodtId;
	TestParm.testId = P.testId;
	TestParm.questPageId = P.questPageId;
	TestParm.turnId = P.turnId;
	TestParm.payId = P.payId;

	getQuestPageForTest();
});

onMounted(() => {
	window.addEventListener('keydown', preventRefresh);
});

// Model / Data *****************************

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

const TestParm = {
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
};

// Html ref  ********************************

// Axios / Route	***************************

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
					QuestList.value = data.value.QuestList;
					QuestItemList.value = data.value.QuestItemList;
					QuestImgList.value = data.value.QuestImgList;

					// Quest 에 답변값 "val" 추가
					QuestList.value.forEach(quest => {
						quest.val1 = 0;
						quest.val2 = 0;
					});
					// QuestItem 에 선택값 "selected" 추가
					QuestItemList.value.forEach(item => {
						item.selected = false;
					});
					// QuestItem 에 선택값 "selected" 추가
					QuestImgList.value.forEach(item => {
						item.showYn = true;
					});

					break;
				case Procs.value.saveAns.path:
					Procs.value.saveAns.loading = false;
					vSuccess('저장되었습니다.');
					TestParm.testId = data.value.testId;
					TestParm.questPageId = data.value.questPageId;

					TestParm.questList = ''; // Json 객체내의 객체를 없애줌. 안 없애면 encodeBase64 안됨.

					if (TestParm.questPageId == '0') {
						const parm = encodeBase64(JSON.stringify(TestParm));
						router.push(`questMain?p=${parm}`);
					} else {
						const parm = encodeBase64(JSON.stringify(TestParm));
						location.href = `quest?p=${parm}`;
						/*
						router.replace({
							path: 'quest',
							query: { p: parm, t: Date.now() },
						});
						*/
					}

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

// Modal ************************************

// Watch ************************************

// Method	***********************************

const getQuestPageForTest = () => {
	const Parm = {
		testId: TestParm.testId,
		questPageId: TestParm.questPageId,
		prodtId: TestParm.prodtId,
	};

	execUrl(Procs.value.getQuestPageForTest.path, Parm);
};

const saveAns = () => {
	var NotChkYn = false;
	for (var i = 0; i < QuestList.value.length; i++) {
		if (QuestList.value[i].questId == 25) {
			// 25번 문항은 선택값이 2개
			if (QuestList.value[i].val1 == 0 || QuestList.value[i].val2 == 0) {
				alert(QuestList.value[i].questNo + '번 문항이 선택되지 않았습니다.');
				NotChkYn = true;
				break;
			}
		} else {
			if (QuestList.value[i].val1 == 0) {
				alert(QuestList.value[i].questNo + '번 문항이 선택되지 않았습니다.');
				NotChkYn = true;
				break;
			}
		}
	}
	if (NotChkYn) {
		return;
	} else {
		if (TestParm.ansPrgrsId == 0 || TestParm.ansPrgrsId == '') {
			alert(
				'검사 정보가 누락되었습니다. 검사창을 닫고 검사를 다시 진행해 주십시요.',
			);
		} else {
			Procs.value.saveAns.loading = true;

			TestParm.questList = QuestList.value;
			execUrl(Procs.value.saveAns.path, TestParm);
		}
	}
};

// Etc	*************************************

const preventRefresh = event => {
	// F5 키 코드 (116)
	if (event.keyCode === 116) {
		event.preventDefault();
		vAlert('검사중에는 화면을 새로고침 할 수 없습니다.');
	}

	// Ctrl+R 키 조합 (Ctrl: 17, R: 82)
	if (event.ctrlKey && event.keyCode === 82) {
		event.preventDefault();
		vAlert('검사중에는 화면을 새로고침 할 수 없습니다.');
	}

	// Ctrl+Shift+R 키 조합 (Ctrl: 17, Shift: 16, R: 82)
	if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
		event.preventDefault();
		vAlert('검사중에는 화면을 새로고침 할 수 없습니다.');
	}
};
</script>

<style scoped>
.logo {
	width: 200px;
}
.quest {
	width: 1300px;
	padding: 20px 30px 20px 30px;
	margin: auto;
}
.bottom {
	padding: 10px 20px 20px 20px;
	text-align: right;
	font-size: 1.5rem;
	cursor: pointer;
}
.time1 {
	background-color: rgb(100, 100, 100);
	font-size: 2rem;
	color: white;
	border-radius: 10px;
	height: 80px;
	padding: 10px;
}
.progress {
	background-color: silver;
	height: 38px;
}
.bar {
	width: 40px;
	height: 38px;
}
.btnNext {
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 12px 50px 10px 60px;
	height: 60px;
	border-radius: 30px;
	flex: unset;
}

.examine-head {
	background-color: #0d4f8a;
	color: #ffffff;
	height: 100px;
	padding: 0;
}

.category {
	background-color: #1db1ad;
	color: #ffffff;
	margin: 20px 0 0 20px;
	font-size: 2.3rem;
	padding: 10px 60px 10px 60px;
	border-radius: 10px;
}

.step {
	border: 1px solid #ffffff;
	border-radius: 30px;
	font-size: 2rem;
	font-weight: 500;
	margin: 23px 0 0 50px;
	padding: 8px 30px 0px 30px;
	height: 50px;
}
.curStep {
	background-color: green;
}

.stepTit {
	border: 0;
	border-radius: 20px;
	font-size: 2.4rem;
	font-weight: 600;
	margin: 16px 0 0 0px;
	padding: 13px 30px 0px 20px;
}
.timer {
	margin: 27px 10px 0 0;
}
.timer img {
	width: 40px;
}
.questNum {
	margin: 27px 0 0 0;
	font-size: 2.4rem;
}
.questNum strong {
	color: #ffd62c;
}
</style>
