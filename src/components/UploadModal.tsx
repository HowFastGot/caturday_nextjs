'use client';

import {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	ChangeEvent,
	DragEvent,
} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import clashImg from '/public/assets/not-found.png';
import clsx from 'clsx';
import UplodingResult from './UplodingResult';

interface IPastedImg {
	url: string;
	name: string;
}

function UploadModal() {
	const [pastedImgObj, setPastedImgObj] = useState<IPastedImg>({
		url: '',
		name: '',
	});

	const fileInputRef = useRef<HTMLInputElement>() as {
		current: HTMLInputElement;
	};

	const isPastedImgCondition = pastedImgObj.url.length !== 0;
	const pastedImgStyles = clsx(
		'h-full max-h-[200px] relative my-auto rounded-[20px]',
		{
			'object-cover': isPastedImgCondition,
			'object-contain': !isPastedImgCondition,
		}
	);

	const handleInputFileAreaClick = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();

		const fileInput = fileInputRef.current;

		fileInput.click();
	};

	const handlePasteFile = (
		e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement | HTMLElement>
	) => {
		const fileInput = fileInputRef.current;

		try {
			const imgFileObj = fileInput.files && fileInput?.files[0];

			if (!imgFileObj) return;

			const reader = new FileReader();

			reader.onload = function (e) {
				const imgData = e.target?.result;

				if (typeof imgData !== 'string') {
					throw new Error('Error occured, not string data:Blob received!');
				}

				const pastedImmLoadedObj = {
					url: imgData,
					name: imgFileObj.name,
				};

				setPastedImgObj(pastedImmLoadedObj);
			};

			reader.readAsDataURL(imgFileObj);
		} catch (error) {
			console.log('Failed sone img loading!');
		}
	};

	useEffect(() => {
		document.querySelector('body')?.classList.add('!overflow-hidden');

		return () => {
			document.querySelector('body')?.classList.remove('!overflow-hidden');
		};
	});

	const router = useRouter();
	return (
		<div className=' bg-modal_bg fixed z-30 left-0 top-0 w-full h-full box-border'>
			<div className='max-w-container m-auto w-full h-full flex justify-end items-start p-[30px] '>
				<div className='h-full max-h-[900px] min-h-[640px] flex-1 max-w-[680px] bg-prewhite relative rounded-[20px] p-5 text-center'>
					<button
						className='absolute right-5 top-5 inline-block bg-white hover:bg-peach bg-x_red_icon bg-center bg-no-repeat hover:bg-x_wh_icon p-2.5 w-10 h-10 rounded-[10px]'
						onClick={() => router.back()}
					></button>

					<h4 className='mt-[15.5%] mb-2.5 text-[36px] font-medium leading-normal text-black'>
						Upload a .jpg or .png Cat Image
					</h4>
					<h6 className='text-[20px] leading-normal font-normal text-dark_gray'>
						Any uploads must comply with the{' '}
						<span className='text-peach'>upload guidelines</span> or face
						deletion.
					</h6>
					<figure
						className='relative mt-10 mb-5 border-2 border-dashed border-peach rounded-[20px] w-full h-[38%] bg-white cursor-pointer px-10 py-5 overflow-hidden'
						onClick={handleInputFileAreaClick}
						onDragOver={handlePasteFile}
					>
						<div className='h-full w-full mx-auto relative'>
							<Image
								src={isPastedImgCondition ? pastedImgObj.url : clashImg}
								alt='Not found png'
								placeholder='blur'
								blurDataURL={isPastedImgCondition ? pastedImgObj.url : ''}
								className={pastedImgStyles}
								sizes={'(max-width:750px) 200px'}
								fill
								priority
							/>
							{!isPastedImgCondition && (
								<figcaption className='absolute z-40 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full px-1 text-[20px] font-medium text-black'>
									Drag here{' '}
									<span className='text-dark_gray font-normal'>
										your file or
									</span>{' '}
									Click here{' '}
									<span className='text-dark_gray font-normal'>to upload</span>
								</figcaption>
							)}
						</div>
					</figure>
					<div>
						<p className='text-dark_gray text-[20px]'>
							{isPastedImgCondition ? (
								<PastedImgTriggers pastedImgObj={pastedImgObj} />
							) : (
								' No file selected'
							)}
						</p>{' '}
						<input
							type='file'
							ref={fileInputRef}
							className='hidden'
							onChange={handlePasteFile}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function PastedImgTriggers({pastedImgObj}: {pastedImgObj: IPastedImg}) {
	const [isLoading, setLoading] = useState<boolean>(true);

	const loadingBtnStyles = clsx(
		'relative mt-5 text-white bg-peach hover:text-peach hover:bg-pale_peach pr-[30px] pl-[56px] py-3 rounded-[20px] text-[12px] font-medium leading-normal font-jost',
		{
			'loading-img': isLoading,
		}
	);
	return (
		<>
			<p className='text-dark_gray text-[20px]'>
				{`Image File Name: ${pastedImgObj.name}`}
			</p>
			<button className={loadingBtnStyles}>UPLOAD PHOTO</button>
			<UplodingResult apiResp={false} />
		</>
	);
}
export default UploadModal;
