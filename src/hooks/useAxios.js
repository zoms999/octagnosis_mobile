import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
	method: 'get',
};

const defaultOptions = {
	immediate: true,
};

export const useAxios = (url, config = {}, options = { immediate: false }) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);
	let reqUrl = ref(url);

	const { onSuccess, onError, immediate } = {
		...defaultOptions,
		...options,
	};

	const { params } = config;

	const execute = body => {
		//console.log('execute  body- >' + body);
		data.value = null;
		error.value = null;
		loading.value = true;

		axios(unref(reqUrl), {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				reqUrl.value = res.request.responseURL.replace(
					axios.defaults.baseURL,
					'',
				);

				//console.log('execute  then- >' + data.value);
				//console.log('execute  onSuccess- >' + onSuccess);

				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	const execute1 = async body => {
		//console.log('execute  body- >' + body);
		data.value = null;
		error.value = null;
		loading.value = true;

		return await axios(unref(reqUrl), {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				reqUrl.value = res.request.responseURL.replace(
					axios.defaults.baseURL,
					'',
				);

				//console.log('execute  then- >' + data.value);
				//console.log('execute  onSuccess- >' + onSuccess);

				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	const execUrl = async (path, body) => {
		url = path;
		reqUrl.value = path;

		return await execute1(body);
		//execute(body);
	};

	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) {
			execute();
		}
	}

	return {
		response,
		data,
		error,
		loading,
		execute,
		reqUrl,
		execUrl,
	};
};
