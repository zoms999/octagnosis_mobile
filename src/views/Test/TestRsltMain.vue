<template>
	<div class="RsltBox">
		<div class="TabBox">
			<div class="row">
				<div class="col-12">
					<ul class="">
						<li
							v-for="(item, idx) in ShowRsltItems"
							:key="item.id"
							:class="{ active: item.activeYn == 'Y' }"
							@click="goTab(item)"
						>
							{{ item.tit }}
						</li>
					</ul>
				</div>
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

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const router = useRouter();
const { decodeBase64 } = useBase64Utils();
const route = useRoute();

const { acuntId, orgId, turnConnCd, userId, persnNm } =
	storeToRefs(useAuthStore());

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
	{ id: '1', activeYn: 'Y', tit: '개인정보' },
	{ id: '2', activeYn: 'N', tit: '성향진단' },
	{ id: '3', activeYn: 'N', tit: '성향분석' },
	{ id: '4', activeYn: 'N', tit: '사고력' },
	{ id: '5', activeYn: 'N', tit: '성향적합직업학과' },
	{ id: '6', activeYn: 'N', tit: '역량진단' },
	{ id: '7', activeYn: 'N', tit: '역량적합직업학과' },
	{ id: '8', loadYn: 'Y', activeYn: 'N', tit: '학습' },
	{ id: '9', loadYn: 'Y', activeYn: 'N', tit: '교과목' },
	{ id: '10', loadYn: 'Y', activeYn: 'N', tit: '직무' },
	{ id: '11', loadYn: 'Y', activeYn: 'N', tit: '선호도' },
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
	width: 1200px;
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
ul {
	width: 1080px;
	list-style-type: none;
	padding: 0;
}

li {
	width: 150px;
	display: inline-block;
	font-size: 1.6rem;
	padding: 13px 5px 13px 5px;
	border: 1px solid #cacaca;
	margin: 2px;
	text-align: center;
	font-weight: 700;
	background-color: #f0f3f5;
	color: #343a40;
	cursor: pointer;
}

li.active {
	background-color: #3d7aed;
	color: #ffffff;
}
</style>
