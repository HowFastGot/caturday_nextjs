'use client';

import {useRouter} from 'next/navigation';
import PageTitle from './PageTitle';

function BackArrow_Title({
	title,
	bgClass = 'bg-peach',
}: {
	title: string;
	bgClass?: 'bg-peach' | 'bg-pale_peach' | string;
}) {
	const router = useRouter();
	return (
		<nav className='flex justify-start items-center gap-2.5'>
			<button
				onClick={() => router.back()}
				className='arrow-left p-[20px] inline-block bg-pale_peach rounded-[10px] hover:bg-peach self-start'
			/>
			<PageTitle title={title} bgClass={bgClass} />
		</nav>
	);
}
export default BackArrow_Title;
