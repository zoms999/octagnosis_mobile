<template>
	<div class="RsltBox">
		<div class="TabBox d-flex justify-content-start flex-wrap">
			<div
				v-for="(item, idx) in ShowRsltItems"
				:key="item.id"
				:class="{ active: item.activeYn == 'Y' }"
				@click="goTab(item)"
			>
				{{ item.tit }}
			</div>
		</div>
		<AppError v-if="error" :message="error.message"></AppError>
		<template v-else>
			<div
				v-show="RsltItems[0].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '1').length > 0"
			>
				<UserInfo :ListItem="ListItem"></UserInfo>
			</div>
			<div
				v-show="RsltItems[1].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '2').length > 0"
			>
				<RsltTedcy1 :ListItem="ListItem"></RsltTedcy1>
			</div>
			<div
				v-show="RsltItems[2].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '3').length > 0"
			>
				<RsltTedcy2 :ListItem="ListItem"></RsltTedcy2>
			</div>
			<div
				v-show="RsltItems[3].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '4').length > 0"
			>
				<RsltThink :ListItem="ListItem"></RsltThink>
			</div>
			<div
				v-show="RsltItems[4].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '5').length > 0"
			>
				<RsltTedcyJob :ListItem="ListItem"></RsltTedcyJob>
			</div>
			<div
				v-show="RsltItems[5].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '6').length > 0"
			>
				<RsltAbility :ListItem="ListItem"></RsltAbility>
			</div>
			<div
				v-show="RsltItems[6].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '7').length > 0"
			>
				<RsltAbilityJob :ListItem="ListItem"></RsltAbilityJob>
			</div>
			<div
				v-show="RsltItems[7].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '8').length > 0"
			>
				<RsltStudy :ListItem="ListItem"></RsltStudy>
			</div>
			<div
				v-show="RsltItems[8].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '9').length > 0"
			>
				<RsltSubjt :ListItem="ListItem"></RsltSubjt>
			</div>
			<div
				v-show="RsltItems[9].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '10').length > 0"
			>
				<RsltJobDuty :ListItem="ListItem"></RsltJobDuty>
			</div>
			<div
				v-show="RsltItems[10].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '11').length > 0"
			>
				<RsltPrefer :ListItem="ListItem"></RsltPrefer>
			</div>
		</template>
	</div>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, defineEmits, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useBase64Utils } from '@/plugins/base64.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

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
import { useI18n } from 'vue-i18n';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const router = useRouter();
const { decodeBase64 } = useBase64Utils();
const route = useRoute();

const { acuntId, orgId, turnConnCd, userId, persnNm } =
	storeToRefs(useAuthStore());

const { t } = useI18n(); // Import translation function

// Props / Emit  ****************************

// Hook  ************************************

onMounted(() => {
	ListItem.value = JSON.parse(decodeBase64(route.query.p));
	ListItem.value.PersnId = userId;
	ListItem.value.PersnNm = persnNm;

	switch (ListItem.value.ProdtId) {
		case 6:
		case 7:
		case 8:
			ShowRsltItems.value = RsltItems.value.filter(o =>
				['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].includes(
					o.id,
				),
			);
			break;
		case 9:
			ShowRsltItems.value = RsltItems.value.filter(o =>
				['1', '2', '3', '11'].includes(o.id),
			);
			break;
	}
});

// Model / Data  ****************************

const ListItem = ref();

const RsltItems = ref([
	{ id: '1', activeYn: 'Y', tit: t('rslt_tit1') },
	{ id: '2', activeYn: 'N', tit: t('rslt_tit2') },
	{ id: '3', activeYn: 'N', tit: t('rslt_tit3') },
	{ id: '4', activeYn: 'N', tit: t('rslt_tit4') },
	{ id: '5', activeYn: 'N', tit: t('rslt_tit5') },
	{ id: '6', activeYn: 'N', tit: t('rslt_tit6') },
	{ id: '7', activeYn: 'N', tit: t('rslt_tit7') },
	{ id: '8', activeYn: 'N', tit: t('rslt_tit8') },
	{ id: '9', activeYn: 'N', tit: t('rslt_tit9') },
	{ id: '10', activeYn: 'N', tit: t('rslt_tit10') },
	{ id: '11', activeYn: 'N', tit: t('rslt_tit11') },
]);

const ShowRsltItems = ref([]);

const Modal = ref({
	OrgTurn: false,
});

// Html ref  ********************************

// Axios / Route  ***************************

const { data, error, loading, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/getOrgList':
					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const ShowHide = (type, showHide, acuntId) => {
	switch (type) {
		case 'OrgTurn':
			Modal.value.OrgTurn = showHide;
			OrgId.value = acuntId;
			if (showHide == false) {
				getOrgList(CurPage.value);
			}
			break;
	}
};

const goTab = item => {
	RsltItems.value.forEach(o => {
		if (o.id == item.id) {
			o.activeYn = 'Y';
			// 탭변경
		} else {
			o.activeYn = 'N';
		}
	});
};

// Etc  *************************************
</script>

<style scoped>
.RsltBox {
	width: 1260px;
	padding: 0 0 0 0;
	margin: 10px auto;
}
.TabBox {
	background-color: #ffffff;
	padding: 20px;
	width: 100%;
	margin: 5px 0 5px 0;
	border: 1px solid #cacaca;
}

.TabBox div {
	width: 195px;
	min-height: 60px;
	display: inline-block;
	font-size: 1.6rem;
	padding: 5px 0 0 0;
	border: 1px solid #cacaca;
	margin: 2px;
	text-align: center;
	vertical-align: middle;
	font-weight: 700;
	background-color: #f0f3f5;
	color: #343a40;
	cursor: pointer;
}

.TabBox div.active {
	background-color: #3d7aed;
	color: #ffffff;
}
</style>
