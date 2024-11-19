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

import awardImage1 from '@/assets/img/main/img_award01.png';
import awardImage2 from '@/assets/img/main/img_award02.png';
import awardImage3 from '@/assets/img/main/img_award03.png';
import awardImage4 from '@/assets/img/main/img_award04.png';

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
		image: awardImage1,
		text: '특허: 제 10-2469087호',
	},
	{
		image: awardImage2,
		text: '올해의 우수브랜드 대상<br>2년 연속 진로교육부문 1위<br>(중앙일보)',
	},
	{
		image: awardImage3,
		text: '고객감동 브랜드대상<br>진로상담부문 1위<br>(중앙일보)',
	},
	{
		image: awardImage4,
		text: '신지식경영인 대상<br>(조선일보)',
	},
];

const currentTestHead = computed(() => {
	console.log('현재 TestParm.value.testId:', TestParm.value.testId);
	console.log('TestParm 전체 값:', TestParm.value);

	const component = (() => {
		switch (TestParm.value.testId) {
			case 9:
				console.log('TestHeadMain 컴포넌트 반환');
				return TestHeadMain;
			case 6:
				console.log('TestHead_1 컴포넌트 반환');
				return TestHead_1;
			case 10:
				console.log('TestHead_2 컴포넌트 반환');
				return TestHead_2;
			case 0:
				console.log('TestHeadComplete 컴포넌트 반환');
				return TestHeadComplete;
			default:
				console.log('일치하는 컴포넌트 없음');
				return null;
		}
	})();

	console.log('선택된 컴포넌트:', component);
	return component;
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

<
<style lang="scss" scoped>
.mobile-test-completion {
	font-family: 'Noto Sans KR', sans-serif;
	background-color: #ffffff;
	min-height: 100vh;
	padding: 1rem;
	display: flex;
	flex-direction: column;
}

.celebration-wrap {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 1.5rem;
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
	font-size: 1.5rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	width: 100%;
	max-width: 300px;

	&:active {
		transform: scale(0.98);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.icon {
		margin-left: 0.5rem;
		width: 1.5rem;
		height: 1.5rem;
	}
}

.awards {
	margin-top: 2rem;
}

.awards-title {
	font-size: 1.3rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 1.5rem;
	color: #333;
}

.awards-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.25rem;
}

.award-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.award-image {
	width: 60px;
	height: 60px;
	margin-bottom: 0.75rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}

.award-text {
	font-size: 0.8rem;
	line-height: 1.4;
	color: #666;
}

@media (min-width: 481px) {
	.awards-list {
		grid-template-columns: repeat(4, 1fr);
	}

	.award-image {
		width: 80px;
		height: 80px;
	}

	.award-text {
		font-size: 0.9rem;
	}
}

@media (max-width: 320px) {
	.awards-list {
		grid-template-columns: 1fr;
	}

	.award-image {
		width: 50px;
		height: 50px;
	}

	.award-text {
		font-size: 0.75rem;
	}
}
</style>
