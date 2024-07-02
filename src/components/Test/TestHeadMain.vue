<template>
	<p class="text01 d-flex justify-content-center">
		<span
			class="material-icons"
			style="font-size: 5rem; margin: 5px 10px 5px 5px"
		>
			assignment_turned_in
		</span>
		<span> 검사유의사항 </span>
	</p>
	<p class="text03 text-start px-5">
		옥타그노시스검사를 시작하기 전, 검사의 효과를 높이기 위해 아래 내용을
		꼼꼼하게 읽어주시면 감사하겠습니다.
	</p>

	<div class="checkItem">
		<div>1. 검사 진행시 모든 문항에 솔직하게 답변해주세요</div>
		<div>
			2. 시간 제한이 있는 문항에는 반드시 시간을 엄수해서 답해 주시기 바랍니다.
		</div>
		<div>
			3. 고민이 되거나 어려운 문제가 나올 시 시간을 지체하지 마시고, 생각 속에
			떠오르는 대로 선택해주세요.
		</div>
		<div>
			4. 검사가 시작되면 중간에 멈추지 마시고, 끝까지 한번에 진행해 주세요.
		</div>
		<div>
			5. 검사에 방해가 될 수 있는 휴대전화, 전자기기 등은 무음이나 비행기모드로
			하시고 검사를 진행해 주세요.
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
