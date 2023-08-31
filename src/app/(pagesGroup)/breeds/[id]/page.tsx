import BackArrow_Title from '@/components/BackArrow_Title';
import PageContainer from '@/components/PageContainer';

import generateBlur from '@/utils/plaiceholder';
import {BreedsType, ICatCart} from '@/types';
import Image from 'next/image';

import sliderIndicatorImg from '/public/assets/gallery/slider-indicator.svg';
import CatCartInfo from '@/components/CatCartInfo';

async function BreedInfoPage({params}: {params: {id: string}}) {
	const catDataResp = await fetch(
		`https://api.thecatapi.com/v1/images/${params.id}`
	);

	if (!catDataResp.ok) {
		throw new Error('Failed to fetch data');
	}

	const catData: ICatCart = await catDataResp.json();
	const breedId = catData.breeds[0].id;

	const {base64} = (await generateBlur(catData.url)) as {base64: string};
	return (
		<>
			<PageContainer>
				<BackArrow_Title title='Breeds' bgClass='!bg-pale_peach' />
				<span className='inline-block px-[30px] py-[5px] text-center bg-peach rounded-[10px] text-xl leading-[30px] font-medium text-white'>
					{breedId.slice(0, 1).toLocaleUpperCase() + breedId.slice(1)}
				</span>

				<figure className='relative w-full h-[360px] mt-5'>
					<Image
						src={catData.url}
						alt='Cat image'
						className='object-cover rounded-[20px]'
						placeholder='blur'
						blurDataURL={base64}
						fill
						priority
					/>
				</figure>
				<div className='relative text-center w-full rounded-full -mt-[35px] z-20 '>
					<Image
						src={sliderIndicatorImg}
						alt='Slider idicator img'
						className='mx-auto'
					/>
				</div>

				<CatCartInfo catInfo={catData.breeds} />
			</PageContainer>
		</>
	);
}
export default BreedInfoPage;

export async function generateStaticParams() {
	const breedArr: BreedsType[] = await fetch(
		'https://api.thecatapi.com/v1/breeds'
	).then((res) => res.json());

	return breedArr.map((breed) => ({
		id: `/breeds/${breed.id}`,
	}));
}
