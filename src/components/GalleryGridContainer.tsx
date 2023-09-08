import {ICombinedServerResp} from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import ItemNotFound from './ItemNotFound';
import FavoriteIconModal from './FavoriteIconModal';

export default function GalleryGridContainer({
	catCarts,
}: {
	catCarts: ICombinedServerResp[];
}) {
	// indexes of grid big images
	const bigImgIndex = [3, 8, 13, 18];

	if (catCarts.length === 0) {
		return <ItemNotFound />;
	}
	return (
		<section className='gallery_grid w-full h-full mt-5'>
			<div className='h-full grid grid-cols-3 gap-5 auto-rows-[minmax(120px,_140px)_minmax(100px,_140px)_minmax(100px,_140px)]'>
				{catCarts.map(({id, url, serverId}, index) => {
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
						<>
							<figure key={id} className={`${gridItemsStyles}`}>
								<Image
									src={url}
									alt='Cat photo'
									className='object-cover cat-image rounded-[20px] object-top'
									sizes='(max-width: 768px) 30w, (max-width: 1200px) 20vw, 15vw'
									priority={bigImgIndex.includes(index)}
									fill
								/>

								<FavoriteIconModal serverId={serverId} id={id} />
							</figure>
						</>
					);
				})}
			</div>
		</section>
	);
}
