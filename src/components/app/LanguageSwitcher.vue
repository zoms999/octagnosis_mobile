<!-- src/components/LanguageSwitcher.vue -->
<template>
	<div class="language-switcher">
		<select v-model="selectedLanguage" @change="changeLanguage">
			<option value="en">English</option>
			<option value="ko">한국어</option>
			<option value="ja">日本語</option>
		</select>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/stores/i18n';

const i18nStore = useI18nStore();
const { locale } = useI18n();
const selectedLanguage = ref(i18nStore.language);

const changeLanguage = () => {
	i18nStore.setLanguage(selectedLanguage.value);
	sessionStorage.setItem('language', selectedLanguage.value); // 언어 설정을 세션에 저장
	locale.value = selectedLanguage.value; // i18n의 locale 업데이트
	location.reload();
};
</script>

<style scoped>
.language-switcher {
	margin-left: 20px;
	display: inline-block;
}
</style>
