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
	</div>
	<div class="container">
		<div class="d-flex justify-content-between">
			<div class="tit">
				검사이력
				<span class="sub">( 진행중인 검사는 신속히 완료하여 주십시요. )</span>
			</div>
			<div class="actions">
				<button
					class="btn btn-primary"
					@click="navigateToPayment"
					style="font-size: 1.8rem; padding: 0.8rem 1rem 0.8rem 1rem"
				>
					결제 후 검사시작
				</button>
			</div>
		</div>
		<table class="table table-bordered Tbl1">
			<thead>
				<tr>
					<th class="w100">순번</th>
					<th>검사상품</th>
					<th class="w220">검사 유효일자</th>
					<th class="w220">검사완료일자</th>
					<th class="w140">검사상태</th>
					<th class="w140">결과보기</th>
				</tr>
			</thead>
			<tbody>
				<!-- 여기에 데이터를 반복 렌더링 할 수 있습니다 -->
				<tr class="text-center">
					<td>1</td>
					<td>적성검사 A</td>
					<td>2024-12-31</td>
					<td>2024-06-01</td>
					<td class="text-center">
						<button class="btn btn-primary">검사진행</button>
					</td>
					<td><button class="btn btn-primary">결과보기</button></td>
				</tr>
			</tbody>
		</table>
		<div class="text-center mb-5">
			검사결과 '다시 보기'는 유효일자 안에서만 가능합니다.
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToPayment = () => {
	router.push('/testPayment');
};
</script>

<style lang="scss" scoped>
.tit {
	font-size: 2.5rem;
	font-weight: 700;
	margin: 5px 0 0 0px;
	padding: 0 0 0 10px;
}
.tit span.sub {
	font-size: 1.8rem;
	margin: 0 0 0 10px;
}

.test-page {
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 280px);

	.header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;
	}

	.main {
		flex: 1;
		padding: 1rem;

		.test-table {
			width: 100%;
			border-collapse: collapse;

			th,
			td {
				border: 1px solid #ccc;
				padding: 0.5rem;
				text-align: center;
			}

			th {
				background-color: #e9e9e9;
			}
		}
	}

	.footer {
		padding: 1rem;
		background-color: #f5f5f5;
		border-top: 1px solid #ccc;
		text-align: center;
		font-size: 0.9rem;
	}
}
</style>
