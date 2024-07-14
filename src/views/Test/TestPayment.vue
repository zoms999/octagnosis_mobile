<template>
	<div class="payment-container">
		<h1>결제를 진행하여 주십시오.</h1>
		<p class="info-text">
			검사자님께서는 아래 선택하신 프로그램으로 진행됨을 알려드립니다.
		</p>

		<div class="program-info">
			<label for="product-select">검사 프로그램:</label>
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
			<span v-if="selectedProduct">
				가격: {{ selectedProduct.Price.toLocaleString() }} 원
			</span>
		</div>

		<div class="important-info">
			<h2>주의사항 [필독]</h2>
			<p>
				결제 완료 후 선택하신 프로그램에 해당하는 검사가 곧바로 진행됩니다.<br />
				곧바로 검사를 진행하지 못하실 경우, 결제 후 7일 이내에 실시 하셔야
				하며,<br />
				7일이 경과되면 소멸됩니다.<br />
				결제 후 바로 검사가 진행되므로, 결제가 완료된 뒤에는 취소 및 환불이
				불가합니다.<br />
				결제 시 본 프로그램의 특허권, 저작권, 상표권 등의 소유권을 가진
				커리어컴퍼니로 결과가 통보됩니다.
			</p>
		</div>

		<button class="payment-button" @click="handlePayment">결제하기</button>

		<!-- Modal -->
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
		products.value = response.data.ProductList;
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

onMounted(() => {
	fetchProducts();
});
</script>

<style lang="scss" scoped>
.payment-container {
	font-family: Arial, sans-serif;
	margin: 20px auto;
	padding: 40px;
	max-width: 800px; /* 늘어난 가로 사이즈 */
	border: 1px solid #ddd;
	border-radius: 12px;
	background-color: #fff;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
	color: #333;
	text-align: center;
	margin-bottom: 20px;
	font-size: 28px; /* 제목 폰트 크기 증가 */
}

.info-text {
	text-align: center;
	color: #666;
	margin-bottom: 30px; /* 텍스트 마진 증가 */
	font-size: 16px;
}

.program-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px; /* 정보 박스 마진 증가 */
	padding: 15px;
	background-color: #f7f7f7;
	border-radius: 8px;
	border: 1px solid #ddd;
}

.program-info label {
	font-weight: bold;
	font-size: 16px;
}

.program-info select {
	margin-left: 15px; /* 선택 박스와 레이블 간의 간격 증가 */
	padding: 10px;
	border-radius: 6px;
	border: 1px solid #ddd;
	font-size: 16px;
}

.program-info span {
	display: block;
	margin-top: 10px;
	font-weight: bold;
	font-size: 18px; /* 가격 폰트 크기 증가 */
	color: #333;
}

.important-info {
	margin: 30px 0; /* 중요 정보 박스 마진 증가 */
	padding: 15px;
	background-color: #f7f7f7;
	border-radius: 8px;
	border: 1px solid #ddd;
}

.important-info h2 {
	color: #ff5722;
	margin-bottom: 15px;
	font-size: 22px; /* 중요 정보 제목 폰트 크기 증가 */
}

.important-info p {
	font-size: 16px; /* 중요 정보 텍스트 폰트 크기 증가 */
	line-height: 1.8;
	color: #555;
}

button.payment-button {
	display: block;
	width: 100%;
	padding: 15px; /* 버튼 패딩 증가 */
	font-size: 18px; /* 버튼 폰트 크기 증가 */
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button.payment-button:hover {
	background-color: #0056b3;
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6); /* 배경 어두운 색상 증가 */
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
	background-color: #fff;
	padding: 30px; /* 모달 패딩 증가 */
	border-radius: 12px;
	width: 90%;
	max-width: 800px; /* 모달 최대 너비 증가 */
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.close-button {
	display: block;
	margin-top: 20px;
	padding: 12px 24px; /* 버튼 패딩 증가 */
	font-size: 18px; /* 버튼 폰트 크기 증가 */
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.close-button:hover {
	background-color: #0056b3;
}
</style>
