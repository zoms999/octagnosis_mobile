<template>
	<div class="payment-container">
		<h1 class="title">결제를 진행하여 주십시오.</h1>
		<p class="info-text">
			검사자님께서는 아래 선택하신 프로그램으로 진행됨을 알려드립니다.
		</p>

		<div class="program-info">
			<label for="product-select">검사 프로그램</label>
			<select
				id="product-select"
				v-model="selectedProductId"
				@change="updatePrice"
			>
				<option
					v-for="product in products"
					:key="product.ProdtId"
					:value="product.ProdtId"
				>
					{{ product.ProdtNm }}
				</option>
			</select>
			<span v-if="selectedProduct" class="price">
				{{ selectedProduct.Price.toLocaleString() }} 원
			</span>
		</div>

		<div class="important-info">
			<h2>주의사항 [필독]</h2>
			<ul>
				<li>
					결제 완료 후 선택하신 프로그램에 해당하는 검사가 곧바로 진행됩니다.
				</li>
				<li>
					곧바로 검사를 진행하지 못하실 경우, 결제 후 7일 이내에 실시하셔야
					하며, 7일이 경과되면 소멸됩니다.
				</li>
				<li>
					결제 후 바로 검사가 진행되므로, 결제가 완료된 뒤에는 취소 및 환불이
					불가합니다.
				</li>
				<li>
					결제 시 본 프로그램의 특허권, 저작권, 상표권 등의 소유권을 가진
					커리어컴퍼니로 결과가 통보됩니다.
				</li>
			</ul>
		</div>

		<button class="payment-button" @click="handlePayment">결제하기</button>

		<!-- Modal -->
		<Teleport to="body">
			<Transition name="modal">
				<div v-if="showModal" class="modal">
					<div class="modal-content">
						<CheckoutView
							:productId="selectedProductId"
							:productName="selectedProduct.ProdtNm"
							:productPrice="selectedProduct.Price"
							:productType="selectedProduct.ProdtType"
						/>
						<button class="close-button" @click="closeModal">닫기</button>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CheckoutView from '../TossPayment/CheckoutView.vue';

const products = ref([]);
const selectedProductId = ref(null);
const selectedProduct = ref(null);
const showModal = ref(false);

const fetchProducts = async () => {
	try {
		const response = await axios.get('/api/products');
		products.value = response.data.ProductList.filter(o => o.ProdtId != 6);
		if (products.value.length > 0) {
			selectedProductId.value = products.value[0].ProdtId;
			selectedProduct.value = products.value[0];
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};

const updatePrice = () => {
	selectedProduct.value = products.value.find(
		product => product.ProdtId === selectedProductId.value,
	);
};

const handlePayment = () => {
	if (selectedProduct.value) {
		showModal.value = true;
	}
};

const closeModal = () => {
	showModal.value = false;
};

onMounted(fetchProducts);
</script>

<style lang="scss" scoped>
.payment-container {
	font-family: 'Noto Sans KR', sans-serif;
	max-width: 100%;
	margin: 0 auto;
	padding: 20px;
	background-color: #ffffff;
}

.title {
	color: #333;
	font-size: 24px;
	font-weight: 700;
	text-align: center;
	margin-bottom: 20px;
}

.info-text {
	text-align: center;
	color: #666;
	font-size: 16px;
	margin-bottom: 30px;
}

.program-info {
	background-color: #f8f9fa;
	border-radius: 12px;
	padding: 20px;
	margin-bottom: 30px;

	label {
		display: block;
		font-weight: 600;
		margin-bottom: 10px;
		color: #333;
		font-size: 16px;
	}

	select {
		width: 100%;
		padding: 12px;
		border: 1px solid #ced4da;
		border-radius: 8px;
		font-size: 16px;
		margin-bottom: 15px;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		background-size: 12px;

		&:focus {
			outline: none;
			border-color: #007bff;
		}
	}

	.price {
		display: block;
		font-size: 20px;
		font-weight: 700;
		color: #28a745;
		margin-top: 10px;
	}
}

.important-info {
	background-color: #fff3cd;
	border-radius: 12px;
	padding: 20px;
	margin-bottom: 30px;

	h2 {
		color: #856404;
		font-size: 18px;
		margin-bottom: 15px;
	}

	ul {
		padding-left: 20px;

		li {
			color: #666;
			margin-bottom: 10px;
			line-height: 1.5;
			font-size: 14px;
		}
	}
}

.payment-button {
	display: block;
	width: 100%;
	padding: 16px;
	font-size: 18px;
	font-weight: 600;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 12px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:active {
		background-color: #0056b3;
	}
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	background-color: #fff;
	padding: 20px;
	border-radius: 12px;
	width: 90%;
	max-width: 400px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-button {
	display: block;
	width: 100%;
	margin-top: 20px;
	padding: 12px;
	font-size: 16px;
	font-weight: 600;
	color: #fff;
	background-color: #6c757d;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:active {
		background-color: #5a6268;
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

@media (max-width: 480px) {
	.title {
		font-size: 22px;
	}

	.info-text {
		font-size: 14px;
	}

	.program-info {
		padding: 15px;

		label {
			font-size: 14px;
		}

		select {
			font-size: 14px;
		}

		.price {
			font-size: 18px;
		}
	}

	.important-info {
		padding: 15px;

		h2 {
			font-size: 16px;
		}

		ul li {
			font-size: 12px;
		}
	}

	.payment-button {
		font-size: 16px;
		padding: 14px;
	}

	.modal-content {
		padding: 15px;
	}

	.close-button {
		font-size: 14px;
		padding: 10px;
	}
}
</style>
