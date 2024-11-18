<template>
	<div class="mobile-test-head">
		<div class="header">
			<div class="category">{{ $t('category') }}</div>
			<div class="step-container">
				<div class="step" :class="{ 'current-step': props.isCurrentStep }">
					{{ $t('step') }}
				</div>
				<div class="step-title">{{ $t('stepTitle') }}</div>
			</div>
		</div>

		<div class="content">
			<p class="main-text">
				<CheckCircleIcon class="icon" />
				<span>{{ $t('TestHeadMain_1') }}</span>
			</p>
			<p class="sub-text">
				{{ $t('TestHeadMain_2') }}
			</p>

			<div class="check-list">
				<div v-for="i in 5" :key="i" class="check-item">
					{{ $t(`TestHeadMain_${i + 2}`) }}
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="timer">
				<ClockIcon class="icon" />
				<span>{{ formattedTime }}</span>
			</div>
			<div class="question-count">
				<span>{{ $t('questionCount') }}</span>
				<strong>{{ props.currentQuestion }}</strong> /
				{{ props.totalQuestions }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { CheckCircleIcon, ClockIcon } from 'lucide-vue-next';

// props 정의 추가
const props = defineProps({
	isCurrentStep: {
		type: Boolean,
		default: true,
	},
	currentQuestion: {
		type: Number,
		default: 1,
	},
	totalQuestions: {
		type: Number,
		default: 10,
	},
	timeRemaining: {
		type: Number,
		default: 3600,
	},
});

// ref 대신 props 사용
const formattedTime = computed(() => {
	const minutes = Math.floor(props.timeRemaining / 60);
	const seconds = props.timeRemaining % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.mobile-test-head {
	font-family: 'Noto Sans KR', sans-serif;
	max-width: 100%;
	margin: 0 auto;
	padding: 1rem;
	background-color: #f8f9fa;
}

.header {
	background-color: #0d4f8a;
	color: #ffffff;
	padding: 1rem;
	border-radius: 0.5rem;
}

.category {
	background-color: #1db1ad;
	display: inline-block;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
}

.step-container {
	display: flex;
	align-items: center;
	margin-top: 0.5rem;
}

.step {
	border: 1px solid #ffffff;
	border-radius: 1rem;
	padding: 0.25rem 0.75rem;
	font-size: 0.875rem;
	margin-right: 0.5rem;
}

.current-step {
	background-color: #28a745;
}

.step-title {
	font-size: 1rem;
	font-weight: 600;
}

.content {
	padding: 1rem 0;
}

.main-text {
	display: flex;
	align-items: center;
	font-size: 1.25rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
}

.icon {
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.5rem;
}

.sub-text {
	font-size: 0.875rem;
	color: #6c757d;
	margin-bottom: 1rem;
}

.check-list {
	background-color: #ffffff;
	border-radius: 0.5rem;
	padding: 1rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.check-item {
	font-size: 1rem;
	padding: 0.5rem 0;
	border-bottom: 1px solid #e9ecef;
}

.check-item:last-child {
	border-bottom: none;
}

.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	padding: 0.5rem;
	background-color: #e9ecef;
	border-radius: 0.5rem;
}

.timer {
	display: flex;
	align-items: center;
	font-size: 0.875rem;
}

.question-count {
	font-size: 0.875rem;
}

.question-count strong {
	color: #0d4f8a;
	font-weight: 600;
}
</style>
