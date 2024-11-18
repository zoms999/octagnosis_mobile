<template>
	<div class="test-form">
		<div class="questPageNm">
			<span class="badge text-bg-secondary">{{ QuestPage.questPageNm }}</span>
			<span style="color: white">OneQuestImgA</span>
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
				<div class="imgs">
					<div
						class="imgBox d-flex flex-wrap justify-content-center"
						v-for="questImg in getQuestImgList(item.questId)"
						:key="questImg.imgId"
						:style="{ width: `calc(${100 / item.imgColCnt}% - 0.5%)` }"
					>
						<img :src="`${imageSrc}/QuestImg/${questImg.imgNm}`" class="img" />
					</div>
				</div>
				<div class="quest2">
					<span v-html="item.questCont2"></span>
				</div>
				<div class="items d-flex flex-wrap">
					<div
						class="itemBox"
						v-for="questItem in getQuestItemList(item.questId)"
						:key="questItem.itemId"
						:style="{ width: `calc(${100 / item.itemColCnt}% - 0.5%)` }"
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
import { computed } from 'vue';

var QuestPage = defineModel('QuestPage');
var QuestList = defineModel('QuestList');
var QuestItemList = defineModel('QuestItemList');
var QuestImgList = defineModel('QuestImgList');

const imageSrc = computed(() => {
	const basePath = import.meta.env.VITE_IMG_BASE_PATH;
	return `${basePath}`;
});

const getQuestImgList = questId => {
	return QuestImgList.value.filter(o => o.questId == questId);
};

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
	margin: auto 10px;
	text-align: center;
}
.img {
	margin: 20px;
	border: 1px solid rgb(80, 80, 80);
}
.items {
	margin: 10px 100px 0 100px;
}
.items .itemBox {
	margin: 5px 0px 0 0px;
	text-align: center;
}
.items .itemBox .item {
	width: 85%;
	border-radius: 25px;
	background-color: #f0f3f5;
	padding: 10px 10px 10px 10px;
	text-align: center;
	font-size: 1.8rem;
	cursor: pointer;
	display: inline-block;
}
.itemChecked {
	background-color: #3d7aed !important;
	color: #ffffff;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
	.questPageNm span {
		font-size: 1.5rem;
		padding: 5px;
	}
	.numBox {
		width: 40px;
	}
	.num {
		width: 35px;
		height: 35px;
		font-size: 1.3rem;
		padding-top: 7px;
		margin: 0 5px 0 0;
	}
	.quest1,
	.quest2 {
		font-size: 1.3rem;
		padding: 0 10px;
	}
	.quest2 {
		margin: 0 0 10px 0;
	}
	.imgs {
		padding: 0 5px;
	}
	.imgBox {
		margin: auto 2px;
	}
	.img {
		margin: 10px;
		max-width: 100%;
		height: auto;
	}
	.items {
		margin: 10px 20px 0 20px;
	}
	.items .itemBox .item {
		font-size: 1.5rem;
	}
}
</style>
