<template>
	<div
		class="celebration-wrap"
		style="border: 0px !important; padding: 0px 0px 0px 0px"
	>
		<img src="@/assets/img/sub/img_congratulation.png" alt="" />
		<p class="text01">{{ $t('TestHeadComplete_1') }}</p>
		<p class="text02">
			{{ $t('TestHeadComplete_2') }}
		</p>
		<div class="guide-wrap">
			<p v-html="$t('TestHeadComplete_3')"></p>
		</div>
		<p class="text03" v-html="$t('TestHeadComplete_4')"></p>
		<ul>
			<li>
				<div class="title-wrap">
					<p class="title line1">{{ $t('TestHeadComplete_5') }}</p>
					<img src="@/assets/img/sub/img_elementary.png" alt="" />
				</div>
				<ul v-html="$t('TestHeadComplete_6')"></ul>
			</li>
			<li>
				<div class="title-wrap">
					<p class="title line1">{{ $t('TestHeadComplete_7') }}</p>
					<img src="@/assets/img/sub/img_middle.png" alt="" />
				</div>
				<ul v-html="$t('TestHeadComplete_8')"></ul>
			</li>
			<li>
				<div class="title-wrap">
					<p class="title line1">{{ $t('TestHeadComplete_9') }}</p>
					<img src="@/assets/img/sub/img_high.png" alt="" />
				</div>
				<ul v-html="$t('TestHeadComplete_10')"></ul>
			</li>
			<li>
				<div class="title-wrap">
					<p class="title line1">{{ $t('TestHeadComplete_11') }}</p>
					<img src="@/assets/img/sub/img_college.png" alt="" />
				</div>
				<ul v-html="$t('TestHeadComplete_12')"></ul>
			</li>
			<li>
				<div class="title-wrap">
					<p class="title line1">{{ $t('TestHeadComplete_13') }}</p>
					<img src="@/assets/img/sub/img_adult.png" alt="" />
				</div>
				<ul v-html="$t('TestHeadComplete_14')"></ul>
			</li>
		</ul>
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
.line1 {
	line-height: 2.8rem;
	min-height: 56px;
}
</style>
