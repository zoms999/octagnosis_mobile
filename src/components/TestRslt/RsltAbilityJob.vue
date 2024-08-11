<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }}</p>
				<p class="headline" v-html="$t('RsltAbilityJob_1')">
					
				</p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltAbilityJob_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
				</div>

				<div class="partition">
					<div class="title-wrap">
						<p class="tit v3">{{ Rslt1[0].tendency }}</p>
					</div>
					<div class="cont-wrap" v-for="(item, idx) in Rslt2" :key="idx">
						<div class="tit-wrap">
							<div class="tit-area">
								<p class="label v1">{{ $t('suggestion') }} {{ idx+1 }}</p>
								<p class="tit v4">{{ item.JobNm }}</p>
							</div>
						</div>
						<div class="card-wrap">
							<div class="card half">
								<div class="card-head"><p>{{ $t('RsltAbilityJob_3') }}</p></div>
								<div class="card-body">
									<p>
										{{ item.Expl }}
									</p>
								</div>
							</div>
							<div class="card half">
								<div class="card-head"><p>{{ $t('RsltAbilityJob_4') }}</p></div>
								<div class="card-body">
									<p>
									<div v-html="item.MainWork"></div>
								</p>
								</div>
							</div>
							<div class="card full">
								<div class="card-head"><p>{{ $t('RsltAbilityJob_5') }}</p></div>
								<div class="card-body">
									<p>
										{{ Rslt3[idx].major }}
									</p>
								</div>
							</div>
						</div>
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
	getRsltAbilityJob();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{ tendency: '', tndjob: '' }]);
const Rslt2 = ref({});
const Rslt3 = ref({});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltAbilityJob: { path: '/api/Test/getRsltAbilityJob', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltAbilityJob.path:
					Procs.value.getRsltAbilityJob.loading = false;

					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;
					Rslt3.value = data.value.Rslt3;

					Rslt2.value.forEach(o => {
						o.MainWork =
							'<ul><li>' +
							o.MainWork.replace(/(\r\n|\n|\r)/g, '</li><li>') +
							'</li></ul>';
					});

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

const getRsltAbilityJob = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltAbilityJob.path, Parm.value);
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
