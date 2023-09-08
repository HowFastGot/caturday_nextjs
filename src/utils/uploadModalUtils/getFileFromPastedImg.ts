import {IPastedImg} from '@/types';

const getFileFromPastedImg = async (inputElem: HTMLInputElement) => {
	const imgFileObj = inputElem.files && inputElem?.files[0];


	if (!imgFileObj) return;

	const reader = new FileReader();

	reader.readAsDataURL(imgFileObj);

	const response = await new Promise<IPastedImg>((resolve, reject) => {
		reader.onload = function (e) {
			const imgData = e.target?.result;

			if (typeof imgData !== 'string') {
				throw new Error('Error occured, not string data:Blob received!');
			}

			const pastedImgInfoObj: IPastedImg = {
				url: imgData,
				name: imgFileObj.name,
				file: imgFileObj,
			};

			resolve(pastedImgInfoObj);
		};

		reader.onerror = function (e) {
			reject('Error occured while loading a file from local system!');
		};
	});

	return response;
};

export default getFileFromPastedImg;
