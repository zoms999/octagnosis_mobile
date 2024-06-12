<template>
	<div class="test-form">
		<div class="d-flex justify-content-between">
			<div class="questPageNm">
				<span class="badge text-bg-secondary">{{ QuestPage.questPageNm }}</span>
			</div>
			<div v-if="TimerYn">
				<div class="tiemr d-flex justify-content-end">
					<span>{{ NowSec }} </span>
					<span> / </span>
					<span>{{ WaitSec }}</span>
					<span>(초)</span>
				</div>
			</div>
		</div>
		<div
			class="d-flex questBox"
			v-for="(item, idx) in QuestList"
			:key="item.questId"
		>
			<div class="numBox">
				<div class="num">{{ item.questNo }}</div>
			</div>
			<div class="flex-fill">
				<div class="quest1">
					<span v-html="item.questCont1"></span>
				</div>

				<!-- 이미지 -->
				<div class="imgs d-flex flex-wrap">
					<div
						class="imgBox"
						v-for="questImg in getQuestImgList(item.questId)"
						:key="questImg.imgId"
						:style="`width:${Math.round(100 / item.imgColCnt, 2) - 0.5}% !important`"
						:class="{ imgHide: questImg.showYn == false }"
					>
						<img :src="`/public/img/QuestImg/${questImg.imgNm}`" class="img" />
					</div>
				</div>

				<!-- 보기 -->
				<div class="itemsScreen" v-if="ScreenYn">
					보기는 타이머 종료후 나타납니다.
				</div>
				<div class="items d-flex justify-content-start" v-if="!ScreenYn">
					<div class="itemTit">한글 단어는 몇개였나 ?</div>
					<div
						class="itemBox"
						v-for="questItem in getQuestItemList1(item.questId)"
						:key="questItem.itemId"
					>
						<div
							class="item"
							:class="{ itemChecked: questItem.selected }"
							@click="setQuestVal1(item.questId, questItem.itemId)"
						>
							{{ questItem.conts }}
						</div>
					</div>
				</div>
				<div class="items d-flex justify-content-start" v-if="!ScreenYn">
					<div class="itemTit">영문 단어는 몇개였나 ?</div>
					<div
						class="itemBox"
						v-for="questItem in getQuestItemList2(item.questId)"
						:key="questItem.itemId"
					>
						<div
							class="item"
							:class="{ itemChecked: questItem.selected }"
							@click="setQuestVal2(item.questId, questItem.itemId)"
						>
							{{ questItem.conts }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

// Props / Emit  ****************************

var QuestPage = defineModel('QuestPage');
var QuestList = defineModel('QuestList');
var QuestItemList = defineModel('QuestItemList');
var QuestImgList = defineModel('QuestImgList');

// Hook  ************************************

onBeforeMount(() => {
	WaitSec.value = QuestList.value[0].waitSec;
	NowSec.value = WaitSec.value;

	if (WaitSec.value > 0) {
		TimerYn.value = true;
		ScreenYn.value = true;
		let timerId = setInterval(() => {
			--NowSec.value;
		}, 1000);
		setTimeout(() => {
			clearInterval(timerId);
			setTimeoutAction();
			ScreenYn.value = false;
		}, WaitSec.value * 1000);
	}
});

onMounted(() => {});

// Model / Data  ****************************

const TimerYn = ref(false);
const ScreenYn = ref(false);
const WaitSec = ref(0);
const NowSec = ref(0);

// Html ref  ********************************

// Axios / Route  ***************************

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const getQuestImgList = questId => {
	return QuestImgList.value.filter(o => o.questId == questId);
};

const getQuestItemList1 = questId => {
	return QuestItemList.value.filter(o => o.questId == questId && o.seq <= 10);
};
const getQuestItemList2 = questId => {
	return QuestItemList.value.filter(o => o.questId == questId && o.seq > 10);
};

const setQuestVal1 = (questId, itemId) => {
	const Quest = QuestList.value.find(o => o.questId == questId);
	Quest.val1 = itemId;
	const ItemList = QuestItemList.value.filter(
		o => o.questId == questId && o.seq <= 10,
	);

	ItemList.forEach(item => {
		item.selected = item.itemId == itemId ? true : false;
	});
};
const setQuestVal2 = (questId, itemId) => {
	const Quest = QuestList.value.find(o => o.questId == questId);
	Quest.val2 = itemId;
	const ItemList = QuestItemList.value.filter(
		o => o.questId == questId && o.seq > 10,
	);

	ItemList.forEach(item => {
		item.selected = item.itemId == itemId ? true : false;
	});
};

const setTimeoutAction = () => {
	switch (QuestList.value[0].questId) {
		case 25:
			// 첫번째 이미지 숨기기
			QuestImgList.value.forEach(item => {
				if (item.seq == 1) item.showYn = false;
			});
			break;
	}
};

// Etc  *************************************
</script>

<style scoped>
.questBox {
	margin: 0 0 30px 0;
}
.numBox {
	width: 60px;
}
.questPageNm {
	margin-bottom: 30px;
}
.questPageNm span {
	font-size: 1.3rem;
	padding: 10px;
}
.num {
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background-color: rgb(180, 180, 180);
	text-align: center;
	vertical-align: middle;
	color: #ffffff;
	padding-top: 8px;
	font-size: 1.3rem;
	margin: 0 10px 0 0;
}
.quest1 {
	font-size: 1.2rem;
}
.quest2 {
	font-size: 1.2rem;
	margin: 0px 0 20px 0;
}

.imgBox {
	margin: 20px auto 20px auto;
	text-align: center;
}
.img {
	margin: 20px;
}
.imgHide {
	display: none;
}

.itemsScreen {
	text-align: center;
	font-size: 2.2rem;
	color: rgb(250, 250, 250);
	background-color: rgb(170, 170, 170);
	border-radius: 20px;
	padding: 25px 20px 25px 20px;
}
.items {
	margin: 10px 0px 0 0px;
}
.items .itemBox {
	margin: 5px 10px 0 5px;
	text-align: center;
}
.items .itemBox .item {
	width: 100%;
	border-radius: 5px;
	background-color: #f0f3f5;
	padding: 10px 20px 10px 20px;
	text-align: center;
	font-size: 1.3rem;
	cursor: pointer;
	display: inline-block;
}
.itemTit {
	width: 220px;
	font-size: 1.3rem;
	margin: 13px 0 0 0;
}

.itemChecked {
	background-color: #3d7aed !important;
	color: #ffffff;
}

.tiemr {
	font-size: 1.4rem;
	background-color: rgb(100, 100, 100);
	padding: 5px 20px 5px 30px;
	border-radius: 5px;
	color: #ffffff;
}
.tiemr span:nth-child(1) {
	color: yellow;
}
.tiemr span:nth-child(2) {
	margin: 0 10px 0 10px;
}
.tiemr span:nth-child(3) {
}
.tiemr span:nth-child(4) {
	margin: 10px 0 0 5px;

	font-size: 0.9rem;
}
</style>
