<template>
	<div class="inquiry-board">
		<h1>{{ $t('inquiry.title') }}</h1>
		<form @submit.prevent="submitInquiry">
			<div class="form-group">
				<label for="name">{{ $t('inquiry.form.name') }}</label>
				<input type="text" id="name" v-model="inquiry.name" required />
			</div>
			<div class="form-group">
				<label for="email">{{ $t('inquiry.form.email') }}</label>
				<input type="email" id="email" v-model="inquiry.email" required />
			</div>
			<div class="form-group">
				<label for="subject">{{ $t('inquiry.form.subject') }}</label>
				<input type="text" id="subject" v-model="inquiry.subject" required />
			</div>
			<div class="form-group">
				<label for="message">{{ $t('inquiry.form.message') }}</label>
				<textarea id="message" v-model="inquiry.message" required></textarea>
			</div>
			<button type="submit">{{ $t('inquiry.form.submit') }}</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const inquiry = ref({
	name: '',
	email: '',
	subject: '',
	message: '',
});

const submitInquiry = () => {
	// 여기에 문의 제출 로직을 구현합니다.
	console.log('문의 제출:', inquiry.value);
	// API 호출 또는 다른 처리 로직을 추가할 수 있습니다.
};
</script>

<style scoped>
.inquiry-board {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 5px;
}

input,
textarea {
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

textarea {
	height: 150px;
}

button {
	background-color: #4caf50;
	color: white;
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #45a049;
}
</style>
