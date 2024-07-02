<template>
	<div id="content" class="finish mt-5" style="background-color: #ffffff">
		<div class="container">
			<!-- 20230626 수정: 로고 지움 -->
			<div class="celebration-wrap">
				<img src="../img/sub/img_congratulation.png" alt="" />

				<TestHeadMain v-if="TestParm.testId == 9"></TestHeadMain>

				<TestHead_1 v-if="TestParm.testId == 6"></TestHead_1>

				<TestHead_2 v-if="TestParm.testId == 10"></TestHead_2>

				<TestHeadComplete v-if="TestParm.testId == 0"></TestHeadComplete>

				<div
					class="bottom d-flex justify-content-center"
					v-if="TestParm.testId != 0"
				>
					<div class="btnNext d-flex" @click="getNextTest">
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

import TestHeadMain from '@/components/Test/TestHeadMain.vue';
import TestHead_1 from '@/components/Test/TestHead_1.vue';
import TestHead_2 from '@/components/Test/TestHead_2.vue';
import TestHeadComplete from '@/components/Test/TestHeadComplete.vue';

// Props / Emit  ****************************

// Hook	 *************************************

onBeforeMount(() => {
	const P = JSON.parse(decodeBase64(route.query.p));

	TestParm.ansPrgrsId = P.ansPrgrsId;
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
const { encodeBase64, decodeBase64 } = useBase64Utils();

const TestParm = {
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,

	ansPrgrsId: '0',
	prodtId: '0',
	testId: '0',
	questPageId: '0',
};

// Html ref  ********************************

// Axios / Route	***************************

const Procs = ref({
	getNextTest: { path: '/api/Test/getNextTest', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getNextTest.path:
					Procs.value.getNextTest.loading = false;

					TestParm.ansPrgrsId = data.value.ansPrgrsId;
					TestParm.testId = data.value.testId;
					TestParm.questPageId = data.value.questPageId;

					goNext();

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

const getNextTest = () => {
	execUrl(Procs.value.getNextTest.path, TestParm);
};

const goNext = () => {
	var nm = TestParm.questPageId == '0' ? 'questMain' : 'quest';

	const parm = encodeBase64(JSON.stringify(TestParm));
	router.push(`${nm}?p=${parm}`);
};

// Etc	*************************************
</script>

<style scoped="">
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
