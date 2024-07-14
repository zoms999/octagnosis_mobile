<template>
	<div id="error-content" class="error-container">
		<div class="box_section">
			<img
				class="error-image"
				src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
				alt="결제 실패 이미지"
			/>
			<h2 class="error-title">결제를 실패했어요</h2>

			<div class="info-grid">
				<div class="info-item">
					<b>에러메시지</b>
					<span>{{ errorMessage }}</span>
				</div>
				<div class="info-item">
					<b>에러코드</b>
					<span>{{ errorCode }}</span>
				</div>
			</div>

			<div class="button-group">
				<!-- <a
					class="button"
					href="https://docs.tosspayments.com/guides/payment/integration"
					target="_blank"
				>
					연동 문서
				</a>
				<a
					class="button support-button"
					href="https://discord.gg/A4fRFXQhRu"
					target="_blank"
				>
					실시간 문의
				</a> -->
				<button class="button" @click="goToPayPage">재결제</button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
	name: 'ErrorView',
	setup() {
		const router = useRouter();
		const errorMessage = ref('');
		const errorCode = ref('');

		// API 호출 함수
		const updatePaymentStatus = async (status, message, code) => {
			try {
				await axios.post('/api/updatePaymentStatus', {
					status,
					message,
					code,
				});
			} catch (error) {
				console.error('Error updating payment status:', error);
			}
		};
		const goToPayPage = () => {
			console.log('goToPayPage');
			router.push('/TestPayment'); // 메인 페이지로 이동
		};

		// 페이지가 마운트된 후에 에러 정보를 읽고 API 호출
		onMounted(() => {
			errorMessage.value =
				new URLSearchParams(window.location.search).get('message') ||
				'Unknown error';
			errorCode.value =
				new URLSearchParams(window.location.search).get('code') ||
				'Unknown code';

			// 실패 상태 업데이트 API 호출
			//updatePaymentStatus('failed', errorMessage.value, errorCode.value);
		});

		return {
			errorMessage,
			errorCode,
			goToPayPage,
		};
	},
};
</script>

<style scoped>
/* 전체 컨테이너 가운데 정렬 및 스크롤 방지 */
html,
body {
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden; /* 스크롤 방지 */
}

#error-content {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 75vh; /* 화면 높이의 75% */
	background-color: #f4f4f4;
}

.box_section {
	width: 100%;
	max-width: 600px;
	padding: 20px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.error-image {
	width: 80px;
	margin-bottom: 20px;
}

.error-title {
	margin: 20px 0;
	font-size: 24px;
	font-weight: bold;
}

.info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	margin: 20px 0;
}

.info-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	background: #f9f9f9;
	border-radius: 4px;
}

.button-group {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 30px;
}

.button {
	display: inline-block;
	padding: 10px 20px;
	font-size: 16px;
	text-decoration: none;
	color: #fff;
	background-color: #007bff;
	border-radius: 4px;
	transition: background-color 0.3s ease;
}

.button:hover {
	background-color: #0056b3;
}

.support-button {
	background-color: #e8f3ff;
	color: #1b64da;
}

.support-button:hover {
	background-color: #d0e7ff;
}
</style>
