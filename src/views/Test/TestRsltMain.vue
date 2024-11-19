<template>
	<div class="results-container">
		<div class="tab-container">
			<button
				v-for="item in showRsltItems"
				:key="item.id"
				:class="{ active: item.activeYn === 'Y' }"
				@click="goTab(item)"
				class="tab-button"
			>
				{{ item.tit }}
			</button>
		</div>

		<div v-if="error" class="error-message">{{ error.message }}</div>

		<template v-else-if="ListItem">
			<component
				:is="currentComponent"
				v-if="currentComponent"
				:ListItem="ListItem"
			></component>
		</template>
		<template v-else>
			<div class="loading">Loading...</div>
		</template>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBase64Utils } from '@/plugins/base64.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';

// Import all result components
import UserInfo from '@/components/TestRslt/UserInfo.vue';
import RsltTedcy1 from '@/components/TestRslt/RsltTedcy1.vue';
import RsltTedcy2 from '@/components/TestRslt/RsltTedcy2.vue';
import RsltThink from '@/components/TestRslt/RsltThink.vue';
import RsltTedcyJob from '@/components/TestRslt/RsltTedcyJob.vue';
import RsltAbility from '@/components/TestRslt/RsltAbility.vue';
import RsltAbilityJob from '@/components/TestRslt/RsltAbilityJob.vue';
import RsltStudy from '@/components/TestRslt/RsltStudy.vue';
import RsltSubjt from '@/components/TestRslt/RsltSubjt.vue';
import RsltJobDuty from '@/components/TestRslt/RsltJobDuty.vue';
import RsltPrefer from '@/components/TestRslt/RsltPrefer.vue';

const { decodeBase64 } = useBase64Utils();
const route = useRoute();
const { userId, persnNm } = storeToRefs(useAuthStore());
const { t } = useI18n();

const ListItem = ref(null);
const error = ref(null);

const rsltItems = ref([
	{ id: '1', activeYn: 'Y', tit: t('rslt_tit1'), component: UserInfo },
	{ id: '2', activeYn: 'N', tit: t('rslt_tit2'), component: RsltTedcy1 },
	{ id: '3', activeYn: 'N', tit: t('rslt_tit3'), component: RsltTedcy2 },
	{ id: '4', activeYn: 'N', tit: t('rslt_tit4'), component: RsltThink },
	{ id: '5', activeYn: 'N', tit: t('rslt_tit5'), component: RsltTedcyJob },
	{ id: '6', activeYn: 'N', tit: t('rslt_tit6'), component: RsltAbility },
	{ id: '7', activeYn: 'N', tit: t('rslt_tit7'), component: RsltAbilityJob },
	{ id: '8', activeYn: 'N', tit: t('rslt_tit8'), component: RsltStudy },
	{ id: '9', activeYn: 'N', tit: t('rslt_tit9'), component: RsltSubjt },
	{ id: '10', activeYn: 'N', tit: t('rslt_tit10'), component: RsltJobDuty },
	{ id: '11', activeYn: 'N', tit: t('rslt_tit11'), component: RsltPrefer },
]);

const showRsltItems = computed(() => {
	if (ListItem.value?.ProdtId === 9) {
		return rsltItems.value.filter(o => ['1', '2', '3', '11'].includes(o.id));
	}
	return rsltItems.value;
});

const currentComponent = computed(() => {
	const activeItem = showRsltItems.value.find(item => item.activeYn === 'Y');
	return activeItem ? activeItem.component : null;
});

onMounted(() => {
	try {
		const decodedData = JSON.parse(decodeBase64(route.query.p));
		ListItem.value = {
			...decodedData,
			PersnId: userId.value || '',
			PersnNm: persnNm.value || '',
		};
	} catch (err) {
		console.error('Failed to parse route data:', err);
		error.value = { message: 'Failed to parse route data' };
		ListItem.value = { PersnId: '', PersnNm: '' };
	}
});

watch([userId, persnNm], ([newUserId, newPersnNm]) => {
	if (ListItem.value) {
		ListItem.value.PersnId = newUserId || '';
		ListItem.value.PersnNm = newPersnNm || '';
	}
});

const goTab = item => {
	rsltItems.value.forEach(o => {
		o.activeYn = o.id === item.id ? 'Y' : 'N';
	});
};
</script>

<style scoped>
.results-container {
	padding: 1rem;
	max-width: 100%;
	margin: 0 auto;
}

.tab-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.tab-button {
	flex: 1 1 calc(50% - 0.5rem);
	min-height: 3rem;
	font-size: 0.9rem;
	padding: 0.5rem;
	border: 1px solid #cacaca;
	background-color: #f0f3f5;
	color: #343a40;
	font-weight: 700;
	text-align: center;
	cursor: pointer;
}

.tab-button.active {
	background-color: #3d7aed;
	color: #ffffff;
}

.error-message {
	color: red;
	text-align: center;
	padding: 1rem;
}

.loading {
	text-align: center;
	padding: 1rem;
	font-style: italic;
	color: #666;
}

@media (min-width: 768px) {
	.tab-button {
		flex: 1 1 calc(33.33% - 0.5rem);
	}
}
</style>
