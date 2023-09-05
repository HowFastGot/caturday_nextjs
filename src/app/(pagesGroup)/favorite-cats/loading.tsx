import Image from 'next/image';
import loadingImg from '/public/assets/Loading.png';

function LoadingPage() {
	return (
		<figure className='w-full main_container flex justify-center items-center '>
			<Image
				src={loadingImg}
				alt='Loading img'
				className='animate-spin'
				placeholder='blur'
				priority
			/>
		</figure>
	);
}
export default LoadingPage;
