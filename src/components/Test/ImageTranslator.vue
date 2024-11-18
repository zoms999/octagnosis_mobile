<template>
	<div class="image-translator">
		<div class="original-image">
			<img :src="imageUrl" :alt="$t('original_image')" ref="originalImage" />
		</div>
		<div v-if="isTranslating" class="translation-loading">
			{{ $t('translating') }}...
		</div>
		<div v-else-if="translatedImageUrl" class="translated-image">
			<img :src="translatedImageUrl" :alt="$t('translated_image')" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { imageTranslationService } from '@/services/imageTranslation';
import { useI18n } from 'vue-i18n';
import html2canvas from 'html2canvas';

const props = defineProps({
	imageUrl: {
		type: String,
		required: true,
	},
});

const { locale } = useI18n();
const originalImage = ref(null);
const translatedImageUrl = ref('');
const isTranslating = ref(false);

const translateImage = async () => {
	try {
		isTranslating.value = true;

		// 1. 이미지에서 텍스트 추출
		const extractedText = await imageTranslationService.extractText(
			props.imageUrl,
		);

		// 2. 추출된 텍스트 번역
		const translatedText = await imageTranslationService.translateText(
			extractedText,
			locale.value === 'ja' ? 'ja' : 'en',
		);

		// 3. 원본 이미지를 캔버스로 변환
		const canvas = await html2canvas(originalImage.value);
		const ctx = canvas.getContext('2d');

		// 4. 번역된 텍스트를 캔버스에 그리기
		ctx.font = '16px Arial';
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, 30); // 텍스트 배경
		ctx.fillStyle = 'black';
		ctx.fillText(translatedText, 10, 20);

		// 5. 캔버스를 이미지로 변환
		translatedImageUrl.value = canvas.toDataURL();
	} catch (error) {
		console.error('Image translation error:', error);
	} finally {
		isTranslating.value = false;
	}
};

// 언어가 변경될 때마다 이미지 번역 실행
watch(() => locale.value, translateImage);

onMounted(() => {
	if (props.imageUrl) {
		translateImage();
	}
});
</script>

<style scoped>
.image-translator {
	position: relative;
}

.translation-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(255, 255, 255, 0.8);
	padding: 10px;
	border-radius: 4px;
}

.original-image img,
.translated-image img {
	max-width: 100%;
	height: auto;
}
</style>
