'use client';

import {useState, useEffect, useRef, useMemo} from 'react';
import {ICatCart, IUserAction} from '@/types';
import Image from 'next/image';

import {useHttp} from '@/hooks/useHttpHook';
import PageContainer from '@/components/PageContainer';
import clsx from 'clsx';
import UserImageFeedbackTriggets from '@/components/UserImageFeedbackTriggets';
import ActionInfoBar from '@/components/ActionInfoBar';
import BackArrow_Title from '@/components/BackArrow_Title';

function VoitingPage() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [actionRecords, setActionRecords] = useState<IUserAction[]>([]);

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const {request} = useHttp();

	const figureRef: {
		current: HTMLElement;
	} = useRef() as {current: HTMLElement};

	const figureStyles = clsx(
		` relative h-[360px] min-h-[290px] w-full mb-[52px] mt-[20px] rounded-[20px] bg-prewhite opacity-70`,
		{
			'bg-white': isLoaded,
			'!opacity-100': isLoaded,
		}
	);

	const handleUserAction = (actionObj: IUserAction) => {
		if (actionRecords.length + 1 <= 4) {
			setActionRecords([actionObj, ...actionRecords]);
		} else {
			const immutableActionRecords: IUserAction[] = actionRecords.splice(0);

			const removedActionRecord = immutableActionRecords.splice(2, 1);

			setActionRecords([actionObj, ...immutableActionRecords]);
		}
	};

	const memoCatCart = useMemo(() => {
		return actionRecords[0];
	}, [actionRecords]);

	useEffect(() => {
		setIsLoaded(false);

		const fetchCatCards = async (url: string) => {
			const catCartsArr = await request<ICatCart[]>(url);

			setCatCarts(catCartsArr);
		};

		fetchCatCards('https://api.thecatapi.com/v1/images/search');
	}, [memoCatCart, request]);

	return (
		<PageContainer>
			<BackArrow_Title title='Voiting' />
			<div className='w-full h-full min-h-max'>
				<figure className={figureStyles} ref={figureRef}>
					{/* We receive just one cat cart item on this page */}
					{catCarts[0]?.url ? (
						<Image
							key={catCarts[0].id}
							src={catCarts[0].url}
							alt='Cat photo'
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw'
							className='rounded-[25px] object-cover'
							onLoad={() => setIsLoaded(true)}
							priority
						/>
					) : null}

					<UserImageFeedbackTriggets
						handleUserAction={(actionObj: IUserAction) =>
							handleUserAction(actionObj)
						}
						catId={catCarts[0]?.id}
						loading={!isLoaded}
					/>
				</figure>
				{actionRecords.map(({action, time, catId, category}) => {
					return (
						<ActionInfoBar
							key={catId}
							time={time}
							catId={catId}
							action={action}
							category={category}
						/>
					);
				})}
			</div>
		</PageContainer>
	);
}
export default VoitingPage;
