import {ICombinedServerResp, IServerCatsResp} from '@/types';

function changeApiRespObj(apiRawResponse: IServerCatsResp) {
	const newObj: ICombinedServerResp = {
		url: apiRawResponse.image.url,
		id: apiRawResponse.image.id,
		value: apiRawResponse.value,
		serverId: apiRawResponse.id,
	};

	return newObj;
}

export default changeApiRespObj;
