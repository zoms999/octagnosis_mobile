<template>
	<div class="test-form">
		<div class="d-flex justify-content-between">
			<div class="questPageNm">
				<span class="badge text-bg-secondary">{{ QuestPage.questPageNm }}</span>
				<span style="color: white">Time2</span>
			</div>
			<div v-if="TimerYn">
				<div class="tiemr d-flex justify-content-end">
					<span>{{ NowSec }} </span>
					<span> / </span>
					<span>{{ WaitSec }}</span>
					<span>({{ $t('second') }})</span>
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

				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 70"
				>
					<div class="row" style="font-size: 1.8rem">
						<div class="col-4" style="font-size: 1.8rem">
							<span :class="{ hide1: timeEndYn }" v-html="$t('Time2_1')"></span>
						</div>
						<div class="col-4">
							<span :class="{ hide1: timeEndYn }" v-html="$t('Time2_2')"></span>
						</div>
						<div class="col-4">
							<div
								style="
									background-color: #e87373;
									padding: 10px;
									color: #ffffff;
									border-radius: 10px;
									font-size: 1.8rem;
								"
								v-html="$t('Time2_3')"
							></div>
							<br />
							<div
								style="
									background-color: #6eb0e0;
									padding: 10px;
									color: #ffffff;
									line-height: 2.2rem;
									border-radius: 10px;
									font-size: 1.8rem;
								"
								:class="{ hide1: timeEndYn == false }"
								v-html="$t('Time2_4')"
							></div>
						</div>
					</div>
				</div>
				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 71"
				>
					<div class="row">
						<div
							class="col-7"
							style="font-size: 1.8rem"
							v-html="$t('Time2_5')"
						></div>
						<div class="col-5">
							<div
								style="
									background-color: #e87373;
									padding: 10px;
									color: #ffffff;
									border-radius: 10px;
									font-size: 1.8rem;
								"
								v-html="$t('Time2_6')"
							></div>
							<br />
							<div
								style="
									background-color: #6eb0e0;
									padding: 10px;
									color: #ffffff;
									line-height: 2.2rem;
									border-radius: 10px;
									font-size: 1.8rem;
								"
								:class="{ hide1: timeEndYn == false }"
								v-html="$t('Time2_7')"
							></div>
						</div>
					</div>
				</div>

				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 96"
				>
					<div style="margin: 10px; padding: 20px">
						<div class="container-fluid">
							<div class="row">
								<div class="col-8">
									<div
										v-if="timeEndYn == false"
										style="font-size: 1.8rem"
										v-html="$t('Time2_8')"
									></div>
								</div>
								<div class="col-4">
									<img
										:src="`${imageSrc}/QuestImg/QuestImg_96_1067.jpg`"
										style="width: 300px"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 99"
				>
					<div class="container-fluid">
						<div class="row">
							<div class="col12">
								<div
									v-if="timeEndYn == false"
									style="font-size: 1.8rem"
									v-html="$t('Time2_9')"
								></div>
							</div>
						</div>
					</div>
				</div>

				<div class="quest2">
					<span v-html="item.questCont2"></span>
				</div>

				<!-- 보기 -->
				<div class="itemsScreen" v-if="ScreenYn">
					{{ $t('timer_explain') }}
				</div>
				<div class="items d-flex flex-wrap" v-if="!ScreenYn">
					<div
						class="itemBox"
						v-for="questItem in getQuestItemList(item.questId)"
						:key="questItem.itemId"
						:style="`width:${Math.round(100 / item.itemColCnt, 2) - 0.5}% !important`"
					>
						<div
							class="item"
							:class="{ itemChecked: questItem.selected }"
							@click="setQuestVal(item.questId, questItem.itemId)"
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
import { computed } from 'vue';
// Props / Emit  ****************************

var QuestPage = defineModel('QuestPage');
var QuestList = defineModel('QuestList');
var QuestItemList = defineModel('QuestItemList');
var QuestImgList = defineModel('QuestImgList');

var Quest = QuestList.value[0];

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

const timeEndYn = ref(false);

// Html ref  ********************************

// Axios / Route  ***************************

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************
const imageSrc = computed(() => {
	const basePath = import.meta.env.VITE_IMG_BASE_PATH;
	return `${basePath}`;
});

const getQuestItemList = questId => {
	return QuestItemList.value.filter(o => o.questId == questId);
};

const setQuestVal = (questId, itemId) => {
	const Quest = QuestList.value.find(o => o.questId == questId);
	Quest.val1 = itemId;
	const ItemList = QuestItemList.value.filter(
		o => o.questId == questId && o.seq <= 10,
	);

	ItemList.forEach(item => {
		item.selected = item.itemId == itemId ? true : false;
	});
};

const setTimeoutAction = () => {
	timeEndYn.value = true;
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
	font-size: 2.2rem;
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
	padding-top: 10px;
	font-size: 1.9rem;
	margin: 0 10px 0 0;
}
.quest1 {
	font-size: 1.95rem;
}
.quest2 {
	font-size: 1.95rem;
	margin: 0px 0 20px 0;
}

.imgBox {
	margin: 20px auto 20px auto;
	text-align: center;
}
.img {
	margin: 20px;
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
	margin: 20spx 0px 0 0px;
}
.items .itemBox {
	margin: 5px 0px 0 0px;
	text-align: center;
}
.items .itemBox .item {
	width: 85%;
	border-radius: 25px;
	background-color: #f0f3f5;
	padding: 10px 10px 10px 20px;
	text-align: left;
	font-size: 1.8rem;
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
	font-size: 2rem;
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
.tiemr span:nth-child(4) {
	margin: 10px 0 0 5px;

	font-size: 1.3rem;
}
.hide1 {
	display: none;
}
</style>
