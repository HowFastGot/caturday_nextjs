import {useMemo, useState, useEffect} from 'react';
import {useHttp} from './useHttpHook';
import {BreedsType} from '@/types';

function useBreadSearch() {
	const [breedNames, setBreedNames] = useState<string[]>([]);

	const {request} = useHttp();

	useEffect(() => {
		async function fetchAllBreeds() {
			const breedsArray = await request<BreedsType[]>(
				'https://api.thecatapi.com/v1/breeds'
			);

			const breedsNameList = breedsArray.map(({name}) => {
				return name;
			});

			setBreedNames(breedsNameList);
		}

		fetchAllBreeds();
	}, [request]);

	return {breedNames, setBreedNames};
}

export default useBreadSearch;
