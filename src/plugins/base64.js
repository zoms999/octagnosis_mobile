import { ref } from 'vue';
import { useBase64 } from '@vueuse/core';

export function useBase64Utils() {
	const base64 = ref('');

	const encodeBase64 = text => {
		try {
			base64.value = btoa(text);
			return base64.value;
		} catch (error) {
			console.error('Failed to encode text:', error);
			return '';
		}
	};

	const decodeBase64 = text => {
		try {
			base64.value = atob(text);
			return base64.value;
		} catch (error) {
			console.error('Failed to decode text:', error);
			return '';
		}
	};

	return {
		encodeBase64,
		decodeBase64,
	};
}
