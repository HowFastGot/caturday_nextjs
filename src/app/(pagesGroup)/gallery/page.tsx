'use client';

import {
	useEffect,
	useState,
	useCallback,
	useMemo,
	useLayoutEffect,
} from 'react';

import PageContainer from '@/components/PageContainer';
import BackArrow_Title from '@/components/BackArrow_Title';
import UploadImgButton from '@/components/UploadImgButton';
import GalleryContainer from '@/components/GalleryContainer';
import GalleryGridContainer from '@/components/GalleryGridContainer';

import {ICatCart, MimeContent, Order} from '@/types';
import {useHttp} from '@/hooks/useHttpHook';
import useBreadSearch from '@/hooks/useBreadSearch';
import srickyContainerChanger from '@/utils/srickyContainerChanger/srickyContainerChanger';

function GalleryPage() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [queryBreed, setQueryBreed] = useState<string>('');
	const [defaultQueryLimit, setQueryLimit] = useState<string>('5');
	const [fetchCartOrder, setFetchCartOrder] = useState<Order>('Random');
	const [mimeType, setMimeType] = useState<MimeContent>('');
	const [numberPage, setNumberPage] = useState<string>('0');

	const {request} = useHttp();

	const {breedDataObj, setBreedDataObj} = useBreadSearch();

	const retriveBreedNames = useMemo(() => {
		return breedDataObj.map((obj) => obj.name);
	}, [breedDataObj]);

	const memoBreedDataObj = useMemo(() => {
		return breedDataObj;
	}, [breedDataObj]);

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
		},
		[]
	);
	const memorizedSetQueryLimit = useCallback((limit: string) => {
		return setQueryLimit(parseInt(limit).toString());
	}, []);

	const memorizedSetNumberPage = useCallback((page: string) => {
		return setNumberPage(page);
	}, []);

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
			page: numberPage,
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
	}, [
		request,
		defaultQueryLimit,
		queryBreed,
		fetchCartOrder,
		mimeType,
		numberPage,
	]);

	useEffect(() => {
		srickyContainerChanger(isLoading);
	}, [isLoading]);

	return (
		<PageContainer>
			<div className='flex items-start justify-between gap-x-2.5'>
				<BackArrow_Title title='gallery' />
				<UploadImgButton />
			</div>
			<GalleryContainer
				breedNames={retriveBreedNames}
				setQueryBreed={memorizedSetQueryBreed}
				setQueryLimit={memorizedSetQueryLimit}
				setFetchCartOrder={memorizedSetFetchCartOrder}
				setMimeType={memorizedSetMimeType}
				setNumberPage={memorizedSetNumberPage}
			/>
			{isLoading ? (
				<div className='text-3xl text-center bg-peach text-white font-black rounded-xl px-10 w-full h-full leading-[300px]'>
					Loading Gallery Grid Container
				</div>
			) : (
				<GalleryGridContainer catCarts={catCarts} />
			)}
		</PageContainer>
	);
}
export default GalleryPage;
