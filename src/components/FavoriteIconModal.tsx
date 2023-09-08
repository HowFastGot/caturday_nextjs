'use client';

import {useHttp} from '@/hooks/useHttpHook';
import {ActionCategory, ICombinedServerResp, IVotePost} from '@/types';
import {usePathname} from 'next/navigation';
import {MouseEvent, useCallback} from 'react';

function FavoriteIconModal({id, serverId}: {id: string; serverId: number}) {
	const {request} = useHttp();
	const pathName = usePathname();

	const createUserClickFeedback = (cartElem: HTMLElement) => {
		const cart =
			cartElem.tagName.toLocaleLowerCase() === 'figure'
				? cartElem
				: cartElem.closest('figure');

		cart?.classList.add('transition-opacity', 'opacity-0');

		setTimeout(() => {
			cart?.remove();
		}, 150);
	};

	const handleSuccessSubmit = (cart: HTMLElement) => {
		const feedbackBadge = document.createElement('p');
		feedbackBadge.classList.add(
			'w-full',
			'p-2.5',
			'text-white',
			'text-[14px]',
			'text-center',
			'bg-peach',
			'absolute',
			'bottom-0',
			'left-0',
			'group-hover:text-peach',
			'group-hover:bg-white',
			'z-30',
			'transition-opacity'
		);
		feedbackBadge.textContent = `Added to Favorite!`;
		cart.append(feedbackBadge);

		setTimeout(() => {
			feedbackBadge.classList.add('opacity-0');
		}, 2000);
	};

	const handleCartSubmitting = (e: MouseEvent<HTMLElement>) => {
		const catCart = e.target as HTMLElement;

		const cart =
			catCart.tagName.toLocaleLowerCase() === 'figure'
				? catCart
				: (catCart.closest('figure') as HTMLElement);

		request<{message: string}>(
			'https://api.thecatapi.com/v1/favourites',
			'POST',
			JSON.stringify({
				image_id: id,
				sub_id: 'yevhen_sk',
			}),
			{
				'Content-Type': 'application/json',
				'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
			}
		).then((response) => {
			if (response.message !== 'SUCCESS') return;

			handleSuccessSubmit(cart);
		});
	};

	function handleCartDeleting(e: MouseEvent<HTMLElement>) {
		const catCart = e.target as HTMLElement;
		const deleteReqUrl =
			pathName === '/favorite-cats'
				? `https://api.thecatapi.com/v1/favourites/${serverId}`
				: `https://api.thecatapi.com/v1/votes/${serverId}`;
		request<{message: string}>(deleteReqUrl, 'DELETE').then((response) => {
			if (response.message !== 'SUCCESS') return;

			createUserClickFeedback(catCart);
			console.log(response);
		});
	}

	return (
		<div
			className='absolute hidden top-0 left-0 w-full h-full rounded-[20px] bg-catCartHover text-peach backdrop-opacity-60  z-20 group-hover:flex justify-center items-center'
			onClick={
				pathName === '/gallery' ? handleCartSubmitting : handleCartDeleting
			}
		>
			<span className='bg-red_small_heart bg-white inline-block w-10 h-10 bg-no-repeat bg-center rounded-[10px] hover:bg-peach hover:bg-white_solid_small_heart'></span>
		</div>
	);
}

export default FavoriteIconModal;
