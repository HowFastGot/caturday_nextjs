import {IPastedImg} from '@/types';
//
function isPastedImgCondition(pastedImgObj: IPastedImg) {
	return pastedImgObj.url.length !== 0;
}

export default isPastedImgCondition;
