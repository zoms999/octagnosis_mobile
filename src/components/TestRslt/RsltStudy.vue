<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline" v-html="$t('RsltStudy_1')">
				</p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltStudy_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
				</div>

				<div class="partition">
					<div class="title-wrap">
						<p class="tit v3">{{ $t('RsltStudy_3').replaceAll('000', Props.ListItem.PersnNm) }}</p>
					</div>
					<div class="text-wrap">
						<p>
							<div v-html="Rslt1[0].tnd1_study.replace(/(\r\n|\n|\r)/g, '<br />').replace(/000님/gi, Props.ListItem.PersnNm + '님')"></div>
							<br /><br />

							<div v-html="Rslt1[0].tnd2_study.replace(/(\r\n|\n|\r)/g, '<br />').replace(/000님/gi, Props.ListItem.PersnNm + '님')"></div>
						</p>
					</div>

				</div>

				<div class="chart-wrap d-flex mt-4 border  border-dark-subtle" >
					<div class="p-3 chart1">
						<Doughnut
							id="Chart1"
							 v-if="chartLoadYn"
							:data="ChartData1"
							:options="ChartOptions1"
						/>
					</div>
					<div class="p-3 chart2">
						<Doughnut
							id="Chart2"
							v-if="chartLoadYn"
							:data="ChartData2"
							:options="ChartOptions2"
						/>
					</div>
				</div>
				<div class="partition">
					<div class="title-wrap">
						<p class="tit v3">{{ $t('RsltStudy_3').replaceAll('000', Props.ListItem.PersnNm) }} 1</p>
					</div>
					<div class="text-wrap">
						<p>
							<div v-html="Rslt1[0].tnd1_way.replace(/(\r\n|\n|\r)/g, '<br />').replace(/000님/gi, Props.ListItem.PersnNm + '님')"></div>
						</p>
					</div>
				</div>

				<div class="partition">
					<div class="title-wrap">
						<p class="tit v3">{{ $t('RsltStudy_3').replaceAll('000', Props.ListItem.PersnNm) }} 2</p>
					</div>
					<div class="text-wrap">
						<p>
							<div v-html="Rslt1[0].tnd2_study.replace(/(\r\n|\n|\r)/g, '<br />').replace(/000님/gi, Props.ListItem.PersnNm + '님')"></div>
						</p>
					</div>
				</div>

				<div class="chart-wrap d-flex mt-4 border  border-dark-subtle" >
					<div class="p-3 chart1">
						<Doughnut
							id="Chart3"
							 v-if="chartLoadYn"
							:data="ChartData3"
							:options="ChartOptions3"
						/>
					</div>
					<div class="p-3 chart2">
						<Doughnut
							id="Chart4"
							v-if="chartLoadYn"
							:data="ChartData4"
							:options="ChartOptions4"
						/>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const { vAlert, vSuccess } = useAlert();
ChartJS.register(	ArcElement, Tooltip, Legend );

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltStudy();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{tnd1:'', tnd1_study:'', tnd1_way:'', tnd2_study:'', tnd2_way:'', tndrow:'', tndcol: ''}]);
const Rslt2 = ref({});
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

var ChartData3 = reactive();
var ChartOptions3 = {
	responsive: true,
	maintainAspectRatio: false,
};


var ChartData4 = reactive();
var ChartOptions4 = {
	responsive: true,
	maintainAspectRatio: false,
};


const chartLoadYn = ref(false);

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltStudy: { path: '/api/Test/getRsltStudy', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltStudy.path:
					Procs.value.getRsltStudy.loading = false;

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

const getRsltStudy = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltStudy.path, Parm.value);
};

const setChart = () => {
	var labels1 = [];
	var data1 = [];
	var bgColor1 = [];
	var labels2 = [];
	var data2 = [];
	var bgColor2 = [];
	var labels3 = [];
	var data3 = [];
	var bgColor3 = [];
	var labels4 = [];
	var data4 = [];
	var bgColor4 = [];

	Rslt2.value.forEach(item => {
		labels1.push(`${item.Sname} (${item.Srate}%)`);
		data1.push(item.Srate);
		bgColor1.push(getColor(item.Scolor));
	});

	ChartData1 = {
		labels: labels1,
		datasets: [
			{
				backgroundColor: bgColor1,
				data: data1,
			},
		],
	};

	Rslt3.value.forEach(item => {
		labels2.push(`${item.Sname} (${item.Srate}%)`);
		data2.push(item.Srate);
		bgColor2.push(getColor(item.Scolor));
	});

	ChartData2 = {
		labels: labels2,
		datasets: [
			{
				labels: labels2,
				backgroundColor: bgColor2,
				data: data2,
			},
		],
	};

	Rslt4.value.forEach(item => {
		labels3.push(`${item.Sname} (${item.Srate}%)`);
		data3.push(item.Srate);
		bgColor3.push(getColor(item.Scolor));
	});

	ChartData3 = {
		labels: labels3,
		datasets: [
			{
				labels: labels3,
				backgroundColor: bgColor3,
				data: data3,
			},
		],
	};


	Rslt5.value.forEach(item => {
		labels4.push(`${item.Sname} (${item.Srate}%)`);
		data4.push(item.Srate);
		bgColor4.push(getColor(item.Scolor));
	});

	ChartData4 = {
		labels: labels4,
		datasets: [
			{
				labels: labels4,
				backgroundColor: bgColor4,
				data: data4,
			},
		],
	};




	chartLoadYn.value = true;
};

// Etc  *************************************

const getColor = (color) => {
	switch(color) {
		case 'red':
			return '#f7b2b2'
			case 'blue':
			return '#b2b2ff'
			case 'green':
			return '#b2d9b2'
			case 'olive':
			return '#d9d9b2'
			case 'yellow':
			return '#ffffb2'
	}

}
</script>

<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);

.chart1 {
	width:50%; height:300px;
}
.chart2 {
	width:50%; height:300px;
}
</style>
