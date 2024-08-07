<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline">
					옥타그노시스검사 결과에 따른 <strong>선호도반응</strong>
					검사결과 입니다.
				</p>
				<div class="summary">
					<p class="text">
						{{ Props.ListItem.PersnNm }}님이 옥타그노시스 검사를 통해 분석된
						선호하는 성향을 진단한 결과입니다.
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

				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint">{{ Rslt2[0].rrate1 }}%</strong>의 비율로
					<strong class="txt-mint">{{ Rslt2[0].tdname1 }} </strong>을
					선호하셨습니다.
				</p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0].tdname1 }} </strong> :
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
									<th class="ta-l">직업명</th>
									<th>직무 개요</th>
									<th>주요 업무</th>
									<th>관련 학과</th>
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
				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint">{{ Rslt2[0].rrate2 }}%</strong>의 비율로
					<strong class="txt-mint">{{ Rslt2[0].tdname2 }} </strong>을
					선호하셨습니다.
				</p>

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
								<th class="ta-l">직업명</th>
								<th>직무 개요</th>
								<th>주요 업무</th>
								<th>관련 학과</th>
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

				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint">{{ Rslt2[0].rrate3 }}%</strong>의 비율로
					<strong class="txt-mint">{{ Rslt2[0].tdname3 }} </strong>을
					선호하셨습니다.
				</p>

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
									<th class="ta-l">직업명</th>
									<th>직무 개요</th>
									<th>주요 업무</th>
									<th>관련 학과</th>
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

	labels1.push('전체`');
	data1.push(100);
	labels1.push(`선호반응율 (${Rslt1.value[0].irate}%)`);
	data1.push(Rslt1.value[0].irate);

	labels2.push(`${Rslt2.value[0].tdname1} (${Rslt2.value[0].rrate1}%)`);
	data2.push(Rslt2.value[0].rrate1);
	labels2.push(`${Rslt2.value[0].tdname2} (${Rslt2.value[0].rrate2}%)`);
	data2.push(Rslt2.value[0].rrate2);
	labels2.push(`${Rslt2.value[0].tdname3} (${Rslt2.value[0].rrate3}%)`);
	data2.push(Rslt2.value[0].rrate3);

	ChartData1 = {
		labels: labels1,
		datasets: [
			{
				label: '선호반응률(%)',
				backgroundColor: ['#f1f1f1', '#f87979'],
				data: data1,
			},
		],
	};

	ChartData2 = {
		labels: labels2,

		datasets: [
			{
				label: '선호형',
				backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
				data: data2,
			},
		],
	};

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
