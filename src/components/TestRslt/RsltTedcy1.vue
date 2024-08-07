<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm  }} 님</p>
				<p class="headline">
					옥타그노시스검사 결과에 따른 <strong
						>성향진단 결과</strong
					>
				</p>
				<div class="summary">
					<div class="tendency">
						<div class="item">
							<p class="title mint">나의 성향</p>
							<div class="type-list mint">
								<dl v-for="(item, idx) in Rslt1_1" :key="item.Rk">
									<dt>상위 {{ idx + 1 }}성향</dt>
									<dd>{{ item.QuestAttrNm }}</dd>
								</dl>
							</div>
						</div>
						<div class="item">
							<p class="title orange">나와 잘 안 맞는 성향</p>
							<div class="type-list orange">
								<dl v-for="(item, idx) in Rslt1_2" :key="item.Rk">
									<dt>하위 {{ idx + 1 }}성향</dt>
									<dd>{{ item.QuestAttrNm }}</dd>
								</dl>
							</div>
						</div>
					</div>
					<p class="text mt-3">
						나를 이루는 기둥이 되는 성향 3개를 진단해드렸습니다. 하위성향은
						나와는 잘 안 맞는 성향입니다.
					</p>
				</div>

				<div class="partition" v-for="(item, idx) in Rslt2" :key="item.Rk">
					<div class="title-wrap">
						<p class="label v1">주성향 {{ item.Rk }}</p>
						<p class="tit v2">{{ item.QuestAttrNm }}</p>
					</div>
					<div class="text-wrap"> 
						<p>
							<div v-html="item.Expl.replace(/(\r\n|\n|\r)/g, '<br />').replaceAll('0', Props.ListItem.PersnNm + '님')"></div>
						</p>
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
	getRsltTndcy1();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref({});
const Rslt2 = ref({});

const Rslt1_1 = ref({});
const Rslt1_2 = ref({});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltTndcy1: { path: '/api/Test/getRsltTndcy1', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltTndcy1.path:
					Procs.value.getRsltTndcy1.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;

					Rslt1_1.value = Rslt1.value.filter(o => o.Rk <= 3);
					Rslt1_2.value = Rslt1.value.filter(o => o.Rk >= 13);
					Rslt1_2.value = Rslt1_2.value.sort((a, b) => b.Rk - a.Rk);

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

const getRsltTndcy1 = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltTndcy1.path, Parm.value);
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
