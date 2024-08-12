<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Persn.persnNm }}</p>
				<p class="headline">
					{{ $t('UserInfo_1') }}
				</p>
				<div class="summary">
					<p class="text">
						{{ $t('UserInfo_2').replaceAll('000', Persn.persnNm) }}
					</p>
				</div>

				<div class="layout">
					<div class="item full">
						<p class="tit v1">{{ $t('basic_info') }}</p>

						<div class="trans-tbl v1 mt10">
							<!-- tbody 영역 -->
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('name') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{ Persn.persnNm }}</strong>
										</p>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('sex') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{
												Persn.sex == 'M' ? $t('man') : $t('female')
											}}</strong>
										</p>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('birth') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{
												`${Persn.birthDate.toString().substring(0, 4)}-${Persn.birthDate.toString().substring(4, 6)}-${Persn.birthDate.toString().substring(6, 8)}`
											}}</strong>
										</p>
									</div>
								</div>
							</div>
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('phone') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{ Persn.phone }}</strong>
										</p>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('add_phone') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{ Persn.tel }}</strong>
										</p>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										<p>{{ $t('email') }}</p>
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<p>
											<strong>{{ Persn.email }}</strong>
										</p>
									</div>
								</div>
							</div>
							<!--// tbody 영역 -->
						</div>
					</div>
					<div class="item half">
						<p class="tit v1">{{ $t('basic_info') }}</p>

						<div class="tbl-wrap v1 mt10">
							<table>
								<colgroup>
									<col style="width: 14.5rem" />
									<col />
								</colgroup>
								<tbody>
									<tr>
										<td>{{ $t('academic_group') }}</td>
										<td>
											<strong>{{ Persn.eductNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>{{ $t('school_name') }}</td>
										<td>
											<strong>{{ Persn.scholNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>{{ $t('grade') }}</td>
										<td>
											<strong>{{ Persn.scholGrade }}</strong>
										</td>
									</tr>
									<tr>
										<td>{{ $t('major') }}</td>
										<td>
											<strong>{{ Persn.scholMajor }}</strong>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="item half">
						<p class="tit v1">{{ $t('last_job_info') }}</p>

						<div class="tbl-wrap v1 mt10">
							<table>
								<colgroup>
									<col style="width: 14.5rem" />
									<col />
								</colgroup>
								<tbody>
									<tr>
										<td>{{ $t('occupation') }}</td>
										<td>
											<strong>{{ Persn.jobCdNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>{{ $t('work_name') }}</td>
										<td>
											<strong>{{ Persn.jobNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>{{ $t('what_to_do') }}</td>
										<td>
											<strong>{{ Persn.jobDuty }}</strong>
										</td>
									</tr>
								</tbody>
							</table>
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
	getPersn();
});

// Model / Data  ****************************

const Persn = ref({
	persnId: 0,
	persnNm: '',
	birthDate: '',
	birthYear: '',
	birthMonth: '',
	birthDay: '',
	sex: '',
	phone: '',
	tel: '',
	email: '',
	zip: '',
	addrStret: '',
	addrLotNum: '',
	addr2: '',
	addr3: '',
	educt: '',
	eductStus: '',
	scholNm: '',
	scholMajor: '',
	scholGrade: '',
	job: '',
	jobNm: '',
	jobDuty: '',
	orgId: '',
	eductNm: '',
	eductStusNm: '',
	jobCdNm: '',
});

const Parm = ref({
	persnId: 0,
});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getPersn: { path: '/api/personal/getPersn', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getPersn.path:
					Procs.value.getPersn.loading = false;
					Persn.value = data.value.Persn;
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

const getPersn = () => {
	Parm.value.persnId = Props.ListItem.PersnId;

	execUrl(Procs.value.getPersn.path, Parm.value);
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
