<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline">
					옥타그노시스검사 결과에 따른 <strong>적합 직무군</strong>
					입니다.
				</p>
				<div class="summary">
					<p class="text">
						아래 내용은 {{ Props.ListItem.PersnNm }}님에게 적합한 직무군으로
						해당 직무들이 하는 일의 내용과 함께 현재 우리나라 기업들의 부서배치
						현황을 토대로 안내해 드립니다.
					</p>
				</div>

				<div class="hide-mobile">
					<div class="tbl-wrap v2 mt40">
						<table>
							<colgroup>
								<col style="width: 15.138%" />
								<col style="width: 48.166%" />
								<col style="width: 36.697%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">직무명</th>
									<th>직무 개요</th>
									<th>적합 부서</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt1" :key="idx">
									<th class="ta-l">{{ item.JobDutyNm }}</th>
									<td class="ta-l text-start">
										{{ item.Expl }}
									</td>
									<td class="ta-l text-start">
										{{ item.Deprt }}
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
import { onMounted, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltJobDuty();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref({});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltJobDuty: { path: '/api/Test/getRsltJobDuty', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltJobDuty.path:
					Procs.value.getRsltJobDuty.loading = false;
					Rslt1.value = data.value.Rslt1;

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

const getRsltJobDuty = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltJobDuty.path, Parm.value);
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);
</style>
