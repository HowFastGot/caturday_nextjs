import {useCallback, useEffect, useMemo, useState} from 'react';

import useBreadSearch from '@/hooks/useBreadSearch';
import GalleryInput from './GalleryInput';
import PaginationBtn from './PaginationBtn';

function GalleryContainer() {
	const [localBreedNames, setLocalBreedNames] = useState<string[]>([]);

	const {breedNames, setBreedNames} = useBreadSearch();

	const mamorizedBreedNames = useMemo(() => {
		return breedNames;
	}, [breedNames]);

	const modifyDefaultBreedNamesList = useCallback(() => {
		setLocalBreedNames((prev) => ['None', ...mamorizedBreedNames]);
	}, [mamorizedBreedNames]);

	useEffect(() => {
		modifyDefaultBreedNamesList();
	}, [modifyDefaultBreedNamesList]);
	return (
		<ul className='min-h-[156px] mt-5 px-5 flex-[1_1_100%] bg-prewhite rounded-[20px] flex justify-between items-center gap-x-5 gap-y-0 flex-wrap pb-5'>
			<GalleryInput
				title='order'
				defaultOptionValue={0}
				selectOptList={['Random', 'Desc', 'Asc']}
			/>
			<GalleryInput
				title='type'
				defaultOptionValue={1}
				selectOptList={['All', 'Static', 'Animated']}
			/>
			<GalleryInput
				title='breed'
				defaultOptionValue={0}
				selectOptList={localBreedNames}
			/>

			<GalleryInput
				title='limit'
				defaultOptionValue={0}
				selectOptList={[
					'5 items per page',
					'10 items per page',
					'15 items per page',
					'20 items per page',
				]}
			>
				<PaginationBtn />
			</GalleryInput>
		</ul>
	);
}
export default GalleryContainer;
