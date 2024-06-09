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
	</div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export default {
	props: {
		productName: {
			type: String,
			required: true,
		},
		productPrice: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			paymentWidget: null,
			paymentMethodWidget: null,
			clientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
			customerKey: nanoid(),
			amount: this.productPrice,
			inputEnabled: false,
		};
	},
	methods: {
		async requestPayment() {
			try {
				const paymentInfo = {
					//payId: nanoid(),
					dutyYn: 'N', // Set appropriate values
					studyYn: 'N', // Set appropriate values
					subjYn: 'N', // Set appropriate values
					imgYn: 'N', // Set appropriate values
					acuntId: 12345, // Set appropriate value
					prodId: 67890, // Set appropriate value
					prodType: 'Product', // Set appropriate value
					price: this.amount,
					payDt: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14),
					orgId: 11111, // Set appropriate value
					turnId: 22222, // Set appropriate value
					payYn: 'N', // Set appropriate value
					insId: 33333, // Set appropriate value
					insDt: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14),
					uptId: null,
					uptDt: null,
				};

				// Save payment information to the server
				const response = await fetch('http://localhost:8080/api/payment/save', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(paymentInfo),
				});

				if (!response.ok) {
					const errorMessage = await response.text();
					throw new Error(
						`Request failed: ${response.status} - ${errorMessage}`,
					);
				}

				if (this.paymentWidget) {
					await this.paymentWidget.requestPayment({
						orderId: nanoid(),
						orderName: this.productName,
						customerName: this.persnNm,
						customerEmail: this.email,
						customerMobilePhone: this.phone,
						successUrl: `${window.location.origin}/success`,
						failUrl: `${window.location.origin}/fail`,
					});
				}
			} catch (error) {
				console.error(error);
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
		const { persnNm, email, phone } = storeToRefs(store);

		this.persnNm = persnNm.value;
		this.email = email.value;
		this.phone = phone.value.replace(/-/g, '');

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
