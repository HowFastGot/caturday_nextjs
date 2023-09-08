import BackArrow_Title from '@/components/BackArrow_Title';
import GalleryGridContainer from '@/components/GalleryGridContainer';
import PageContainer from '@/components/PageContainer';
import {IServerCatsResp} from '@/types';
import changeApiRespObj from '@/utils/changeApiRespObj/changeApiRespObj';

async function LikePage() {
	const rawResp = await fetch(
		'https://api.thecatapi.com/v1/votes?sub_id=yevhen_sk',
		{
			headers: {
				'Content-type': 'application/json',
				'x-api-key':
					(process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY) ?? '',
			},
			cache: 'no-cache',
		}
	);

	if (!rawResp.ok) {
		throw new Error('Error while loading Like page!');
	}

	const likedCatCarts: IServerCatsResp[] = await rawResp.json();
	const changedApiResponse = likedCatCarts
		.map(changeApiRespObj)
		.filter((cart) => cart.value === 1)
		.reverse();

	return (
		<PageContainer>
			<BackArrow_Title title='Likes' />
			<GalleryGridContainer
				catCarts={changedApiResponse}
			></GalleryGridContainer>
		</PageContainer>
	);
}
export default LikePage;
