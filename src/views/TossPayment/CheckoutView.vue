<template>
	<div class="wrapper">
		<div class="box_section">
			<!-- 결제 UI -->
			<div id="payment-method"></div>
			<!-- 이용약관 UI -->
			<div id="agreement"></div>
			<!-- 쿠폰 체크박스 -->
			<div style="padding-left: 25px">
				<div class="checkable typography--p">
					<label for="coupon-box" class="checkable__label typography--regular">
						<input
							:disabled="!inputEnabled"
							@change="updateAmount"
							id="coupon-box"
							class="checkable__input"
							type="checkbox"
							aria-checked="true"
						/><span class="checkable__label-text">5,000원 쿠폰 적용</span>
					</label>
				</div>
			</div>
			<!-- 결제하기 버튼 -->
			<button
				:disabled="!inputEnabled"
				@click="requestPayment"
				class="button"
				id="payment-button"
				style="margin-top: 30px"
			>
				결제하기
			</button>
		</div>
		<!-- 성공 모달 -->
		<SuccessView
			v-if="showSuccessModal"
			:payId="payId"
			@close="showSuccessModal = false"
		/>

		<!-- 실패 모달 -->
		<FailView v-if="showFailModal" @close="showFailModal = false" />
	</div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { toHandlers } from 'vue';
import SuccessView from '@/views/TossPayment/SuccessView.vue';
import FailView from '@/views/TossPayment/FailView.vue';

import axios from 'axios';

export default {
	props: {
		productId: {
			type: String,
			required: true,
		},
		productName: {
			type: String,
			required: true,
		},
		productPrice: {
			type: Number,
			required: true,
		},
		productType: {
			type: String,
			required: true,
		},
	},
	components: {
		SuccessView,
		FailView,
	},
	data() {
		return {
			paymentWidget: null,
			paymentMethodWidget: null,
			clientKey: 'test_gck_yZqmkKeP8gWKkB7n6KZx8bQRxB9l',
			//clientKey: 'test_ck_P9BRQmyarY7dQOplOXNa3J07KzLN',
			customerKey: nanoid(),
			amount: this.productPrice,
			inputEnabled: false,
			showSuccessModal: false,
			showFailModal: false,
			payId: null,
		};
	},
	methods: {
		async requestPayment() {
			try {
				if (this.paymentWidget) {
					const paymentInfo = {
						//payId: nanoid(),
						dutyYn: 'N', // Set appropriate values
						studyYn: 'N', // Set appropriate values
						subjYn: 'N', // Set appropriate values
						imgYn: 'N', // Set appropriate values
						acuntId: this.acuntId, // Set appropriate value
						prodId: this.productId, // Set appropriate value
						prodType: this.productType, // Set appropriate value
						price: this.amount,
						payDt: '',
						orgId: this.orgId, // Set appropriate value
						turnId: 22222, // Set appropriate value
						payYn: 'N', // Set appropriate value
						insId: this.userId, // Set appropriate value
						insDt: '',
						uptId: null,
						uptDt: null,
					};

					// Save payment information to the server
					const response = await axios.post('/api/payment/save', paymentInfo, {
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (response.status !== 200) {
						console.log('response.status', response.status);
						throw new Error(
							`Request failed: ${response.status} - ${response.statusText}`,
						);
					}
					this.payId = response.data.payId; // Save the payId from the response
					console.log('this.payId', this.payId);
					await this.paymentWidget.requestPayment({
						orderId: nanoid(),
						orderName: this.productName,
						customerName: this.persnNm,
						customerEmail: this.email,
						customerMobilePhone: this.phone,
						successUrl: `${window.location.origin}/success?payId=${this.payId}`,
						failUrl: `${window.location.origin}/fail?payId=${this.payId}`,
					});
					// .then(async paymentResult => {
					// 	// Update payment status to SUCCESS
					// 	await axios.post(`/api/payment/updateStatus/${this.payId}`, {
					// 		status: 'SUCCESS',
					// 	});
					// })
					// .catch(async error => {
					// 	if (this.payId) {
					// 		// Update payment status to FAIL
					// 		await axios.post(`/api/payment/updateStatus/${this.payId}`, {
					// 			status: 'FAIL',
					// 		});
					// 	}
					// 	if (error.code === 'USER_CANCEL') {
					// 		// 결제 고객이 결제창을 닫았을 때 에러 처리
					// 	} else if (error.code === 'INVALID_CARD_COMPANY') {
					// 		// 유효하지 않은 카드 코드에 대한 에러 처리
					// 	}
					// 	console.error(error);
					// });
				}
			} catch (error) {
				console.error(error);
				// Delete payment record if there was an error or the user closed the payment window
				if (this.payId) {
					try {
						const response = await axios.delete(
							`/api/payment/delete/${this.payId}`,
							{
								headers: {
									'Content-Type': 'application/json',
								},
							},
						);

						if (response.status === 200) {
							console.log('Payment canceled successfully.');
							this.payId = null;
						} else {
							console.error('Failed to cancel payment:', response.statusText);
						}
					} catch (deleteError) {
						console.error('Error canceling payment:', deleteError);
					}
				}
			}
		},
		async updateAmount() {
			const coupon = document.getElementById('coupon-box');
			if (coupon.checked) {
				this.paymentMethodWidget.updateAmount(this.amount - 5000);
			} else {
				this.paymentMethodWidget.updateAmount(this.amount);
			}
		},
	},
	async mounted() {
		const store = useAuthStore();
		const { acuntId, userId, persnNm, email, phone, orgId } =
			storeToRefs(store);

		this.acuntId = acuntId.value;
		this.userId = userId.value;
		this.persnNm = persnNm.value;
		this.email = email.value;
		this.phone = phone.value.replace(/-/g, '');
		this.orgId = orgId.value;

		this.paymentWidget = await loadPaymentWidget(this.clientKey, ANONYMOUS);
		this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods(
			'#payment-method',
			{ value: this.amount },
			{ variantKey: 'DEFAULT' },
		);
		this.paymentWidget.renderAgreement('#agreement', {
			variantKey: 'AGREEMENT',
		});
		this.paymentMethodWidget.on('ready', () => {
			this.inputEnabled = true;
		});
	},
};
</script>

<style scoped>
.wrapper {
	font-family: Arial, sans-serif;
	margin: 20px;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #f9f9f9;
}

.box_section {
	margin: 20px 0;
}

.button {
	display: block;
	width: 100%;
	padding: 10px;
	font-size: 16px;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.button:hover {
	background-color: #0056b3;
}
</style>
