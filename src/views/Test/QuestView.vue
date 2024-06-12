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

	<div class="quest">
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
			<span class="fs130">다 음</span> &nbsp;
			<span
				class="material-icons"
				style="border: none; font-size: 1.3rem; margin-top: 8px"
			>
				forward
			</span>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

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

var Emits = defineEmits(['update:modelValue', 'getQuestList']);

var ModalParm = defineModel('ModalParm');

// Hook	 *************************************

onBeforeMount(() => {
	getQuestPageForTest();
});

onMounted(() => {});

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const TestList = ref([]);
const QuestPage = ref({});
const QuestList = ref([]);
const QuestItemList = ref([]);
const QuestImgList = ref([]);

// Html ref  ********************************

// Axios / Route	***************************

const Procs = ref({
	getQuestPageForTest: {
		path: '/api/Test/getQuestPageForTest',
		loading: false,
	},
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
		testId: ModalParm.value.testId,
		questPageId: ModalParm.value.questPageId,
	};

	execUrl(Procs.value.getQuestPageForTest.path, Parm);
};

const saveAns = () => {
	var NotChkYn = false;
	for (var i = 0; i < QuestList.value.length; i++) {
		if (QuestList.value[i].questId == 25) {
			// 25번 문항은 선택값이 2개
			if (QuestList.value[i].val1 == 0 || QuestList.value[i].val2 == 0) {
				alert(QuestList.value[i].questNo + '번 문항을 선택하세요.');
				NotChkYn = true;
				break;
			}
		} else {
			if (QuestList.value[i].val1 == 0) {
				alert(QuestList.value[i].questNo + '번 문항을 선택하세요.');
				NotChkYn = true;
				break;
			}
		}
	}
	if (NotChkYn) {
		return;
	} else {
		alert('저장되었습니다.');
	}
};

// Etc	*************************************
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
	font-size: 1.8rem;
	padding: 10px 60px 10px 60px;
	border-radius: 10px;
}

.step {
	border: 1px solid #ffffff;
	border-radius: 30px;
	font-size: 1.4rem;
	font-weight: 500;
	margin: 30px 0 0 50px;
	padding: 5px 30px 0px 30px;
	height: 50px;
}
.curStep {
	background-color: green;
}

.stepTit {
	border: 0;
	border-radius: 20px;
	font-size: 1.7rem;
	font-weight: 600;
	margin: 22px 0 0 0px;
	padding: 10px 30px 0px 20px;
}
.timer {
	margin: 35px 10px 0 0;
}
.timer img {
	width: 40px;
}
.questNum {
	margin: 30px 0 0 0;
	font-size: 1.7rem;
}
.questNum strong {
	color: #ffd62c;
}
</style>
