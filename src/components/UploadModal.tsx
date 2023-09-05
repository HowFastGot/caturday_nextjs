'use client';

import {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	ChangeEvent,
	DragEvent,
	useCallback,
	useMemo,
} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import clsx from 'clsx';

import UplodingResult from './UplodingResult';
import {useHttp} from '@/hooks/useHttpHook';

import isPastedImgCondition from '@/utils/uploadModalUtils/isPastedImgCondition';
import getFileFromPastedImg from '@/utils/uploadModalUtils/getFileFromPastedImg';
import {IPastedImg, iServerUploadResp} from '@/types';

import clashImg from '/public/assets/not-found.png';

function UploadModal() {
	const [formDataGlobal, setFormDataGlobal] = useState<FormData>();
	const [pastedImgObj, setPastedImgObj] = useState<IPastedImg>({
		url: '',
		name: '',
		file: null,
	});
	const [isSuccessServerResp, setSuccessServerResp] = useState<boolean | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	const pastedImgStyles = clsx(
		'h-full max-h-[200px] relative my-auto rounded-[20px]',
		{
			'object-cover': isPastedImgCondition(pastedImgObj),
			'object-contain': !isPastedImgCondition(pastedImgObj),
		}
	);
	const figureClasses = clsx(
		'relative mt-10 mb-5 border-2 border-dashed border-peach rounded-[20px] w-full h-[38%] bg-white cursor-pointer px-10 py-5 overflow-hidden',
		{
			'!bg-pale_peach': !isSuccessServerResp && isSuccessServerResp !== null,
		}
	);

	const router = useRouter();
	const {request} = useHttp();

	const fileInputRef = useRef<HTMLInputElement>() as {
		current: HTMLInputElement;
	};

	const memoGetFileFromPastedImg = useCallback(getFileFromPastedImg, []);
	const handleInputFileAreaClick = useCallback((e: MouseEvent<HTMLElement>) => {
		e.preventDefault();

		const fileInput = fileInputRef.current;

		fileInput.click();
	}, []);

	const handlePasteFile = useCallback(
		(
			e:
				| ChangeEvent<HTMLInputElement>
				| DragEvent<HTMLInputElement | HTMLElement>
		) => {
			const fileInput = fileInputRef.current;
			try {
				memoGetFileFromPastedImg(fileInput)
					.then((res) => {
						console.log('memoGetFileFromPastedImg Response', res);
						if (!res?.file)
							throw new Error(
								'Error occured while loading a file from local system!'
							);

						setPastedImgObj(res);

						const formData = new FormData();

						formData.append('file', res.file);

						setFormDataGlobal(formData);
					})
					.catch((e) => console.log(e));
			} catch (error) {
				console.log('Failed sone img loading!');
			}
		},
		[memoGetFileFromPastedImg]
	);

	const handleUploadCatImg = useCallback(async () => {
		setLoading(true);
		const resp = await request<iServerUploadResp>(
			'https://api.thecatapi.com/v1/images/upload',
			'POST',
			formDataGlobal,
			{
				'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
			}
		);

		if (resp.url) {
			setSuccessServerResp(true);
		}

		setLoading(false);
	}, [formDataGlobal, request]);

	useEffect(() => {
		document.querySelector('body')?.classList.add('!overflow-hidden');
		let timerId: any;

		if (isSuccessServerResp !== null) {
			timerId = setTimeout(() => {
				router.back();
			}, 2000);
		}
		return () => {
			document.querySelector('body')?.classList.remove('!overflow-hidden');
			clearTimeout(timerId);
		};
	}, [isSuccessServerResp, router]);

	return (
		<div className=' bg-modal_bg fixed z-30 left-0 top-0 w-full h-full box-border overflow-auto'>
			<div className='max-w-container m-auto w-full h-full flex justify-end items-start p-[30px] '>
				<div className='h-full max-h-[900px] min-h-[740px] flex-1 max-w-[680px] bg-prewhite relative rounded-[20px] p-5 text-center'>
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
						className={figureClasses}
						onClick={handleInputFileAreaClick}
						onDragOver={handlePasteFile}
					>
						<div className='h-full w-full mx-auto relative'>
							<Image
								src={
									isPastedImgCondition(pastedImgObj)
										? pastedImgObj.url
										: clashImg
								}
								alt='Not found png'
								placeholder='blur'
								blurDataURL={
									isPastedImgCondition(pastedImgObj) ? pastedImgObj.url : ''
								}
								className={pastedImgStyles}
								sizes={'(max-width:750px) 200px'}
								fill
								priority
							/>
							{!isPastedImgCondition(pastedImgObj) && (
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
					<div className='text-dark_gray text-[20px]'>
						{isPastedImgCondition(pastedImgObj) ? (
							<PastedImgTriggers
								pastedImgObj={pastedImgObj}
								handleUploadCatImg={handleUploadCatImg}
								loading={loading}
								isSuccessServerResp={isSuccessServerResp}
							/>
						) : (
							' No file selected'
						)}

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

function PastedImgTriggers({
	pastedImgObj,
	handleUploadCatImg,
	loading,
	isSuccessServerResp,
}: {
	pastedImgObj: IPastedImg;
	handleUploadCatImg: () => void;
	loading: boolean;
	isSuccessServerResp: boolean | null;
}) {
	const loadingBtnStyles = clsx(
		'relative mt-5 text-white bg-peach hover:text-peach hover:bg-pale_peach pr-[30px] pl-[56px] py-3 rounded-[20px] text-[12px] font-medium leading-normal font-jost',
		{
			'loading-img': loading,
		}
	);
	return (
		<>
			<p className='text-dark_gray text-[20px]'>
				{`Image File Name: ${pastedImgObj.name}`}
			</p>
			<button className={loadingBtnStyles} onClick={handleUploadCatImg}>
				UPLOAD PHOTO
			</button>
			{isSuccessServerResp !== null ? (
				<UplodingResult isSuccessServerResp={isSuccessServerResp} />
			) : null}
		</>
	);
}
export default UploadModal;
