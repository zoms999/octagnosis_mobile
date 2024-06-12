<template>
	<div class="test-form">
		<div class="questPageNm">
			<span class="badge text-bg-secondary">{{ QuestPage.questPageNm }}</span>
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
				<div class="quest2">
					<span v-html="item.questCont2"></span>
				</div>
				<div class="items d-flex flex-wrap">
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
							<span v-if="questItem.itemType == 'C00701'">{{
								questItem.conts
							}}</span>
							<img
								v-if="questItem.itemType == 'C00702'"
								:src="getQuestItemImg(questItem.imgNm)"
								class="QuestItemImg"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Props / Emit  ****************************

var QuestPage = defineModel('QuestPage');
var QuestList = defineModel('QuestList');
var QuestItemList = defineModel('QuestItemList');

// Hook  ************************************

// Model / Data  ****************************

// Html ref  ********************************

// Axios / Route  ***************************

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const getQuestItemList = questId => {
	return QuestItemList.value.filter(o => o.questId == questId);
};

const setQuestVal = (questId, itemId) => {
	const Quest = QuestList.value.find(o => o.questId == questId);
	Quest.val1 = itemId;
	const ItemList = QuestItemList.value.filter(o => o.questId == questId);

	ItemList.forEach(item => {
		item.selected = item.itemId == itemId ? true : false;
	});
};

const getQuestItemImg = imgNm => {
	var ImgNm = imgNm == '' ? 'none.png' : imgNm;
	return `/public/img/QuestItem/${ImgNm}`;
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

.items {
	margin: 20px 0 0 0;
}
.items .itemBox {
	margin: 15px 0px 0 0px;
	text-align: center;
}
.items .itemBox .item {
	width: 85%;
	border-radius: 25px;
	background-color: #f0f3f5;
	padding: 10px 10px 10px 10px;
	text-align: center;
	font-size: 1.1rem;
	cursor: pointer;
	display: inline-block;
}
.itemChecked {
	background-color: #3d7aed !important;
	color: #ffffff;
}
.QuestItemImg {
	width: 90%;
	max-width: 300px !important;

	margin: 10px 0 10px 0;
	border-radius: 10px;
}
</style>
