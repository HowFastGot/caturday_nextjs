import {ChangeEvent} from 'react';

function BreedsSelect({
	changeQueryBreed,
	breedsList,
}: {
	changeQueryBreed: (breedName: string) => void;
	breedsList: string[];
}) {
	const getBreedIdFromSelectOption = (name: string): string => {
		const nameSplit = name.split(' ');

		if (nameSplit.length === 1) {
			const id: string = name.slice(0, 4);
			return id;
		} else {
			let id = '';

			nameSplit.map((namePart, index) => {
				if (index == 0) {
					id += namePart.slice(0, 1);
				} else {
					id += namePart.slice(0, 3);
				}
			});

			return id.toLocaleLowerCase();
		}
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
