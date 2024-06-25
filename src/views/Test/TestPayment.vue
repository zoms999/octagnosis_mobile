<template>
	<div class="payment-container">
		<h1>결제를 진행하여 주십시오.</h1>
		<p>검사자님께서는 아래 선택하신 프로그램으로 진행됨을 알려드립니다.</p>

		<div class="program-info">
			<label for="product-select">검사 프로그램: </label>
			<select
				id="product-select"
				v-model="selectedProductId"
				@change="loadSubProducts"
			>
				<option
					v-for="product in products"
					:key="product.ProdtId"
					:value="product.ProdtId"
				>
					{{ product.ProdtNm }}
				</option>
			</select>
		</div>

		<div class="program-info">
			<label for="sub-product-select">Sub 프로그램: </label>
			<select
				id="sub-product-select"
				v-model="selectedSubProductId"
				@change="updateSelectedSubProduct"
			>
				<option
					v-for="subProduct in subProducts"
					:key="subProduct.ProdtSubId"
					:value="subProduct.ProdtSubId"
				>
					{{ subProduct.ProdtNm }}
				</option>
			</select>
			<span v-if="selectedSubProduct"
				>가격: {{ selectedSubProduct.Price }}원</span
			>
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

		<!-- Modal -->
		<div v-if="showModal" class="modal">
			<div class="modal-content">
				<CheckoutView
					:productId="selectedSubProductId"
					:productName="selectedSubProduct.ProdtNm"
					:productPrice="selectedSubProduct.Price"
					:productType="selectedSubProduct.ProdtType"
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
const subProducts = ref([]);
const selectedProductId = ref(null);
const selectedSubProductId = ref(null);
const selectedProduct = ref(null);
const selectedSubProduct = ref(null);
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

const loadSubProducts = async () => {
	try {
		const response = await axios.get(
			`/api/products/${selectedProductId.value}/subproducts`,
		);
		subProducts.value = response.data.subProducts;
		if (subProducts.value.length > 0) {
			selectedSubProductId.value = subProducts.value[0].ProdtSubId;
			selectedSubProduct.value = subProducts.value[0];
		} else {
			selectedSubProductId.value = null;
			selectedSubProduct.value = null;
		}
	} catch (error) {
		console.error('Error fetching sub-products:', error);
	}
};

const handlePayment = () => {
	if (selectedProduct.value) {
		showModal.value = true;
	}
};

const closeModal = () => {
	showModal.value = false;
};

const updateSelectedSubProduct = () => {
	selectedSubProduct.value = subProducts.value.find(
		sub => sub.ProdtSubId === selectedSubProductId.value,
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

/* Modal Styles */
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
	background-color: #fff;
	padding: 10px;
	border-radius: 8px;
	width: 90%;
	max-width: 750px;
}

.close-button {
	margin-top: 10px;
	padding: 10px 20px;
	font-size: 16px;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.close-button:hover {
	background-color: #0056b3;
}
</style>
