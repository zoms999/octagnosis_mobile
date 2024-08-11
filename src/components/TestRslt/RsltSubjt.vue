<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline" v-html="$t('RsltSubjt_1')"></p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltSubjt_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
				</div>

				<p class="tit v3 mt20">{{ $t('RsltSubjt_3') }}</p>

				<div class="tbl-wrap v2 mt10">
					<table>
						<colgroup>
							<col style="width: 10%" />
							<col style="width: 10%" />
							<col style="width: 14%" />
							<col style="width: 8%" />
							<col style="width: auto" />
						</colgroup>
						<thead>
							<tr>
								<th>{{ $t('RsltSubjt_5') }}</th>
								<th>{{ $t('RsltSubjt_6') }}</th>
								<th>{{ $t('RsltSubjt_7') }}</th>
								<th>{{ $t('RsltSubjt_8') }}<br />{{ $t('RsltSubjt_9') }}</th>
								<th>{{ $t('RsltSubjt_10') }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in Rslt1" :key="idx">
								<td
									v-if="item.sgroupRowSpan > 0"
									class="vtop"
									:rowspan="item.sgroupRowSpan"
								>
									{{ item.sgroup }}
								</td>
								<td
									v-if="item.schoiceRowSpan > 0"
									class="vtop"
									:rowspan="item.schoiceRowSpan"
								>
									{{ item.schoice }}
								</td>
								<td class="vtop">{{ item.subject }}</td>
								<td class="vtop">{{ item.srank2 }}</td>
								<td class="ta-l text-start">
									{{ item.sexplain }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p class="tit v3 mt40">{{ $t('RsltSubjt_4') }}</p>

				<div class="tbl-wrap v2 mt10">
					<table>
						<colgroup>
							<col style="width: 5%" />
							<col style="width: 10%" />
							<col style="width: 10%" />
							<col style="width: 10%" />
							<col style="width: auto" />
						</colgroup>
						<thead>
							<tr>
								<th>{{ $t('RsltSubjt_9') }}</th>
								<th>{{ $t('RsltSubjt_5') }}</th>
								<th>{{ $t('RsltSubjt_6') }}</th>
								<th>{{ $t('RsltSubjt_7') }}</th>
								<th>{{ $t('RsltSubjt_10') }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in Rslt2" :key="idx">
								<td
									v-if="item.srankRowSpan > 0"
									class="vtop"
									:rowspan="item.srankRowSpan"
								>
									{{ item.srank }}
								</td>
								<td
									v-if="item.sgroupRowSpan > 0"
									class="vtop"
									:rowspan="item.sgroupRowSpan"
								>
									{{ item.sgroup }}
								</td>
								<td class="vtop">{{ item.schoice }}</td>
								<td class="vtop">{{ item.subject }}</td>
								<td class="vtop text-start">
									{{ item.sexplain }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltSubjt();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref({});
const Rslt2 = ref({});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltSubjt: { path: '/api/Test/getRsltSubjt', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltSubjt.path:
					Procs.value.getRsltSubjt.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;

					setRowSpan(Rslt1.value, [
						{ colNm: 'sgroup', spanKey: 'sgroupRowSpan' },
						{ colNm: 'schoice', spanKey: 'schoiceRowSpan' },
					]);

					setRowSpan(Rslt2.value, [
						{ colNm: 'srank', spanKey: 'srankRowSpan' },
						{ colNm: 'sgroup', spanKey: 'sgroupRowSpan' },
					]);

					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const getRsltSubjt = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltSubjt.path, Parm.value);
};

const setRowSpan = (list, cols) => {
	const updateSpan = (col, spanVal, spanIdx, spanCnt, spanKey) => {
		for (let i = 0; i < list.length; i++) {
			if (spanVal !== list[i][col].toString()) {
				spanCnt = 1;
				spanIdx = i;
				spanVal = list[i][col].toString();
				list[i][spanKey] = spanCnt;
			} else {
				list[spanIdx][spanKey] = ++spanCnt;
				list[i][spanKey] = 0;
			}
		}
		return [spanVal, spanIdx, spanCnt];
	};

	cols.forEach(o => {
		updateSpan(o.colNm, '', 0, 0, o.spanKey);
	});
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);

.vtop {
	vertical-align: top !important;
}
</style>
