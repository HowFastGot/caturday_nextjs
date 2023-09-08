'use client';

import {SetStateAction, useCallback, useRef} from 'react';

import clsx from 'clsx';
import {useHttp} from '@/hooks/useHttpHook';
import {IUserAction} from '@/types';

import parceProperDate from '@/utils/actionInfoBar/parceProperDate';

interface IActionInfoBar extends IUserAction {
	setActionRecords: (value: SetStateAction<IUserAction[]>) => void;
}

function ActionInfoBar({
	time,
	catId,
	action,
	category,
	voteId,
	setActionRecords,
}: IActionInfoBar) {
	const {request} = useHttp();
	const removeIconRef = useRef() as {
		current: HTMLSpanElement;
	};

	const iconClass = clsx('cursor-pointer', {
		dislike_icon: category === 'Dislikes' && action !== 'removed from',
		like_icon: category === 'Likes' && action !== 'removed from',
		favorite_icon: category === 'Favourites' && action !== 'removed from',
	});

	const actionStyle = clsx({
		'text-peach': action === 'removed from',
		'text-green': action !== 'removed from',
	});

	const handleServerCatCartDeliting = useCallback(() => {
		const deleteReqUrl =
			category === 'Favourites'
				? `https://api.thecatapi.com/v1/favourites/${voteId}`
				: `https://api.thecatapi.com/v1/votes/${voteId}`;

		request<{message: string}>(deleteReqUrl, 'DELETE').then((response) => {
			//
			if (response.message !== 'SUCCESS') return;
			//

			const triggerSpan = removeIconRef.current;

			triggerSpan.classList.add('!opacity-50', 'pointer-events-none');

			const deleteActionObj: IUserAction = {
				action: 'removed from',
				time: Date.now(),
				catId,
				category,
				voteId,
			};

			setActionRecords((prev) => [deleteActionObj, ...prev]);
		});
	}, [request, category, voteId, catId, setActionRecords]);

	return (
		<div className='flex-wrapper justify-between gap-[30px] not_last_element flex-shrink w-full bg-prewhite rounded-[10px] py-[14px] px-[25px] leading-6'>
			<time className='py-1 px-[10px] bg-white rounded-md'>
				{parceProperDate(time)}
			</time>
			<p className='flex-auto text-dark_gray'>
				Image ID:<span className='text-black font-medium'> {catId}</span> was{' '}
				<span className={actionStyle}>{action} </span> {category}
			</p>
			<span
				ref={removeIconRef}
				className={iconClass}
				onClick={handleServerCatCartDeliting}
			></span>
		</div>
	);
}
export default ActionInfoBar;
