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

				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 70"
				>
					<div class="row">
						<div class="col-4">
							<span :class="{ hide1: timeEndYn }">
								방구들 선득선득해지는 날부터 봄까지<br />
								조선 팔도 거리에서 제일 아름다운 것은<br />
								연탄차가 부릉부릉<br />
								힘쓰며 언덕길 오르는 거라네.<br />
								해야 할 일이 무엇인가를 알고 있다는 듯이<br />
								연탄은, 일단 제 몸에 불이 옮겨 붙었다 하면<br />
								하염없이 뜨거워지는 것<br />
								매일 따스한 밥과 국물 퍼먹으면서도 몰랐네.<br />
							</span>
						</div>
						<div class="col-4">
							<span :class="{ hide1: timeEndYn }">
								온몸으로 사랑하고 나면<br />
								한 덩이 재로 쓸쓸하게 남는 게 두려워<br />
								여태껏 나는 (_________________).<br />
								생각하면<br />
								삶이란<br />
								나를 산산이 으깨는 일.<br />
								눈 내려 세상이 미끄러운 어느 이른 아침에<br />
								나 아닌 그 누가 마음 놓고 걸어갈<br />
								그 길을 만들 줄도 몰랐었네, 나는<br />
							</span>
						</div>
						<div class="col-4">
							<div
								style="
									background-color: #e87373;
									padding: 10px;
									color: #ffffff;
									border-radius: 10px;
								"
							>
								시의 내용과 어울리도록 (_________________).
								<br />안에 들어갈 시구를 10초 동안 생각해보자.
							</div>
							<br />
							<div
								style="
									background-color: #6eb0e0;
									padding: 10px;
									color: #ffffff;
									line-height: 2.2rem;
									border-radius: 10px;
								"
								:class="{ hide1: timeEndYn == false }"
							>
								답 문장 : <br />( 그 누구에게 연탄 한 장도 되지 못하였네. )
							</div>
						</div>
					</div>
				</div>
				<div
					class="container-fluid fs120 my-3 p-3 border"
					v-if="Quest.questId == 71"
				>
					<div class="row">
						<div class="col-7">
							거대한 열대초원이 있는 탄자니아는 충분한 햇빛과 적당한 비가 내려
							다양한 열대 동물들이 살아가기에 이상적인 환경이다. 그래서
							유네스코에서는 이 거대한 초원지대를 인류 자연환경 보호구역으로
							지정했다. <br />
							그러나 이처럼 좋은 자연조건을 가진 탄자니아에서도 동물들은 먹을
							것이 없어서 굶주림에 허덕이고 있다.<br />
							심지어 탄자니아의 한 시골마을 주민들은 이리의 잦은 습격으로 피해를
							입고 있었다. <br />이리들은 집주인이 없는 틈을 타서 집안에 있는
							닭이나 그 밖의 먹을 것들을 훔쳐가곤 했다.<br />
							그러나 현지 주민들은 보통 집에 문을 달지 않았기 때문에 외출 시
							아이들의 안전이 문제가 되었다.<br />
							이 이야기를 전해들은 한 여인이 좋은 방법을 생각해냈다.<br />
						</div>
						<div class="col-5">
							<div
								style="
									background-color: #e87373;
									padding: 10px;
									color: #ffffff;
									border-radius: 10px;
									font-size: 1.1rem;
								"
							>
								내가 그 이야기를 전해들은 여인이라면, <br />어떤 방법을
								생각해냈을까? <br />10초 동안 생각해보자.
							</div>
							<br />
							<div
								style="
									background-color: #6eb0e0;
									padding: 10px;
									color: #ffffff;
									line-height: 1.7rem;
									border-radius: 10px;
									font-size: 1.1rem;
								"
								:class="{ hide1: timeEndYn == false }"
							>
								이 여인이 제시한 방법은<br />
								어른들이 일을 보러 나갈 때는 아이들이 노는 마당에 가시<br />
								울타리를 쳐서, 오히려 아이들을 가두어 둔다. <br />이 이야기는
								실제 사례로, 여인이 생각해 낸 방법은 이리를 <br />가두는 것이
								아니라 오히려 아이를 가두는 역발상으로<br />아이들을 지킨
								것이다.
							</div>
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
									<div v-if="timeEndYn == false">
										신도시 ‘행복지구’에 최근 버스 관련 민원 사항이 빗발치고
										있다.<br />
										대규모 아파트 단지가 조성된 뒤, 많은 사람들이 서울에서
										이주를 했지만,<br />
										버스 배차 간격이 30분이 넘어서, 출퇴근 시간에 불편함이
										이만저만이 아닌 상황이다.<br />
										구청에 민원을 넣고 항의 시위도 여러 번 했지만, 예산이
										부족하다는 변명만 늘어놓고 있다.<br />
										결국 시민들이 나서서 대책 마련에 들어갔다.<br />
										당신이 만약 행복지구 주민이라면 어떤 방법을 내놓을까?<br />
										<span style="color: blue">20초 동안 생각해보자.</span><br />
									</div>
								</div>
								<div class="col-4">
									<img
										src="/public/img/QuestImg/QuestImg_96_1067.jpg"
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
								<div v-if="timeEndYn == false">
									당신은 혼자서 고객을 만나러 약속장소로 시간 맞춰 가고 있다.<br /><br />

									지하철 역에서 나오면서 올라오는 계단에서 스마트폰을
									떨어뜨렸는데 액정이 깨져서 화면이 보이지 않는다.<br /><br />

									고객을 만나기로 한 정확한 장소와 연락처가 스마트폰에 있어서
									대략적인 위치만 알고 이동 중이다.<br /><br />

									약속시간은 다가오고 있다. 당신이라면 고객과의 약속장소를
									어떻게 제 시간에 맞춰 찾아가겠는가?<br /><br />

									<span style="color: blue">20초 동안 생각해보자.</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="quest2">
					<span v-html="item.questCont2"></span>
				</div>

				<!-- 보기 -->
				<div class="itemsScreen" v-if="ScreenYn">
					보기는 타이머 종료후 나타납니다.
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
	font-size: 1.2rem;
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
.hide1 {
	display: none;
}
</style>
