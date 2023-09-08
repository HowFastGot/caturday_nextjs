import {IServerFeedback, IUserAction} from '@/types';

function changeUserActionObj(
	prevUserActionObj: IUserAction,
	serverResponse?: IServerFeedback
): IUserAction {
	const newActionObj: IUserAction = {
		...prevUserActionObj,
		voteId: serverResponse!.id,
	};

	return newActionObj;
}
export default changeUserActionObj;
