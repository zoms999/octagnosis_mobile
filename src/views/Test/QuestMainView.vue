<template>
	<div class="mobile-test-completion">
		<div class="celebration-wrap">
			<component :is="currentTestHead"></component>

			<div v-if="TestParm.testId != 0" class="bottom-nav">
				<button class="btn-next" @click="getNextTest">
					{{ $t('next') }}
					<span class="material-icons">arrow_forward</span>
				</button>
			</div>
		</div>

		<div class="awards">
			<h2 class="awards-title">수상 내역</h2>
			<div class="awards-list">
				<div v-for="(award, index) in awards" :key="index" class="award-item">
					<div class="award-image">
						<img :src="award.image" :alt="award.title" />
					</div>
					<p class="award-text" v-html="award.text"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
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

const { acuntId, orgId, turnConnCd } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const { encodeBase64, decodeBase64 } = useBase64Utils();

const TestParm = ref({
	acuntId: acuntId.value,
	orgId: orgId.value,
	turnConnCd: turnConnCd.value,
	ansPrgrsId: '0',
	prodtId: '0',
	testId: '0',
	questPageId: '0',
});

const awards = [
	{
		image: require('@/assets/img/main/img_award01.png'),
		text: '특허: 제 10-2469087호',
	},
	{
		image: require('@/assets/img/main/img_award02.png'),
		text: '올해의 우수브랜드 대상<br>2년 연속 진로교육부문 1위<br>(중앙일보)',
	},
	{
		image: require('@/assets/img/main/img_award03.png'),
		text: '고객감동 브랜드대상<br>진로상담부문 1위<br>(중앙일보)',
	},
	{
		image: require('@/assets/img/main/img_award04.png'),
		text: '신지식경영인 대상<br>(조선일보)',
	},
];

const currentTestHead = computed(() => {
	switch (TestParm.value.testId) {
		case 9:
			return TestHeadMain;
		case 6:
			return TestHead_1;
		case 10:
			return TestHead_2;
		case 0:
			return TestHeadComplete;
		default:
			return null;
	}
});

const Procs = ref({
	getNextTest: { path: '/api/Test/getNextTest', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			if (reqUrl.value === Procs.value.getNextTest.path) {
				Procs.value.getNextTest.loading = false;
				TestParm.value.ansPrgrsId = data.value.ansPrgrsId;
				TestParm.value.testId = data.value.testId;
				TestParm.value.questPageId = data.value.questPageId;
				goNext();
			}
		},
		onError: err => {
			vAlert(err.message);
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

onBeforeMount(() => {
	const P = JSON.parse(decodeBase64(route.query.p));
	TestParm.value = { ...TestParm.value, ...P };
});

const getNextTest = () => {
	execUrl(Procs.value.getNextTest.path, TestParm.value);
};

const goNext = () => {
	const nm = TestParm.value.questPageId == '0' ? 'questMain' : 'quest';
	const parm = encodeBase64(JSON.stringify(TestParm.value));
	router.push(`${nm}?p=${parm}`);
};
</script>

<style lang="scss" scoped>
.mobile-test-completion {
	font-family: 'Noto Sans KR', sans-serif;
	background-color: #ffffff;
	min-height: 100vh;
	padding: 1rem;
}

.celebration-wrap {
	margin-bottom: 2rem;
}

.bottom-nav {
	display: flex;
	justify-content: center;
	margin-top: 1.5rem;
}

.btn-next {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 0.75rem 1.5rem;
	border-radius: 2rem;
	border: none;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:active {
		background-color: darken(#0d4f8a, 10%);
	}

	.material-icons {
		margin-left: 0.5rem;
		font-size: 1.5rem;
	}
}

.awards {
	margin-top: 2rem;
}

.awards-title {
	font-size: 1.5rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 1.5rem;
	color: #333;
}

.awards-list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 1.5rem;
}

.award-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.award-image {
	width: 80px;
	height: 80px;
	margin-bottom: 0.75rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}

.award-text {
	font-size: 0.9rem;
	line-height: 1.4;
	color: #666;
}

@media (max-width: 480px) {
	.awards-list {
		grid-template-columns: repeat(2, 1fr);
	}

	.award-image {
		width: 60px;
		height: 60px;
	}

	.award-text {
		font-size: 0.8rem;
	}
}
</style>
