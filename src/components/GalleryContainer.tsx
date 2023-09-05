import {useCallback, useEffect, useMemo, useState} from 'react';

import useBreadSearch from '@/hooks/useBreadSearch';
import GalleryInput from './GalleryInput';
import PaginationBtn from './PaginationBtn';
import {BreedsType, MimeContent, Order} from '@/types';

interface GalleryProps {
	breedNames: string[];
	setQueryBreed: (breed: string) => any;
	setQueryLimit: (limit: string) => any;
	setFetchCartOrder: (order: Order) => any;
	setMimeType: (mime: 'static' | 'animated') => any;
	setNumberPage: (page: string) => any;
}

function GalleryContainer({
	breedNames,
	setQueryBreed,
	setQueryLimit,
	setFetchCartOrder,
	setMimeType,
	setNumberPage,
}: GalleryProps) {
	const [localBreedNames, setLocalBreedNames] = useState<string[]>([]);

	const modifyDefaultBreedNamesList = useCallback(() => {
		setLocalBreedNames(() => ['None', ...breedNames]);
	}, [breedNames]);

	useEffect(() => {
		modifyDefaultBreedNamesList();
	}, [modifyDefaultBreedNamesList]);

	return (
		<ul className='min-h-[156px] mb-5 mt-5 px-5 bg-prewhite rounded-[20px] flex justify-between items-center gap-x-5 gap-y-0 flex-wrap pb-5'>
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
				<PaginationBtn setNumberPage={setNumberPage} />
			</GalleryInput>
		</ul>
	);
}
export default GalleryContainer;
