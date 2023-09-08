import Image from 'next/image'

import GirlMainImg from '/public/assets/girl.png';

export default function Home() {
	return (
		<>
			<section className='h-[840px]'>
				<div className='flex h-full w-[680px] rounded-[20px] bg-pale_peach dark:bg-less_black'>
					<Image
						src={GirlMainImg}
						alt='Girl photo'
						className='relative -left-[65px] z-10'
						priority
					/>
				</div>
			</section>
		</>
	);
}
