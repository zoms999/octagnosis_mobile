<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }}</p>
				<p class="headline" v-html="$t('RsltTedcy2_1')"></p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltTedcy2_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
					<!-- 20230703 수정 -->
				</div>

				<div class="list-wrap v1 mt40">
					<ul>
						<li v-for="(item, idx) in Rslt1" :key="idx">
							<p class="fs180">
								{{ item.ParapCont1 }}
							</p>
						</li>
					</ul>
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
	getRsltTndcy2();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref({});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltTndcy2: { path: '/api/Test/getRsltTndcy2', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltTndcy2.path:
					Procs.value.getRsltTndcy2.loading = false;
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

const getRsltTndcy2 = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltTndcy2.path, Parm.value);
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
