import {ActionCategory, IVotePost} from '@/types';

function generateVoteRequestObj(category: ActionCategory, cartId: string) {
	const requestObj: IVotePost = {
		image_id: cartId,
		sub_id: 'yevhen_sk',
	};

	switch (category) {
		case 'Likes':
			requestObj.value = 1;
			break;
		case 'Dislikes':
			requestObj.value = -1;
			break;
		default:
			break;
	}

	return requestObj;
}
export default generateVoteRequestObj;
