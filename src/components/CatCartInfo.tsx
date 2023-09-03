import {BreedsType} from '@/types';

function CatCartInfo({catInfo}: {catInfo: BreedsType[]}) {
	const defaultBreedInfo = {
		name: 'Unknown',
		description: 'Unknown',
		temperament: 'Unknown',
		origin: 'Unknown',
		weight: {
			imperial: 'Unknown',
		},
		life_span: 'Unknown',
	};
	const [breedInformation] = catInfo ?? [defaultBreedInfo];

	return (
		<div className='w-full border-2 border-solid border-pale_peach rounded-[20px] mt-[50px] px-10 pb-10 font-medium leading-normal '>
			<h2 className='inline-block relative left-2/4 -translate-x-2/4 -translate-y-2/4 px-10 py-[5px] rounded-[20px] text-[36px] text-black bg-white '>
				{breedInformation.name}
			</h2>
			<h4 className='px-1 -mt-8 text-center text-dark_gray '>
				{' '}
				{breedInformation.description}
			</h4>

			<ul className='w-full mt-5 flex gap-5 justify-between items-center'>
				<li className='max-w-[270px] flex-1'>
					<h6>Temperament:</h6>
					<span className='font-normal text-dark_gray'>
						{breedInformation.temperament}
					</span>
				</li>
				<li className='flex-1'>
					<ul className='w-full max-w-[260px] mr-auto'>
						<li>
							Origin:{' '}
							<span className='text-dark_gray font-normal'>
								{breedInformation.origin}
							</span>
						</li>
						<li>
							Weight:{' '}
							<span className='text-dark_gray font-normal'>
								{breedInformation.weight?.imperial}
							</span>
						</li>
						<li>
							Life span:
							<span className='text-dark_gray font-normal'>
								{breedInformation.life_span}
							</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}
export default CatCartInfo;
