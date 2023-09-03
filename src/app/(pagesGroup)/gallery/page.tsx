'use client';

import {useEffect, useState, useCallback, useMemo} from 'react';

import PageContainer from '@/components/PageContainer';
import BackArrow_Title from '@/components/BackArrow_Title';
import UploadImgButton from '@/components/UploadImgButton';
import GalleryContainer from '@/components/GalleryContainer';
import GalleryGridContainer from '@/components/GalleryGridContainer';

import {ICatCart, MimeContent, Order} from '@/types';
import {useHttp} from '@/hooks/useHttpHook';
import useBreadSearch from '@/hooks/useBreadSearch';

function GalleryPage() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [queryBreed, setQueryBreed] = useState<string>('');
	const [defaultQueryLimit, setQueryLimit] = useState<string>('5');
	const [fetchCartOrder, setFetchCartOrder] = useState<Order>('Random');
	const [mimeType, setMimeType] = useState<MimeContent>('jpeg,png');

	const {request} = useHttp();

	const {breedDataObj, setBreedDataObj} = useBreadSearch();

	const memoBreedDataObj = useMemo(() => {
		return breedDataObj;
	}, [breedDataObj]);

	useEffect(() => {
		const fetchMultipleCatCarts = async (url: string): Promise<void> => {
			setIsLoading(true);
			const cartCarts = await request<ICatCart[]>(url);

			setCatCarts(cartCarts);
			setIsLoading(false);
		};

		const queryParams = {
			limit: defaultQueryLimit,
			breed_ids: queryBreed,
			order: fetchCartOrder,
			mime_types: mimeType,
		};

		type QueryParams = typeof queryParams;

		const queryParamsString = Object.keys(queryParams)
			.map(
				(key: string) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						// @ts-ignore
						queryParams[key].toLowerCase() as keyof QueryParams
					)}`
			)
			.join('&');

		fetchMultipleCatCarts(
			`https://api.thecatapi.com/v1/images/search?${queryParamsString}`
		);
	}, [request, defaultQueryLimit, queryBreed, fetchCartOrder, mimeType]);

	const memorizedSetQueryBreed = useCallback(
		(breed: string) => {
			const breedId = memoBreedDataObj.find(
				(obj) => obj.name.toLocaleLowerCase() === breed
			)?.id;

			if (!breedId) {
				return setQueryBreed('');
			}
			return setQueryBreed(breedId);
		},
		[memoBreedDataObj]
	);
	const memorizedSetFetchCartOrder = useCallback((order: Order) => {
		return setFetchCartOrder(order);
	}, []);
	const memorizedSetMimeType = useCallback(
		(mime: 'all' | 'static' | 'animated') => {
			switch (mime) {
				case 'static':
					return setMimeType('jpeg,png');
				case 'animated':
					return setMimeType('gif');
				case 'all':
					return setMimeType('');
				default:
					break;
			}
			const mimeTypeMimeContent = mime === 'static' ? 'jpeg,png' : 'gif';
		},
		[]
	);
	const memorizedSetQueryLimit = useCallback((limit: string) => {
		return setQueryLimit(parseInt(limit).toString());
	}, []);

	return (
		<PageContainer>
			<BackArrow_Title title='gallery' />
			<UploadImgButton />
			<GalleryContainer
				setQueryBreed={memorizedSetQueryBreed}
				setQueryLimit={memorizedSetQueryLimit}
				setFetchCartOrder={memorizedSetFetchCartOrder}
				setMimeType={memorizedSetMimeType}
			/>
			{isLoading ? (
				<div className='text-3xl text-center bg-peach rounded-xl px-10 w-full h-full'>
					Loading Gallery Grid Container
				</div>
			) : (
				<GalleryGridContainer catCarts={catCarts} />
			)}
		</PageContainer>
	);
}
export default GalleryPage;
