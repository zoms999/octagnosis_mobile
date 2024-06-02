<template>
	<div class="test-page">
		<header class="header">
			<div class="welcome">이름 님 환영합니다.</div>
			<div class="actions">
				<button class="btn">정보수정</button>
				<button class="btn">로그아웃</button>
			</div>
		</header>
		<main class="main">
			<table class="test-table">
				<thead>
					<tr>
						<th>순번</th>
						<th>검사상품</th>
						<th>검사 유효일자</th>
						<th>검사완료일자</th>
						<th>검사상태</th>
						<th>결과보기</th>
					</tr>
				</thead>
				<tbody>
					<!-- 여기에 데이터를 반복 렌더링 할 수 있습니다 -->
					<tr>
						<td>1</td>
						<td>적성검사 A</td>
						<td>2024-12-31</td>
						<td>2024-06-01</td>
						<td><button class="btn">검사진행</button></td>
						<td><button class="btn">결과보기</button></td>
					</tr>
					<!-- 추가적인 행들은 여기서 반복 -->
				</tbody>
			</table>
		</main>
		<footer class="footer">
			검사결과 '다시 보기'는 유효일자 안에서만 가능합니다.
		</footer>
	</div>
</template>

<script setup>
// JavaScript 코드는 여기서 추가 가능합니다.
</script>

<style lang="scss" scoped>
.test-page {
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	.header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;

		.welcome {
			font-size: 1.2rem;
		}

		.actions {
			.btn {
				margin-left: 0.5rem;
			}
		}
	}

	.main {
		flex: 1;
		padding: 1rem;

		.test-table {
			width: 100%;
			border-collapse: collapse;

			th,
			td {
				border: 1px solid #ccc;
				padding: 0.5rem;
				text-align: center;
			}

			th {
				background-color: #e9e9e9;
			}

			.btn {
				padding: 0.25rem 0.5rem;
				cursor: pointer;
			}
		}
	}

	.footer {
		padding: 1rem;
		background-color: #f5f5f5;
		border-top: 1px solid #ccc;
		text-align: center;
		font-size: 0.9rem;
	}
}
</style>
