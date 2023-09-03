import {ICatCart} from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

export default function GalleryGridContainer({
	catCarts,
}: {
	catCarts: ICatCart[];
}) {
	const bigImgIndex = [3, 8, 13, 18];

	if (catCarts.length === 0) {
		return (
			<div className='text-center w-full text-peach text-3xl'>
				Such cats do not exist!
			</div>
		);
	}

	return (
		<div className='mt-5 w-full h-full min-h-[420px]'>
			<div className='h-full grid grid-cols-3  gap-5 auto-rows-[minmax(120px,_140px)_minmax(100px,_140px)_minmax(100px,_140px)]'>
				{catCarts.map(({id, url, breeds}, index) => {
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
							'col-span-2':
								index === 3 || index === 8 || index === 13 || index === 18,
						}
					);

					return (
						<figure key={id} className={`${gridItemsStyles}`}>
							<Image
								src={url}
								alt='Cat photo'
								className='object-cover cat-image rounded-[20px]'
								sizes='(max-width: 768px) 30w, (max-width: 1200px) 20vw, 15vw'
								priority={bigImgIndex.includes(index)}
								fill
							/>

							<FavoriteIconModal />
						</figure>
					);
				})}
			</div>
		</div>
	);
}

function FavoriteIconModal() {
	return (
		<div className='absolute hidden top-0 left-0 w-full h-full rounded-[20px] bg-catCartHover text-peach backdrop-opacity-60  z-20 group-hover:flex justify-center items-center'>
			<span className='bg-red_small_heart bg-white inline-block w-10 h-10 bg-no-repeat bg-center rounded-[10px] hover:bg-peach hover:bg-white_solid_small_heart'></span>
		</div>
	);
}
