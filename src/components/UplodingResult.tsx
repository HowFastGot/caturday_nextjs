import clsx from 'clsx';

function UplodingResult({isSuccessServerResp}: {isSuccessServerResp: boolean}) {
	const style = clsx(
		'relative mt-5 rounded-[20px] py-[18px] pl-[50px] bg-white font-jost font-normal text-base text-dark_gray before:bg-center before:bg-no-repeat before:absolute before:left-[20px] before:top-[50%] before:-translate-y-2/4 before:w-[20px] before:h-[20px] text-left',
		{
			'before:bg-succsess-mark': isSuccessServerResp,
			'before:bg-error-mark': !isSuccessServerResp,
		}
	);
	return (
		<p className={style}>
			<span>Thanks for the Upload - Cat found!</span>
		</p>
	);
}
export default UplodingResult;
