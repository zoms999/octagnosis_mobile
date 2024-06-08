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
				if (this.paymentWidget) {
					await this.paymentWidget.requestPayment({
						orderId: nanoid(),
						orderName: this.productName,
						customerName: '김토스',
						customerEmail: 'customer123@gmail.com',
						customerMobilePhone: '01012341234',
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
