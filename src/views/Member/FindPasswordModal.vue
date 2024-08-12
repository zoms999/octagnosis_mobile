<template>
	<Transition>
		<div v-if="isVisible">
			<div class="modal-backdrop fade show"></div>
			<div
				class="modal fade show d-block"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h3>{{ $t('findPassword') }}</h3>
							<button @click="closeModal" class="close-button">X</button>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label for="userId">{{ $t('username') }}</label>
								<input
									type="text"
									id="userId"
									v-model="userId"
									:placeholder="$t('enterUsername')"
									required
								/>
							</div>
							<div class="form-group">
								<label for="email">{{ $t('email') }}</label>
								<input
									type="email"
									id="email"
									v-model="email"
									:placeholder="$t('Member_15')"
									required
								/>
							</div>
							<p v-if="errorMessage" class="error-message">
								{{ errorMessage }}
							</p>
							<p v-if="successMessage" class="success-message">
								{{ successMessage }}
							</p>
						</div>
						<div class="modal-footer">
							<button @click="findPassword" class="btn btn-primary">
								{{ $t('confirm') }}
							</button>
							<button @click="closeModal" class="btn btn-primary">
								{{ $t('close') }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

defineProps({
	isVisible: {
		type: Boolean,
		required: true,
	},
});

const { t } = useI18n(); // Import translation function
const emits = defineEmits(['close']);

const userId = ref('');
const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const closeModal = () => {
	userId.value = '';
	email.value = '';
	errorMessage.value = '';
	successMessage.value = '';
	emits('close');
};

const findPassword = async () => {
	try {
		// 비밀번호 찾기 API 호출
		const response = await axios.post('/api/member/find-password', {
			userId: userId.value,
			email: email.value,
		});
		if (response.data.success) {
			successMessage.value = t('FindPw_1');
			errorMessage.value = '';
		} else {
			errorMessage.value = t('FindPw_2') + response.data.message;
			successMessage.value = '';
		}
	} catch (error) {
		console.error(error);
		errorMessage.value = t('FindPw_3');
		successMessage.value = '';
	}
};
</script>

<style scoped>
/* 모달 스타일링 */
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}
.v-enter-to,
.v-leave-from {
	opacity: 1;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.close-button {
	background: none;
	border: none;
	font-size: 1.2em;
	cursor: pointer;
}

.modal-body {
	margin-bottom: 20px;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}

.form-group {
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
}

.form-group label {
	margin-bottom: 5px;
	font-weight: bold;
}

.form-group input {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1em;
}

.error-message {
	color: red;
}

.success-message {
	color: green;
}

.btn-confirm,
.btn-close {
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn-confirm {
	background-color: #007bff;
	color: white;
}

.btn-close {
	background-color: #6c757d;
	color: white;
}
</style>
