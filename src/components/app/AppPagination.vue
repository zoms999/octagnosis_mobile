<template>
	<nav aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevBlock">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Previous"
					@click.prevent="GoPage((CurBlock - 1) * RowCntInPage - 1)"
				>
					<span class="material-icons fs110"> first_page </span>
				</a>
			</li>
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Previous"
					@click.prevent="GoPage(CurPage - 1)"
				>
					<span class="material-icons fs110"> navigate_before </span>
				</a>
			</li>
			<li
				v-for="page in pageCnt"
				:key="page"
				class="page-item"
				:class="{ active: (CurBlock - 1) * PageCntInBlock + page == CurPage }"
			>
				<a
					class="page-link pt-2 pb-1 px-3"
					href="#"
					@click.prevent="
						(CurBlock - 1) * PageCntInBlock + page != CurPage
							? GoPage((CurBlock - 1) * PageCntInBlock + page)
							: ''
					"
					>{{ (CurBlock - 1) * PageCntInBlock + page }}</a
				>
			</li>

			<li class="page-item" :class="isNextPage">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Next"
					@click.prevent="GoPage(CurPage + 1)"
				>
					<span class="material-icons fs110"> navigate_next </span>
				</a>
			</li>

			<li class="page-item" :class="isNextBlock">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Next"
					@click.prevent="GoPage(CurBlock * PageCntInBlock + 1)"
				>
					<span class="material-icons fs110"> last_page </span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	// 현제 페이지
	CurPage: {
		type: Number,
		required: true,
	},
	// 현제 블럭
	CurBlock: {
		type: Number,
		required: true,
	},
	// 총 레코드수
	TotCnt: {
		type: Number,
		required: true,
	},
	// 한페이지당 Row 개수
	RowCntInPage: {
		type: Number,
		required: true,
	},
	// 한 블럭당 페이지 개수
	PageCntInBlock: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(['page']);

// 한블럭내의 페이지 개수
const pageCnt = computed(() => {
	var restPageCnt =
		Math.ceil(props.TotCnt / props.RowCntInPage) % props.PageCntInBlock;
	if (props.TotCnt == 0) {
		return 0;
	} else if (props.CurBlock < totBlockCnt.value || restPageCnt == 0) {
		return props.PageCntInBlock;
	} else {
		return restPageCnt;
	}
});

// 총블럭내의 페이지 개수
const totBlockCnt = computed(() => {
	return Math.ceil(props.TotCnt / (props.RowCntInPage * props.PageCntInBlock));
});

const isPrevBlock = computed(() => {
	return { disabled: props.CurBlock == 1 };
});

const isPrevPage = computed(() => {
	return { disabled: props.CurPage == 1 };
});
const isNextPage = computed(() => {
	return {
		disabled: !(props.CurPage < Math.ceil(props.TotCnt / props.RowCntInPage)),
	};
});

const isNextBlock = computed(() => {
	return { disabled: !(props.CurBlock < totBlockCnt.value) };
	//return { disabled: true };
});

const GoPage = no => {
	//console.log('no : ', no);
	emit('page', no);
};
</script>

<style lang="scss" scoped></style>
