'use client';

import {useState, useEffect, useRef, useCallback} from 'react';
import Image from 'next/image';

import {
	ICatCart,
	IServerFeedback,
	IUserAction,
	IVotePost,
	UrlPattern,
} from '@/types';

import {useHttp} from '@/hooks/useHttpHook';
import PageContainer from '@/components/PageContainer';
import clsx from 'clsx';
import UserImageFeedbackTriggets from '@/components/UserImageFeedbackTriggets';
import ActionInfoBar from '@/components/ActionInfoBar';
import BackArrow_Title from '@/components/BackArrow_Title';
import changeUserActionObj from '@/utils/voitingPage/changeUserActionObj';
import generateVoteRequestObj from '@/utils/generateVoteRequestObj/generateVoteRequestObj';

function VoitingPage() {
	const [catCarts, setCatCarts] = useState<ICatCart[]>([]);
	const [actionRecords, setActionRecords] = useState<IUserAction[]>([]);
	const [paginationPage, setPaginationPage] = useState(0);

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

	const memoGenerateVoteRequestObj = useCallback(generateVoteRequestObj, []);

	const uploadCartToServer = useCallback(
		(userFeedbackInfoObj: IVotePost) => {
			const baseUrl =
				process.env.NODE_ENV === 'production'
					? 'https://caturday-nextjs.vercel.app'
					: 'http://localhost:3000';

			const favoriteUrl = new URL('/api/favorite', baseUrl);
			const votingUrl = new URL('/api/voiting', baseUrl);
			// request to either vote or favorite pages
			const reqUrl: URL = userFeedbackInfoObj.value ? votingUrl : favoriteUrl;

			request<IServerFeedback>(
				reqUrl,
				'POST',
				JSON.stringify(userFeedbackInfoObj)
			)
				.then((response) => {
					setActionRecords((prev) => {
						const immutableActionsArr = prev.slice();

						const lastAddedActionObj = immutableActionsArr.shift();

						if (!lastAddedActionObj) {
							return prev;
						}

						const newActionObj: IUserAction = changeUserActionObj(
							lastAddedActionObj,
							response
						);

						return [newActionObj, ...immutableActionsArr];
					});

					console.log(`Server <"${reqUrl}"> response`, response);
				})
				.catch((e) => console.log(e));
		},
		[request]
	);

	const handleUserAction = useCallback(
		(actionObj: IUserAction) => {
			// fetch new cat cart for voiting or favorite
			//
			if (actionRecords.length + 1 <= 4) {
				setActionRecords((prevRecords) => [actionObj, ...prevRecords]);
			} else {
				const immutableActionRecords: IUserAction[] = actionRecords.slice(0);
				immutableActionRecords.splice(2, 1);

				setActionRecords([actionObj, ...immutableActionRecords]);
			}

			// Create POST req to the server
			const requestObj = memoGenerateVoteRequestObj(
				actionObj.category,
				actionObj.catId
			);
			uploadCartToServer(requestObj);

			// change  the estimated cat cart
			setPaginationPage((prev) => prev + 1);
		},
		[actionRecords, uploadCartToServer, memoGenerateVoteRequestObj]
	);

	useEffect(() => {
		setIsLoaded(false);

		const fetchCatCards = async (url: string) => {
			const catCartsArr = await request<ICatCart[]>(url);

			setCatCarts(catCartsArr);
		};

		const baseUrl =
			process.env.NODE_ENV === 'production'
				? 'https://caturday-nextjs.vercel.app'
				: 'http://localhost:3000';

		const voteNewCartUrl = new URL('/api/voiting', baseUrl);

		fetchCatCards(`${voteNewCartUrl}?paginationPage=${paginationPage}`);
	}, [request, paginationPage]);

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
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw'
							className='rounded-[25px] object-cover'
							onLoad={() => setIsLoaded(true)}
							priority
							fill
						/>
					) : null}

					<UserImageFeedbackTriggets
						handleUserAction={handleUserAction}
						catId={catCarts[0]?.id}
						loading={!isLoaded}
					/>
				</figure>
				{actionRecords.map(({action, time, catId, category, voteId}) => {
					return (
						<ActionInfoBar
							key={time}
							time={time}
							catId={catId}
							action={action}
							category={category}
							voteId={voteId}
							setActionRecords={setActionRecords}
						/>
					);
				})}
			</div>
		</PageContainer>
	);
}
export default VoitingPage;
