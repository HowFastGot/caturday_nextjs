import clsx from 'clsx';

function UplodingResult({apiResp}: {apiResp: boolean}) {
	const style = clsx(
		'relative rounded-[20px] py-[18px] pl-[50px] bg-white font-jost font-normal text-base text-dark_gray before:bg-center before:bg-no-repeat before:absolute before:left-[20px] before:top-[50%] before:-translate-y-2/4 before:w-[20px] before:h-[20px] text-left',
		{
			'before:bg-succsess-mark': apiResp,
			'before:bg-error-mark': !apiResp,
		}
	);
	return (
		<div className={style}>
			<span>Thanks for the Upload - Cat found!</span>
		</div>
	);
}
export default UplodingResult;
