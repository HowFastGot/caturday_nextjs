import useBreadSearch from '@/hooks/useBreadSearch';
import {ChangeEvent} from 'react';

function BreedsSelect({
	changeQueryBreed,
}: {
	changeQueryBreed: (breedName: string) => void;
}) {
	const {breedDataObj, setBreedDataObj} = useBreadSearch();
	const breedsList = breedDataObj.map((breedObj) => breedObj.name);

	const getBreedIdFromSelectOption = (name: string): string => {
		const breedResultObj = breedDataObj.find(
			(obj) => obj.name.toLocaleLowerCase() === name.toLocaleLowerCase()
		);

		const id = breedResultObj?.id;

		if (!id) return '';

		return id?.toLocaleLowerCase();
	};

	const handleSelectClick = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedBreed = e.target.value;

		const breedName =
			selectedBreed === 'All breads' ? '' : selectedBreed.toLocaleLowerCase();

		const id = getBreedIdFromSelectOption(breedName);

		changeQueryBreed(id);
	};

	return (
		<>
			<label htmlFor='select' className='realtive inline-block select_breeds'>
				<select
					id='select'
					name='breads'
					className='relative w-[214px] cursor-pointer bg-prewhite leading-6 text-dark_gray px-2 py-2 rounded-[10px] appearance-none hover:outline hover:outline-2 hover:outline-pale_peach'
					onChange={handleSelectClick}
				>
					<option value='All breeds'>All breeds</option>
					{breedsList.map((name) => {
						return (
							<option key={name} value={name}>
								{name}
							</option>
						);
					})}
				</select>
			</label>
		</>
	);
}
export default BreedsSelect;
