<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline" v-html="$t('RsltJobDuty_1')"></p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltJobDuty_2').replaceAll('000', Props.ListItem.PersnNm) }}
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
									<th class="ta-l">{{ $t('RsltJobDuty_3') }}</th>
									<th>{{ $t('RsltJobDuty_4') }}</th>
									<th>{{ $t('RsltJobDuty_5') }}</th>
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
