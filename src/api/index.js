import axios from 'axios';

function create(baseURL, options) {
	const instance = axios.create(Object.assign({ baseURL }, options));
	return instance;
}

export const octag = create(`${import.meta.env.VITE_APP_API_URL}/api/`);
// development : http://localhost:5000/api/
// production : http://localhost:5001/api/

export { create };
