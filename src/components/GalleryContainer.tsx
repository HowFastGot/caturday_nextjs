import {useCallback, useEffect, useMemo, useState} from 'react';

import useBreadSearch from '@/hooks/useBreadSearch';
import GalleryInput from './GalleryInput';
import PaginationBtn from './PaginationBtn';
import {MimeContent, Order} from '@/types';

interface GalleryProps {
	setQueryBreed: (breed: string) => any;
	setQueryLimit: (limit: string) => any;
	setFetchCartOrder: (order: Order) => any;
	setMimeType: (mime: 'static' | 'animated') => any;
}

function GalleryContainer({
	setQueryBreed,
	setQueryLimit,
	setFetchCartOrder,
	setMimeType,
}: GalleryProps) {
	const [localBreedNames, setLocalBreedNames] = useState<string[]>([]);

	const {breedDataObj, setBreedDataObj} = useBreadSearch();

	const mamorizedBreedNames = useMemo(() => {
		return breedDataObj.map((breedObj) => breedObj.name);
	}, [breedDataObj]);

	const modifyDefaultBreedNamesList = useCallback(() => {
		setLocalBreedNames(() => ['None', ...mamorizedBreedNames]);
	}, [mamorizedBreedNames]);

	useEffect(() => {
		modifyDefaultBreedNamesList();
	}, [modifyDefaultBreedNamesList]);

	return (
		<ul className='!self-start min-h-[156px] mt-5 px-5 bg-prewhite rounded-[20px] flex justify-between items-center gap-x-5 gap-y-0 flex-wrap pb-5'>
			<GalleryInput
				title='order'
				selectOptList={['Random', 'Desc', 'Asc']}
				setPropertyFuntion={setFetchCartOrder}
			/>
			<GalleryInput
				title='type'
				selectOptList={['All', 'Static', 'Animated']}
				setPropertyFuntion={setMimeType}
			/>
			<GalleryInput
				title='breed'
				selectOptList={localBreedNames}
				setPropertyFuntion={setQueryBreed}
			/>

			<GalleryInput
				title='limit'
				selectOptList={[
					'5 items per page',
					'10 items per page',
					'15 items per page',
					'20 items per page',
				]}
				setPropertyFuntion={setQueryLimit}
			>
				<PaginationBtn />
			</GalleryInput>
		</ul>
	);
}
export default GalleryContainer;
