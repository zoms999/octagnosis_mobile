<template>
	<div class="payment-container">
		<h1>결제를 진행하여 주십시오.</h1>
		<p>
			짐스<br />검사자님께서는 아래 선택하신 프로그램으로 진행됨을 알려드립니다.
		</p>

		<div class="program-info">
			<label for="product-select">검사 프로그램: </label>
			<select
				id="product-select"
				v-model="selectedProduct"
				@change="updatePrice"
			>
				<option
					v-for="product in products"
					:key="product.prodId"
					:value="product"
				>
					{{ product.prodNm }}
				</option>
			</select>
			<p>가격: {{ selectedProduct ? selectedProduct.price : 0 }} 원</p>
		</div>

		<div class="important-info">
			<h2>주의사항 [필독]</h2>
			<p>
				결제 완료 후 선택하신 프로그램에 해당하는 검사가 곧바로 진행됩니다.<br />
				곧바로 검사를 진행하지 못하실 경우, 결제 후 7일 이내에 실시 하셔야 하며,
				7일이 경과되면 소멸됩니다.<br />
				결제 후 바로 검사가 진행되므로, 결제가 완료된 뒤에는 취소 및 환불이
				불가합니다.<br />
				결제 시 본 프로그램의 특허권, 저작권, 상표권 등의 소유권을 가진
				커리어컴퍼니로 결과가 통보됩니다.
			</p>
		</div>

		<button class="payment-button" @click="handlePayment">결제하기</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const selectedProduct = ref(null);

const fetchProducts = async () => {
	try {
		const response = await axios.get('http://localhost:8080/api/products');
		products.value = response.data;
		console.log(products.value);
		if (products.value.length > 0) {
			selectedProduct.value = products.value[0];
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};

const updatePrice = () => {
	// You can perform any additional logic when the selected product changes
};

const handlePayment = () => {
	const checkoutPopup = window.open(
		'/CheckoutView',
		'_blank',
		'width=800,height=800,resizable=yes',
	);
};

onMounted(() => {
	fetchProducts();
});
</script>

<style lang="scss" scoped>
.payment-container {
	font-family: Arial, sans-serif;
	margin: 20px;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #f9f9f9;
}

h1 {
	color: #333;
}

.program-info,
.important-info {
	margin: 20px 0;
}

.important-info h2 {
	color: red;
	margin-bottom: 10px;
}

button.payment-button {
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

button.payment-button:hover {
	background-color: #0056b3;
}
</style>
