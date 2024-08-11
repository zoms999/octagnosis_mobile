<template>
	<p class="text01 d-flex justify-content-center">
		<span
			class="material-icons"
			style="font-size: 10rem; margin: 5px 10px 5px 5px"
			>note_alt</span
		>
	</p>
	<div class="text03 text-center p-5">
		<div class="">{{ $t('TestHead_2_1') }}</div>
		<div class="mt-5">{{ $t('TestHead_2_2') }}</div>
	</div>
</template>

<script>
export default {
	setup() {
		return {};
	},
};
</script>

<style scoped>
.text01 {
	font-size: 5rem;
}
.text03 {
	font-size: 5rem;
	margin-bottom: 100px;
}
</style>
