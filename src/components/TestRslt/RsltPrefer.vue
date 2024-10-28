<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }}</p>
				<p class="headline" v-html="$t('RsltPrefer_1')"></p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltPrefer_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
				</div>

				<div class="chart-wrap d-flex">
					<div class="p-3 chart1">
						<Bar
							id="Chart1"
							v-if="chartLoadYn"
							:data="ChartData1"
							:options="ChartOptions1"
						/>
					</div>
					<div class="p-3 chart2">
						<Bar
							id="Chart2"
							v-if="chartLoadYn"
							:data="ChartData2"
							:options="ChartOptions2"
						/>
					</div>
				</div>

				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0] == null ? '-' : Rslt2[0].tdname1)
							.replaceAll('RATE', Rslt2[0] == null ? '-' : Rslt2[0].rrate1)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname1 }} </strong> :
					{{ Rslt2[0].exp1 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
									<th>{{ $t('RsltPrefer_5') }}</th>
									<th>{{ $t('RsltPrefer_6') }}</th>
									<th>{{ $t('RsltPrefer_7') }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt3" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0] == null ? '-' : Rslt2[0].tdname2)
							.replaceAll('RATE', Rslt2[0] == null ? '-' : Rslt2[0].rrate2)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0].tdname2 }} </strong> :
					{{ Rslt2[0].exp2 }}
				</p>

				<div class="tbl-wrap v2">
					<table>
						<colgroup>
							<col style="width: 10.092%" />
							<col style="width: 32.111%" />
							<col style="width: 32.111%" />
							<col style="width: 25.688%" />
						</colgroup>
						<thead>
							<tr>
								<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
								<th>{{ $t('RsltPrefer_5') }}</th>
								<th>{{ $t('RsltPrefer_6') }}</th>
								<th>{{ $t('RsltPrefer_7') }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in Rslt4" :key="idx">
								<td class="va-t ta-l">{{ item.JobNm }}</td>
								<td class="va-t ta-l">
									{{ item.Expl }}
								</td>
								<td class="va-t ta-l">
									{{ item.MainWork }}
								</td>
								<td class="va-t ta-l">
									{{ item.major }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0].tdname3)
							.replaceAll('RATE', Rslt2[0].rrate3)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0].tdname3 }} </strong> :
					{{ Rslt2[0].exp3 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
									<th>{{ $t('RsltPrefer_5') }}</th>
									<th>{{ $t('RsltPrefer_6') }}</th>
									<th>{{ $t('RsltPrefer_7') }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt5" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed, watch, reactive } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { Bar, Radar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
} from 'chart.js';
import { useI18n } from 'vue-i18n';

const { vAlert, vSuccess } = useAlert();
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
);
const { t } = useI18n(); // Import translation function

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltPrefer();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{ tcnt: '0', cnt: '0', irate: '0' }]);
const Rslt2 = ref([
	{
		tdname1: '',
		qcnt1: '',
		rrate1: '',
		tdname2: '',
		qcnt2: '',
		rrate2: '',
		tdname3: '',
		qcnt3: '',
		rrate3: '',
		exp1: '',
		exp2: '',
		exp: '',
	},
]);
const Rslt3 = ref({});
const Rslt4 = ref({});
const Rslt5 = ref({});

// chartData와 chartOptions 상태 정의
var ChartData1 = reactive();
var ChartOptions1 = {
	responsive: true,
	maintainAspectRatio: false,
};

var ChartData2 = reactive();
var ChartOptions2 = {
	responsive: true,
	maintainAspectRatio: false,
};

const chartLoadYn = ref(false);

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltPrefer: { path: '/api/Test/getRsltPrefer', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltPrefer.path:
					Procs.value.getRsltPrefer.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;
					Rslt3.value = data.value.Rslt3;
					Rslt4.value = data.value.Rslt4;
					Rslt5.value = data.value.Rslt5;

					setChart();

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

const getRsltPrefer = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltPrefer.path, Parm.value);
};

const setChart = () => {
	var labels1 = [];
	var data1 = [];
	var labels2 = [];
	var data2 = [];

	labels1.push(t('RsltPrefer_8'));
	data1.push(100);
	labels1.push(`${t('RsltPrefer_9')} (${Rslt1.value[0].irate}%)`);
	data1.push(Rslt1.value[0].irate);

	ChartData1 = {
		labels: labels1,
		datasets: [
			{
				label: t('RsltPrefer_9') + '(%)',
				backgroundColor: ['#f1f1f1', '#f87979'],
				data: data1,
			},
		],
	};

	if (Rslt2.value[0] != null) {
		labels2.push(`${Rslt2.value[0].tdname1} (${Rslt2.value[0].rrate1}%)`);
		data2.push(Rslt2.value[0].rrate1);
		labels2.push(`${Rslt2.value[0].tdname2} (${Rslt2.value[0].rrate2}%)`);
		data2.push(Rslt2.value[0].rrate2);
		labels2.push(`${Rslt2.value[0].tdname3} (${Rslt2.value[0].rrate3}%)`);
		data2.push(Rslt2.value[0].rrate3);

		ChartData2 = {
			labels: labels2,

			datasets: [
				{
					label: t('RsltPrefer_10'),
					backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
					data: data2,
				},
			],
		};
	}
	chartLoadYn.value = true;
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);

.chart1 {
	width: 40%;
	height: 300px;
}
.chart2 {
	width: 60%;
	height: 300px;
}
</style>
