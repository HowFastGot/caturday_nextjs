'use client';

import Image from 'next/image';

import likeWhIcon from 'public/assets/voiting_page/white_like_smile.svg';
import heartIcon from 'public/assets/voiting_page/white_heart.svg';
import dislikeIcon from 'public/assets/voiting_page/white_dislike_smile.svg';
import {IUserAction} from '@/types';

interface UserrTiggetsProps extends Partial<IUserAction> {
	handleUserAction: any;
	loading: boolean;
}
function UserImageFeedbackTriggets({
	handleUserAction,
	catId,
	loading,
}: UserrTiggetsProps) {
	return (
		<ul className='absolute -bottom-[39px] left-2/4 -translate-x-2/4 flex-wrapper inline-flex justify-between w-[40%] min-w-[150px] rounded-[28px] border-[7px]  h-[79.925px] border-solid border-white'>
			<li
				className='user_trigger bg-green  cursor-pointer'
				onClick={() =>
					handleUserAction({
						action: 'added',
						catId: catId,
						time: Date.now(),
						category: 'Likes',
					})
				}
			>
				<button className='disabled:opacity-50' disabled={loading}>
					<Image
						src={likeWhIcon}
						alt='White icon smile'
						className='min-w-[20px]'
					/>
				</button>
			</li>
			<li
				className='user_trigger bg-peach cursor-pointer'
				onClick={() =>
					handleUserAction({
						action: 'added',
						catId: catId,
						time: Date.now(),
						category: 'Favourites',
					})
				}
			>
				<button className='disabled:opacity-50' disabled={loading}>
					<Image src={heartIcon} alt='White heart' className=' min-w-[20px]' />
				</button>
			</li>
			<li
				className='user_trigger bg-orange cursor-pointer'
				onClick={() =>
					handleUserAction({
						action: 'added',
						catId: catId,
						time: Date.now(),
						category: 'Dislikes',
					})
				}
			>
				<button className='disabled:opacity-50' disabled={loading}>
					<Image
						src={dislikeIcon}
						alt='White dislike icon'
						className=' min-w-[20px]'
					/>
				</button>
			</li>
		</ul>
	);
}
export default UserImageFeedbackTriggets;
