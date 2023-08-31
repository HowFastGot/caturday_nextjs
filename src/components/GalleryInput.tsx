import clsx from 'clsx';

function GalleryInput({
	title,
	defaultOptionValue,
	selectOptList,
	children,
}: {
	title: string;
	defaultOptionValue: number;
	selectOptList: string[];
	children?: React.ReactNode;
}) {
	const selectStyles = clsx(
		'w-full py-3 px-2.5 rounded-[10px] cursor-pointer hover:outline hover:outline-2 hover:outline-pale_peach'
	);

	const labelStyles = clsx(
		'w-full font-medium text-[10px] ml-2.5 leading-[18px] text-dark_gray uppercase',
		{
			'ml-0': children,
		}
	);

	const spanStyles = clsx({
		' flex-[1_1_100%] ml-2.5': children,
	});

	return (
		<li className='flex-[1_1_48%] pt-2.5 leading-[24px] last:!pt-[14px]  last:flex last:justify-between last:items-center last:gap-2.5'>
			<label className={labelStyles}>
				<span className={spanStyles}>{title}</span>
				<select name={title} id={title} className={selectStyles}>
					{selectOptList[0] ? (
						selectOptList.map((name, id) => {
							return (
								<option
									key={name}
									value={name}
									selected={id === defaultOptionValue}
								>
									{name}
								</option>
							);
						})
					) : (
						<option value='None'>None</option>
					)}
				</select>
			</label>
			{children}
		</li>
	);
}
export default GalleryInput;
