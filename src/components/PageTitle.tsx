import clsx from 'clsx';

function PageTitle({
	title,
	bgClass = 'bg-peach',
}: {
	title: string;
	bgClass?: 'bg-peach' | 'bg-pale_peach' | string;
}) {
	const styles = clsx(
		'py-[5px] w-[143px] text-center bg-peach rounded-[10px] text-xl text-white uppercase font-medium leading-[30px]',
		{
			[bgClass]: bgClass,
			'!text-peach': bgClass === '!bg-pale_peach',
		}
	);
	return <h6 className={styles}>{title}</h6>;
}
export default PageTitle;
