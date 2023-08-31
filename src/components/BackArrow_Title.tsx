import Link from 'next/link';
import PageTitle from './PageTitle';

function BackArrow_Title({
	title,
	bgClass = 'bg-peach',
}: {
	title: string;
	bgClass?: 'bg-peach' | 'bg-pale_peach' | string;
}) {
	return (
		<nav className='flex justify-start items-center gap-2.5'>
			<Link
				href='/'
				className='arrow-left p-[20px] inline-block bg-pale_peach rounded-[10px] hover:bg-peach self-start'
			/>
			<PageTitle title={title} bgClass={bgClass} />
		</nav>
	);
}
export default BackArrow_Title;
