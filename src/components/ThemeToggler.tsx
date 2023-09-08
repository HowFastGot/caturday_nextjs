'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import eye from '/public/assets/eye.svg';
import close_eye from '/public/assets/close_eye.svg';

function ThemeToggler() {
	const [isBlackTheme, setBlackTheme] = useState(false);

	const circleStyles = clsx(
		'absolute right-1 top-1 inline-block w-4 h-4 rounded-full bg-peach transition-transform ',
		{
			'-translate-x-[120%]': isBlackTheme,
		}
	);

	const imgSrc = isBlackTheme ? close_eye : eye;

	useEffect(() => {
		if (isBlackTheme) {
			document.querySelector('html')?.classList.add('dark');
		} else {
			document.querySelector('html')?.classList.remove('dark');
		}
	}, [isBlackTheme]);

	return (
		<div className=' w-[75px] h-[44px] theme-toggler flex items-center justify-between gap-[5px]'>
			<figure className='min-w-6 h-6 py-1 px-[4.5px] relative rounded-[50%] bg-white dark:bg-less_black flex items-center justify-center'>
				<Image src={imgSrc} alt='Eye image' width={30} height={30} />
			</figure>
			<div
				className='relative w-full p-1 h-[24px] bg-pale_peach rounded-[50px] flex justify-end items-center cursor-pointer dark:bg-dark_toggler'
				onClick={() => {
					setBlackTheme((prev) => !prev);
				}}
			>
				<span className={circleStyles}></span>
			</div>
		</div>
	);
}
export default ThemeToggler;
