'use client';

import clsx from 'clsx';
import {IUserAction} from '@/types';

interface IActionInfoBar extends IUserAction {}

function ActionInfoBar({time, catId, action, category}: IActionInfoBar) {
	const iconClass = clsx('cursor-pointer', {
		dislike_icon: category === 'Dislikes',
		like_icon: category === 'Likes',
		favorite_icon: category === 'Favourites',
	});

	const parceProperDate = (time: number): string => {
		const dateObject = new Date(time);

		const hours: number = dateObject.getHours();
		const minutes: number = dateObject.getMinutes();

		return `${hours}:${minutes} `;
	};

	return (
		<div className='flex-wrapper justify-between gap-[30px] not_last_element flex-shrink w-full bg-prewhite rounded-[10px] py-[14px] px-[25px] leading-6'>
			<time className='py-1 px-[10px] bg-white rounded-md'>
				{parceProperDate(time)}
			</time>
			<p className='flex-auto text-dark_gray'>
				Image ID:<span className='text-black font-medium'> {catId}</span> was
				{action} to {category}
			</p>
			<span className={iconClass} onClick={() => alert('Removed!')}></span>
		</div>
	);
}
export default ActionInfoBar;
