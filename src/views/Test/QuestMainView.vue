<template>
	<div id="content" class="finish mt-5">
		<div class="container">
			<!-- 20230626 수정: 로고 지움 -->
			<div class="celebration-wrap">
				<img src="../img/sub/img_congratulation.png" alt="" />
				<p class="text01 d-flex justify-content-center">
					<span
						class="material-icons"
						style="font-size: 5rem; margin: 5px 10px 5px 5px"
					>
						assignment_turned_in
					</span>
					<span> 검사유의사항 </span>
				</p>
				<p class="text03 text-start px-5">
					옥타그노시스검사를 시작하기 전, 검사의 효과를 높이기 위해 아래 내용을
					꼼꼼하게 읽어주시면 감사하겠습니다.
				</p>

				<div class="checkItem">
					<div>1. 검사 진행시 모든 문항에 솔직하게 답변해주세요</div>
					<div>
						2. 시간 제한이 있는 문항에는 반드시 시간을 엄수해서 답해 주시기
						바랍니다.
					</div>
					<div>
						3. 고민이 되거나 어려운 문제가 나올 시 시간을 지체하지 마시고, 생각
						속에 떠오르는 대로 선택해주세요.
					</div>
					<div>
						4. 검사가 시작되면 중간에 멈추지 마시고, 끝까지 한번에 진행해
						주세요.
					</div>
					<div>
						5. 검사에 방해가 될 수 있는 휴대전화, 전자기기 등은 무음이나
						비행기모드로 하시고 검사를 진행해 주세요.
					</div>
				</div>

				<div class="bottom d-flex justify-content-center">
					<div class="btnNext d-flex" @click="goNext">
						<span style="font-size: 2.2rem !important">다 음</span> &nbsp;
						&nbsp;
						<span
							class="material-icons"
							style="border: none; font-size: 2.2rem; margin-top: 8px"
						>
							forward
						</span>
					</div>
				</div>
			</div>
			<div class="award">
				<ul>
					<li>
						<div class="thumb">
							<img src="../img/main/img_award01.png" alt="" />
						</div>
						<p class="text">특허: 제 10-2469087호</p>
					</li>
					<li>
						<div class="thumb">
							<img src="../img/main/img_award02.png" alt="" />
						</div>
						<p class="text">
							올해의 우수브랜드 대상 <br />
							2년 연속 진로교육부문 1위 <br />
							(중앙일보)
						</p>
					</li>
					<li>
						<div class="thumb">
							<img src="../img/main/img_award03.png" alt="" />
						</div>
						<p class="text">
							고객감동 브랜드대상 <br />
							진로상담부문 1위 <br />
							(중앙일보)
						</p>
					</li>
					<li>
						<div class="thumb">
							<img src="../img/main/img_award04.png" alt="" />
						</div>
						<p class="text">
							신지식경영인 대상 <br />
							(조선일보)
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { useBase64Utils } from '@/plugins/base64.js';

// Props / Emit  ****************************

// Hook	 *************************************

onBeforeMount(() => {
	const P = JSON.parse(decodeBase64(route.query.p));

	TestParm.prodtId = P.prodtId;
	TestParm.testId = P.testId;
	TestParm.questPageId = P.questPageId;
});

onMounted(() => {});

// Model / Data *****************************

const { acuntId, orgId, turnConnCd } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();

const TestList = ref([]);
const QuestPage = ref({});
const QuestList = ref([]);
const QuestItemList = ref([]);
const QuestImgList = ref([]);

const TestParm = {
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,
	prodtId: '0',
	testId: '0',
	questPageId: '0',
};

const { decodeBase64 } = useBase64Utils();

// Html ref  ********************************

const goNext = () => {
	router.push({
		name: 'quest',
		query: { testId: TestParm.testId, questPageId: TestParm.questPageId },
	});
};

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

.checkItem {
	margin: 10px 0 0 0;
	padding: 10px 10px 10px 30px;
	font-size: 2.5rem;
	font-weight: 500;
}
.checkItem div {
	padding: 5px 30px 10px 30px;
}
</style>
