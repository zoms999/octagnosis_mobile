//import { useAlert } from '@/hooks/useAlert';
//const { vAlert, vSuccess } = useAlert();

/* 
const methods = {
	validMaxLen(val, minLen, maxLen, obj) {
		if (val.length < minLen || val.length > maxLen) {
			//vAlert(`${minLen}~${maxLen}자 사이로 입력해주세요.`);
			if (obj != null) {
				obj.focus();
			}
			return false;
		}
		return true;
	},
};
 */
export default {
	install(vue) {
		//vue.config.globalProperties.$validMaxLen = methods.validMaxLen;

		vue.config.globalProperties.$validMaxLen1 = function () {
			return '1';
		};
	},
};
