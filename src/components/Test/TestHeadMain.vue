<template>
	<p class="text01 d-flex justify-content-center">
		<span
			class="material-icons"
			style="font-size: 5rem; margin: 5px 10px 5px 5px"
		>
			assignment_turned_in
		</span>
		<span> {{ $t('TestHeadMain_1') }} </span>
	</p>
	<p class="text03 text-start px-5">
		{{ $t('TestHeadMain_2') }}
	</p>

	<div class="checkItem">
		<div>{{ $t('TestHeadMain_3') }}</div>
		<div>
			{{ $t('TestHeadMain_4') }}
		</div>
		<div>
			{{ $t('TestHeadMain_5') }}
		</div>
		<div>
			{{ $t('TestHeadMain_6') }}
		</div>
		<div>
			{{ $t('TestHeadMain_7') }}
		</div>
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
.logo {
	width: 200px;
}
.quest {
	width: 1300px;
	padding: 20px 30px 20px 30px;
	margin: auto;
}
.bottom {
	padding: 10px 20px 20px 20px;
	text-align: right;
	font-size: 1.5rem;
	cursor: pointer;
}
.time1 {
	background-color: rgb(100, 100, 100);
	font-size: 2rem;
	color: white;
	border-radius: 10px;
	height: 80px;
	padding: 10px;
}
.progress {
	background-color: silver;
	height: 38px;
}
.bar {
	width: 40px;
	height: 38px;
}
.btnNext {
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 12px 50px 10px 60px;
	height: 60px;
	border-radius: 30px;
	flex: unset;
}

.examine-head {
	background-color: #0d4f8a;
	color: #ffffff;
	height: 100px;
	padding: 0;
}

.category {
	background-color: #1db1ad;
	color: #ffffff;
	margin: 20px 0 0 20px;
	font-size: 1.8rem;
	padding: 10px 60px 10px 60px;
	border-radius: 10px;
}

.step {
	border: 1px solid #ffffff;
	border-radius: 30px;
	font-size: 1.4rem;
	font-weight: 500;
	margin: 30px 0 0 50px;
	padding: 5px 30px 0px 30px;
	height: 50px;
}
.curStep {
	background-color: green;
}

.stepTit {
	border: 0;
	border-radius: 20px;
	font-size: 1.7rem;
	font-weight: 600;
	margin: 22px 0 0 0px;
	padding: 10px 30px 0px 20px;
}
.timer {
	margin: 35px 10px 0 0;
}
.timer img {
	width: 40px;
}
.questNum {
	margin: 30px 0 0 0;
	font-size: 1.7rem;
}
.questNum strong {
	color: #ffd62c;
}

.checkItem {
	margin: 10px 0 0 0;
	padding: 10px 10px 10px 30px;
	font-size: 2.5rem;
	font-weight: 500;
}
.checkItem div {
	padding: 5px 30px 10px 30px;
}
</style>
