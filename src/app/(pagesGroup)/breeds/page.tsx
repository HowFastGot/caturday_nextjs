'use client';

import {useState, useEffect, useRef, useCallback, useMemo} from 'react';

import PageContainer from '@/components/PageContainer';
import GridContainer from '@/components/GridContainer';
import BackArrow_Title from '@/components/BackArrow_Title';
import BreedsSelect from '@/components/BreedsSelect';
import LimitSelect from '@/components/LimitSelect';

import {useHttp} from '@/hooks/useHttpHook';
import useBreadSearch from '@/hooks/useBreadSearch';

import {ICatCart} from '@/types';

interface IBtnRef {
	current: HTMLButtonElement;
}

function Breeds() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [catCartsOrder, setCatCartsOrder] = useState<ICatCart[]>([]);
	const [queryBreed, setQueryBreed] = useState<string>('');
	const [defaultQueryCatCartsLimit, setQueryCatCartsLimit] =
		useState<string>('5');
	const [isLoading, setIsLoading] = useState(false);

	const descButtonRef: IBtnRef = useRef() as IBtnRef;
	const incButtonRef: IBtnRef = useRef() as IBtnRef;

	const {request} = useHttp();
	const {breedDataObj, setBreedDataObj} = useBreadSearch();

	const rollBackDefaultBtnStyle = (
		btnRef: IBtnRef,
		bgActiveImgClass: 'bg-b_a_red_icon' | 'bg-a_b_red_icon',
		bgDefaultImgClass: 'bg-a_b_icon' | 'bg-b_a_icon'
	) => {
		btnRef.current.classList.remove('sort_active');
		btnRef.current.children[0].classList.remove(bgActiveImgClass);

		btnRef.current.children[0].classList.add(bgDefaultImgClass);
	};

	const changeButtonsActiveState = (orderProp: 'inc' | 'desc') => {
		switch (orderProp) {
			case 'desc':
				descButtonRef.current.classList.add('sort_active');
				incButtonRef.current.classList.remove('sort_active');

				// Меняем фоновую картинку
				descButtonRef.current.children[0].classList.add('bg-a_b_red_icon');
				descButtonRef.current.children[0].classList.remove('bg-a_b_icon');

				// Возвращаем вид по умолчанию для соседней кнопки сортировки
				rollBackDefaultBtnStyle(incButtonRef, 'bg-b_a_red_icon', 'bg-b_a_icon');

				break;

			case 'inc':
				// Добавляем outline
				incButtonRef.current.classList.add('sort_active');
				// Убираем outline
				descButtonRef.current.classList.remove('sort_active');

				// Меняем фоновую картинку
				incButtonRef.current.children[0].classList.add('bg-b_a_red_icon');
				incButtonRef.current.children[0].classList.remove('bg-b_a_icon');

				// Возвращаем вид по умолчанию для соседней кнопки сортировки

				rollBackDefaultBtnStyle(
					descButtonRef,
					'bg-a_b_red_icon',
					'bg-a_b_icon'
				);
				break;

			default:
				break;
		}
	};

	function handleCatSorting(
		defaultCatCartsArr: ICatCart[],
		order: 'inc' | 'desc'
	): void {
		const immutableSortedCartsArr = defaultCatCartsArr.slice(0);

		immutableSortedCartsArr.sort((cat1, cat2) => {
			const catName1 = cat1.breeds[0].name;
			const catName2 = cat2.breeds[0].name;

			return catName1.localeCompare(catName2);
		});

		if (order === 'desc') {
			immutableSortedCartsArr.reverse();
		}

		setCatCartsOrder(immutableSortedCartsArr);

		changeButtonsActiveState(order);
	}

	const handleNewCartsFetch = useCallback(() => {
		setIsLoading(true);
		// Очищаем ранее отсортированые карточки
		setCatCartsOrder([]);

		// Возвращаем значения по умолчанию для кнопок сортировки
		rollBackDefaultBtnStyle(descButtonRef, 'bg-a_b_red_icon', 'bg-a_b_icon');
		rollBackDefaultBtnStyle(incButtonRef, 'bg-b_a_red_icon', 'bg-b_a_icon');
	}, []);

	useEffect(() => {
		handleNewCartsFetch();

		const fetchMultipleCatCarts = async (url: string) => {
			const cartCarts = await request<ICatCart[]>(url);

			setCatCarts(cartCarts);
			setIsLoading(false);
		};

		fetchMultipleCatCarts(
			`https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=${defaultQueryCatCartsLimit}&breed_ids=${queryBreed}`
		);
	}, [request, handleNewCartsFetch, defaultQueryCatCartsLimit, queryBreed]);

	return (
		<PageContainer>
			<BackArrow_Title title='Breads' />
			<BreedsSelect changeQueryBreed={setQueryBreed} />
			<LimitSelect
				changeQueryLimit={(limit: string) => setQueryCatCartsLimit(limit)}
			/>
			<button
				className='w-[30px] h-10'
				onClick={() => handleCatSorting(catCarts, 'desc')}
				ref={descButtonRef}
			>
				<i className='inline-block bg-a_b_icon hover:bg-a_b_red_icon h-full w-full bg-center bg-no-repeat hover:outline hover:outline-2 hover:outline-pale_peach rounded-[10px]'></i>
			</button>
			<button
				className='w-[30px] h-10'
				onClick={() => handleCatSorting(catCarts, 'inc')}
				ref={incButtonRef}
			>
				<i className='inline-block bg-b_a_icon hover:bg-b_a_red_icon  h-full w-full bg-center bg-no-repeat  hover:outline hover:outline-2 hover:outline-pale_peach rounded-[10px]'></i>
			</button>

			{isLoading ? (
				<div className='text-3xl text-peach font-extrabold text-center h-full'>
					Loading
				</div>
			) : (
				<GridContainer
					catCarts={catCartsOrder.length > 1 ? catCartsOrder : catCarts}
				/>
			)}
		</PageContainer>
	);
}
export default Breeds;
