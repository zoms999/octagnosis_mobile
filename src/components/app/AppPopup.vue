<template>
	<div></div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';

const windowRef = ref(null);
const emit = defineEmits(['onClose', 'onRecvEvtFromWinPop']);

const openWinPop = (uri, width, height) => {
	if (windowRef.value != null) {
		closeWinPop();
	}

	const left = screen.width ? (screen.width - width) / 2 : 0;
	const top = screen.height ? (screen.height - height) / 2 : 0;

	const attr = `top=${top}, left=${left}, width=${width}, height=${height}, resizable=no,status=no`;

	windowRef.value = window.open(uri, '', attr);
	if (windowRef.value != null) {
		windowRef.value.addEventListener('beforeunload', evtClose);
	} else {
		alert('window.open fail!!!');
	}

	window.addEventListener('message', recvEvtFromChild, false);
};

const closeWinPop = () => {
	if (windowRef.value) {
		windowRef.value.close();
		windowRef.value = null;
	}
};

const evtClose = () => {
	if (windowRef.value) {
		windowRef.value.close();
		windowRef.value = null;
		emit('onClose');
	}
};

/**
const sendEvtToChild = evt => {
	if (!common.isValidObj(windowRef.value)) {
		return;
	}
	if (g_winPopup == null) {
		return;
	}

	g_winPopup.calledFromOpener(evt);
};
 */

const recvEvtFromChild = evt => {
	console.log('recvEvtFromChild......');
	console.log(evt.data);

	if (evt.data == null) {
		return;
	}
	const recvObj = JSON.parse(evt.data);

	emit('onRecvEvtFromWinPop', recvObj);
};

onMounted(() => {
	// any necessary onMounted code
});
</script>

<style scoped></style>
