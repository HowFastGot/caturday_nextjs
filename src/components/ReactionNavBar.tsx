import Image from 'next/image';
import Link from 'next/link';

import like from '/public/assets/like_page/like-30.svg';
import dislike from '/public/assets/like_page/dislike-30.svg';
import favorite from '/public/assets/like_page/fav-color-30.svg';

interface ILinkParams {
	path: string;
	src: string;
	title: string;
}
const linksParams: ILinkParams[] = [
	{
		path: '/like_cats',
		src: like,
		title: 'like smile icon',
	},
	{
		path: '/favorite_cats',
		src: favorite,
		title: 'favorite icon',
	},
	{
		path: '/dislike_cats',
		src: dislike,
		title: 'dislike icon',
	},
];

function ReactionNavLinks() {
	return (
		<nav>
			<ul className='flex items-center justify-center gap-2.5'>
				{linksParams.map(({path, src, title}) => {
					return (
						<li key={title} className='icon'>
							<Link href={path}>
								<Image src={src} alt={title} className='mx-auto py-[15px]' />
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
export default ReactionNavLinks;
