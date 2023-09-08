import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type {Metadata} from 'next';
import {Jost} from 'next/font/google';

import styles from '@/styles/styles.module.css';
import NavifationCart from '@/components/NavifationCart';

import Logo from '/public/assets/logo/logo.svg';
import VoteIconImg from '/public/assets/navigation/vote-table.svg';
import BreedIconImg from '/public/assets/navigation/pet-breeds.svg';
import GalleryIconImg from '/public/assets/navigation/images-search.svg';
import ThemeToggler from '@/components/ThemeToggler';

type NavigationCart = {
	src: string;
	path: string;
	title: string;
	blurImg: string;
};

const jost = Jost({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'MacPaw BootCamp Application',
	description:
		"Get ready for a purr-fectly adorable overdose! Our website is your one-stop hub for fluffy antics, whisker wonders, and paw-some kitten capers. Dive into a world where every click leads to cuteness and every scroll unveils a new feline masterpiece. Caution: Excessive 'awws' and uncontrollable giggles guaranteed!",
};

const bodyStyles = clsx(
	'bg-prewhite dark:bg-black max-w-container mx-auto pl-2.5 pr-5 min-h-max',
	jost.className
);

const navigationParams: NavigationCart[] = [
	{
		src: VoteIconImg,
		path: '/voiting',
		title: 'VOTING',
		blurImg:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/ABkAGBO0k8Lgqn3PxwD2//CU2svV/6WO/fwA0qfN/7aFrv/FdKrqAG4JbrOFM43c2U5Hrx8eHtn8spd9AAAAAElFTkSuQmCC',
	},
	{
		src: BreedIconImg,
		path: '/breeds',
		title: 'BREEDS',
		blurImg:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAYAAACk7+45AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nAEkANv/ANl9anBZAAAgAOudmMr/8LueAP/Oq//0qozsAOuYb5CBACFKUMoS14iD2GcAAAAASUVORK5CYII=',
	},
	{
		src: GalleryIconImg,
		path: '/gallery',
		title: 'GALLERY',
		blurImg:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/AP/i4hj0086A79DK2ABXJwDbZTYDj5FrNDUAQAAA8GkoAP+kaifwAMKmilXHqYwy+/zaCbEMGXH1bYuxAAAAAElFTkSuQmCC',
	},
];

export default function RootLayout({
	children,
	uploadModal,
}: {
	children: React.ReactNode;
	uploadModal: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={bodyStyles}>
				<header className='pt-[30px] flex justify-start items-center gap-[260px]'>
					<div className='flex items-center justify-start gap-2'>
						<Link href='/' className='inline-block'>
							<Image
								src={Logo}
								alt='caturday logo'
								quality={100}
								className='rounded-xl'
							/>
						</Link>
						<span className='text-black dark:text-white font-bold text-[21px] font-jost'>
							PetsPaw
						</span>
					</div>

					<ThemeToggler />
				</header>

				<main className='relative main-wrapper flex justify-between gap-20'>
					<div className='relative sticky-container h-full'>
						<aside className='sticky top-2.5 mt-20  inline-block h-[450px] w-[446px]'>
							<br />
							<h6 className={`${styles.greeting_text} dark:text-white`}>
								Hi!👋
							</h6>
							<p className='mt-[10px]  text-desc '>
								Welcome to MacPaw Bootcamp 2023
							</p>

							<p className='mt-[60px] text-xl font-medium dark:text-white'>
								Lets start using The Cat API
							</p>

							<nav>
								<ul className='mt-5 flex items-center justify-center gap-4'>
									{navigationParams.map(({src, path, title, blurImg}) => {
										return (
											<NavifationCart
												key={title}
												src={src}
												title={title}
												path={path}
												blurImg={blurImg}
											/>
										);
									})}
								</ul>
							</nav>
						</aside>
					</div>
					<section className='root_section w-[53.86%] h-full -top-[27.2px] relative'>
						{children}
					</section>
				</main>
				{uploadModal}
			</body>
		</html>
	);
}
