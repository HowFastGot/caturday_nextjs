'use client';

import {useEffect, useState} from 'react';

import PageContainer from '@/components/PageContainer';
import BackArrow_Title from '@/components/BackArrow_Title';
import GridContainer from '@/components/GridContainer';
import UploadImgButton from '@/components/UploadImgButton';
import GalleryContainer from '@/components/GalleryContainer';

import {ICatCart} from '@/types';
import {useHttp} from '@/hooks/useHttpHook';

function GalleryPage() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [queryBreed, setQueryBreed] = useState<string>('');
	const [defaultQueryCatCartsLimit, setQueryCatCartsLimit] =
		useState<string>('5');

	const {request} = useHttp();

	useEffect(() => {
		const fetchMultipleCatCarts = async (url: string): Promise<void> => {
			const cartCarts = await request<ICatCart[]>(url);

			setCatCarts(cartCarts);
			setIsLoading(false);
		};

		fetchMultipleCatCarts(
			`https://api.thecatapi.com/v1/images/search?limit=${defaultQueryCatCartsLimit}&breed_ids=${queryBreed}`
		);
	}, [request, defaultQueryCatCartsLimit, queryBreed]);

	return (
		<PageContainer>
			<BackArrow_Title title='gallery' />
			<UploadImgButton />

			<GalleryContainer />
			<GridContainer catCarts={catCarts} isGalleryPage={true} />
		</PageContainer>
	);
}
export default GalleryPage;
