<template>
	<Transition>
		<div v-if="modelValue">
			<div
				class="modal-backdrop fade __web-inspector-hide-shortcut__ show"
				:class="{
					depth1_back: depth == 1,
					depth2_back: depth == 2,
					depth3_back: depth == 3,
				}"
			></div>

			<div
				class="modal fade show d-block"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				:class="{
					depth1_cont: depth == 1,
					depth2_cont: depth == 2,
					depth3_cont: depth == 3,
				}"
			>
				<div
					class="modal-dialog"
					:style="{ maxWidth: width + 'px !important' }"
				>
					<div class="modal-content">
						<div class="modal-header">
							<slot name="header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">
									{{ title }}
								</h1>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
									@click="$emit('update:modelValue', false)"
								></button>
							</slot>
						</div>
						<div class="modal-body">
							<slot></slot>
						</div>
						<div class="modal-footer" v-if="footer">
							<slot name="actions"> </slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineProps({
	modelValue: Boolean,
	title: {
		type: String,
	},
	width: {
		type: String,
	},
	depth: {
		type: Number,
		default: 1,
	},
	footer: {
		type: Boolean,
		default: true,
	},
});
defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.3s ease;
}
.v-enter-to,
.v-leave-from {
	opacity: 1;
}

.depth1_back {
	z-index: 1055;
}
.depth1_cont {
	z-index: 1056;
}
.depth2_back {
	z-index: 1065;
}
.depth2_cont {
	z-index: 1066;
}
</style>
