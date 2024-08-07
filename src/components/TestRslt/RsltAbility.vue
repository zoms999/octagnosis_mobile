<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline">
					옥타그노시스검사 결과, <strong>핵심역량</strong>은
				</p>
				<div class="summary">
					<div class="ability">
						<div class="type-list mint">
							<dl v-for="(item, idx) in Rslt2" :key="idx">
								<dt>
									<img src="@/assets/img/sub/img_ability.png" alt="" />
								</dt>
								<dd>{{ item.QuestAttrNm }}</dd>
							</dl>
						</div>
					</div>
					<p class="text mt-2">
						옥타그노시스 검사의 역량진단은 인간의 총 60가지 역량 스키마 중에서
						도출합니다.
					</p>
				</div>

				<!-- 20230703 수정: 그래프 영역 삭제 -->

				<div class="partition" v-for="(item, idx) in Rslt2" :key="idx">
					<div class="title-wrap">
						<p class="label v1">핵심역량 {{ idx + 1 }}</p>
						<p class="tit v2">{{ item.QuestAttrNm }}</p>
					</div>
					<div class="text-wrap">
						<p>
							{{ item.Expl.replaceAll('000님', `${Props.ListItem.PersnNm}님`) }}
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
	getRsltAbility();
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
	getRsltAbility: { path: '/api/Test/getRsltAbility', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltAbility.path:
					Procs.value.getRsltAbility.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;

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

const getRsltAbility = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltAbility.path, Parm.value);
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
