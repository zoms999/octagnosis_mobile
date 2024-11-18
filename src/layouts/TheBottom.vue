<template>
	<footer class="footer">
		<div class="footer-content">
			<div class="logo-container">
				<img
					src="/src/assets/img/common/logo_footer.png"
					alt="Footer Logo"
					class="footer-logo"
				/>
			</div>
			<div class="info-container">
				<div class="copyright">
					Copyright 1999. 한국진로적성센터. All rights reserved.
				</div>
				<div class="company">
					<p class="site">www.aptitude-x.com</p>
					<p class="phone">02. 523. 7523</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
// No additional script needed for this component
</script>

<style scoped>
.footer {
	background-color: #28313d;
	padding: 1.5rem 1rem;
	width: 100%;
}

.footer-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.logo-container {
	margin-bottom: 1rem;
}

.footer-logo {
	max-width: 100%;
	height: auto;
}

.info-container {
	color: #ffffff;
	font-size: 0.875rem;
	line-height: 1.5;
}

.copyright {
	margin-bottom: 0.5rem;
}

.company {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.site,
.phone {
	margin: 0;
}

@media (min-width: 480px) {
	.footer-content {
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
	}

	.logo-container {
		margin-right: 1.5rem;
		margin-bottom: 0;
	}

	.info-container {
		text-align: left;
	}

	.company {
		align-items: flex-start;
	}
}
</style>
