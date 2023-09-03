import Link from 'next/link';

function UploadImgButton() {
	return (
		<Link href='/login' className='ml-auto'>
			<button className='group relative pl-[55px] pr-[30px] py-3 bg-pale_peach rounded-[10px] hover:bg-peach  text-peach hover:text-white '>
				<span className='uppercase text-[12px] leading-[16px] tracking-[0.0125em] text-center font-medium before:w-[16px] before:h-[16px] before:content-`` before:inline-block before:absolute before:left-[30px] before:top-2/4 before:-translate-y-2/4 before:bg-upload_red group-hover:before:bg-upload_wh bg-center before:bg-no-repeat'>
					upload
				</span>
			</button>
		</Link>
	);
}
export default UploadImgButton;
