<template>
	<div class="row g-3">
		<div v-for="(item, index) in items" :key="index" :class="colClass">
			<slot :item="item" :index="index"></slot>
		</div>
	</div>
</template>

<script setup>
defineProps({
	items: {
		type: Array,
		required: true,
	},
	colClass: {
		type: String,
		default: 'col-4',
	},
});
</script>

<style lang="scss" scoped>
/* 스타일은 필요에 따라 조정 가능합니다 */
.row {
	margin-left: -0.5rem;
	margin-right: -0.5rem;
}

.col {
	padding: 0.5rem;
}
</style>
