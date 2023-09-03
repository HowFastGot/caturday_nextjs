import {useMemo, useState, useEffect} from 'react';
import {useHttp} from './useHttpHook';
import {BreedsType} from '@/types';

function useBreadSearch() {
	const [breedDataObj, setBreedDataObj] = useState<
		{name: string; id: string}[]
	>([]);

	const {request} = useHttp();

	useEffect(() => {
		async function fetchAllBreeds() {
			const breedsArray = await request<BreedsType[]>(
				'https://api.thecatapi.com/v1/breeds'
			);

			const breedsInfoObj = breedsArray.map(({name, id}) => {
				return {
					name,
					id,
				};
			});

			setBreedDataObj(breedsInfoObj);
		}

		fetchAllBreeds();
	}, [request]);

	return {breedDataObj, setBreedDataObj};
}

export default useBreadSearch;
