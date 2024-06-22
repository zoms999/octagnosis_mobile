<template>
	<div id="content" class="main">
		<div class="visual">
			<div class="text-wrap">
				<div class="headline">
					<p class="text01">
						<span class="dot"></span>
						<strong>진짜 나</strong>를 찾아주는
					</p>
					<p class="text02">옥타그노시스 검사</p>
					<p class="text03">나답게 살아갈 인생설계도를 제시합니다!</p>
				</div>
				<p class="text04">
					해외의 진로적성검사를 짜깁기 한 검사가 아닙니다. <br />
					교육과학적 문항을 기반으로 특허받은 진로적성검사입니다.
				</p>
			</div>
		</div>
		<div class="test">
			<div class="container">
				<div class="card-list">
					<div class="card enabled">
						<!-- 활성화: .enabled, 비활성화: .disabled -->
						<div class="card-head">
							<div class="deco">
								<img src="../img/icon/ic_tendency.png" alt="" />
							</div>
							<div class="text-wrap">
								<p class="title">성향검사</p>
								<p class="text">나는 어떤 성향일까?</p>
							</div>
							<button class="btn btn-start">시작하기</button>
						</div>
						<div class="card-body">
							<ul>
								<li>주성향진단</li>
								<li>세부성향진단</li>
								<li>성향적합 직업 및 학과 분석</li>
							</ul>
						</div>
					</div>
					<div class="card enabled">
						<!-- 활성화: .enabled, 비활성화: .disabled -->
						<div class="card-head">
							<div class="deco">
								<img src="../img/icon/ic_ability.png" alt="" />
							</div>
							<div class="text-wrap">
								<p class="title">핵심역량 검사</p>
								<p class="text">나의 재능역량은 무엇일까?</p>
							</div>
							<button class="btn btn-start">시작하기</button>
						</div>
						<div class="card-body">
							<ul>
								<li>8가지 사고력 진단</li>
								<li>60가지 핵심역량 진단</li>
								<li>역량적합 직업 및 학과 분석</li>
							</ul>
						</div>
					</div>
					<div class="card disabled">
						<!-- 활성화: .enabled, 비활성화: .disabled -->
						<div class="card-head">
							<div class="deco">
								<img src="../img/icon/ic_prefer.png" alt="" />
							</div>
							<div class="text-wrap">
								<p class="title">선호반응 검사</p>
								<p class="text">내가 좋아하는 것은 무엇일까?</p>
							</div>
							<button class="btn btn-start">시작하기</button>
						</div>
						<div class="card-body">
							<ul>
								<li>선호성향 진단</li>
								<li>선호성향적합 직업 및 학과 분석</li>
							</ul>
						</div>
					</div>
					<div class="card disabled">
						<!-- 활성화: .enabled, 비활성화: .disabled -->
						<div class="card-head">
							<div class="deco">
								<img src="../img/icon/ic_synthesis.png" alt="" />
							</div>
							<div class="text-wrap">
								<p class="title">종합검사</p>
								<p class="text">
									내가 잘하고, 좋아하는 것 진단 & <br />
									나의 진로설계를 한번에!
								</p>
							</div>
							<button class="btn btn-start">시작하기</button>
						</div>
						<div class="card-body">
							<ul>
								<li>주성향진단</li>
								<li>세부성향진단</li>
								<li>성향적합 직업 및 학과 분석</li>
								<li>8가지 사고력진단</li>
								<li>60가지 역량진단</li>
							</ul>
							<ul>
								<li>선호성향진단</li>
								<li>선호성향적합 직업 및 학과 분석</li>
								<li>적합직무 진단</li>
								<li>성향적합 교과목 분석</li>
								<li>성향적합 학습스타일 진단</li>
								<li>성향적합 교육기관선택 분석</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="award">
			<div class="container">
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
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useBase64Utils } from '@/plugins/base64.js';

const route = useRoute();
const { decodeBase64 } = useBase64Utils();

const testId = ref(null);
const questPageId = ref(null);

onMounted(() => {
	if (route.query.p) {
		const params = JSON.parse(decodeBase64(route.query.p));
		testId.value = params.testId;
		questPageId.value = params.questPageId;

		console.log('testId.value', testId.value);
		console.log('questPageId.value', questPageId.value);
	}
});
</script>

<style lang="scss" scoped></style>
