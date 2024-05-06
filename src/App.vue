<template>
	<MemberJoin></MemberJoin>
	<TheBottom></TheBottom>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TheBottom from './layouts/TheBottom.vue';
import MemberJoin from './views/Member/Register.vue';
</script>
<style scoped></style>
