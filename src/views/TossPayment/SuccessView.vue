<template>
	<div id="content" class="join">
		<div class="container">
			<!-- 결제 성공 시 -->
			<section v-if="confirmed" class="success-section">
				<div class="box_section">
					<img
						class="success-image"
						src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
						alt="결제 성공 이미지"
					/>
					<h2 class="success-title">결제를 완료했어요</h2>

					<div class="info-grid">
						<div class="info-item">
							<b>결제금액</b>
							<span>{{ jsonData.totalAmount }}원</span>
						</div>
						<div class="info-item">
							<b>주문번호</b>
							<span>{{ jsonData.orderId }}</span>
						</div>
						<div class="info-item">
							<b>paymentKey</b>
							<span>{{ jsonData.paymentKey }}</span>
						</div>
					</div>

					<div class="button-group">
						<a
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
						</a>
					</div>
				</div>
				<div class="box_section response-section">
					<b>Response Data :</b>
					<div class="response-content">
						<pre>{{ jsonData }}</pre>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { confirmPayment } from '@/confirmPayment';
import axios from 'axios';

export default {
	props: {
		payId: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const confirmed = ref(false);
		const jsonData = ref(null);

		const updatePaymentStatus = async (status, data) => {
			try {
				await axios.post('/api/updatePaymentStatus', {
					status,
					data,
				});
			} catch (error) {
				console.error('Error updating payment status:', error);
			}
		};

		onMounted(async () => {
			const requestData = {
				orderId: route.query.orderId,
				amount: route.query.amount,
				paymentKey: route.query.paymentKey,
			};

			try {
				const { response, json } = await confirmPayment(requestData);
				if (!response.ok) {
					// Update payment status as failed
					await updatePaymentStatus('failed', json);
					router.push(`/fail?message=${json.message}&code=${json.code}`);
				} else {
					// Update payment status as succeeded
					await updatePaymentStatus('succeeded', json);
					confirmed.value = true;
					jsonData.value = json;
				}
			} catch (error) {
				console.error('Error confirming payment:', error);
			}
		});

		return {
			confirmed,
			jsonData,
		};
	},
};
</script>

<style scoped>
/* 전체 컨테이너 가운데 정렬 및 중앙 정렬 */
#content {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: #f4f4f4;
}

.container {
	width: 100%;
	max-width: 800px;
	padding: 20px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.success-section {
	text-align: center;
}

.success-image {
	width: 80px;
	margin-bottom: 20px;
}

.success-title {
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
	margin: 30px 0;
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

.response-section {
	margin-top: 20px;
	text-align: left;
}

.response-content {
	white-space: pre-wrap;
	word-break: break-all;
	background: #f9f9f9;
	padding: 10px;
	border-radius: 4px;
}
</style>
