'use client';

import {useEffect, useState} from 'react';

import {useRouter} from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface INavifationCartProps {
	path: string;
	title: string;
	src: string;
	blurImg: string;
}

function NavifationCart({path, src, title, blurImg}: INavifationCartProps) {
	const router = useRouter();
	const cartClasses = clsx(
		'border-borderColor relative h-[198px] w-[138px] rounded-[20px] border-4 border-solid  hover:border-white',
		{
			'bg-green': title === 'BREEDS',
			'bg-orange': title === 'GALLERY',
			'bg-pale_blue': title === 'VOTING',
		}
	);

	return (
		<>
			<li className={cartClasses}>
				<Link href={path}>
					<figure className='flex-wrapper h-full'>
						<Image
							src={src}
							alt='Navigation image'
							className=' rounded-[20px]'
							placeholder='blur'
							blurDataURL={blurImg}
						/>
					</figure>
				</Link>
				<button className='nav-cart-btn' onClick={() => router.push(path)}>
					{title}
				</button>
			</li>
		</>
	);
}
export default NavifationCart;
