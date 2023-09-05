'use client';

import {usePathname} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import isActivePage from '@/utils/reactionNavLinks/isActivePage';

import like from '/public/assets/like_page/like-30.svg';
import dislike from '/public/assets/like_page/dislike-30.svg';
import favorite from '/public/assets/like_page/fav-color-30.svg';
import like_active from '/public/assets/like_page/activePage/like.svg';
import dislike_active from '/public/assets/like_page/activePage/favorite.svg';
import favorite_active from '/public/assets/like_page/activePage/disl.svg';
import {Path} from '@/types';
import clsx from 'clsx';

interface ILinkParams {
	path: Path;
	src: string;
	active_src: string;
	title: string;
}
const linksParams: ILinkParams[] = [
	{
		path: '/like-cats',
		src: like,
		active_src: like_active,
		title: 'like smile icon',
	},
	{
		path: '/favorite-cats',
		src: favorite,
		active_src: dislike_active,
		title: 'favorite icon',
	},
	{
		path: '/dislike-cats',
		src: dislike,
		active_src: favorite_active,
		title: 'dislike icon',
	},
];

function ReactionNavLinks() {
	const browserPathName: string = usePathname();

	return (
		<nav>
			<ul className='flex items-center justify-center gap-2.5'>
				{linksParams.map(({path, src, active_src, title}, index) => {
					//
					const condition = isActivePage(browserPathName, path, index);
					//
					let immgSrc = condition ? active_src : src;

					const styles = clsx('icon', {
						'bg-peach': condition,
						'hover:bg-pale_peach': !condition,
					});

					return (
						<li key={title} className={styles}>
							<Link href={path}>
								<Image
									src={immgSrc}
									alt={title}
									className='mx-auto py-[15px]'
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
export default ReactionNavLinks;
