import {useRouter} from 'next/navigation';
import Image from 'next/image';

import clsx from 'clsx';
import {ICatCart} from '@/types';

function GridContainer({catCarts}: {catCarts: ICatCart[]}) {
	const router = useRouter();

	const handleNewPageRoute = (id: string) => {
		router.prefetch(`/breeds/${id.toLocaleLowerCase()}`);
		router.push(`/breeds/${id.toLocaleLowerCase()}`);
	};

	const bigImgIndex = [3, 8, 13, 18];

	return (
		<div className='mt-5 w-full h-full min-h-[420px]'>
			<div className='h-full grid grid-cols-3 gap-5 auto-rows-[minmax(120px,_140px)]'>
				{catCarts.map(({id, url, breeds}, index) => {
					const breedName =
						(breeds && breeds[0]?.name) ?? 'Unknown breed name (';

					const gridItemsStyles = clsx(
						'relative group bg-gray rounded-[20px] cursor-pointer',
						{
							'row-span-2':
								index === 0 ||
								index === 3 ||
								index === 7 ||
								index === 8 ||
								index === 10 ||
								index === 13 ||
								index === 17 ||
								index === 18,
							'col-span-2': bigImgIndex.includes(index),
						}
					);

					return (
						<figure
							key={id}
							className={gridItemsStyles}
							onClick={() => handleNewPageRoute(id)}
						>
							<Image
								src={url}
								alt='Cat photo'
								className='object-cover cat-image rounded-[20px]'
								sizes='(max-width: 768px) 30w, (max-width: 1200px) 20vw, 15vw'
								priority={bigImgIndex.includes(index)}
								fill
							/>

							<BreedHoverModal breedName={breedName} />
						</figure>
					);
				})}
			</div>
		</div>
	);
}

function BreedHoverModal({breedName}: {breedName: string}) {
	return (
		<div className='absolute hidden top-0 left-0 w-full h-full rounded-[20px] bg-catCartHover text-peach backdrop-opacity-60 group-hover:block first-line:z-20'>
			<h6 className=' !opacity-100 rounded-[10px] absolute bottom-2.5 left-2/4 -translate-x-2/4 w-[90%] px-10 py-[5px] bg-white bg-opacity-100 text-center'>
				{breedName}
			</h6>
		</div>
	);
}

export default GridContainer;
