import {modifyDefaultTime} from './actionInfoBar';

const parceProperDate = (time: number): string => {
	const dateObject = new Date(time);

	let hours: number | string = dateObject.getHours();
	let minutes: number | string = dateObject.getMinutes();

	return `${modifyDefaultTime(hours)}:${modifyDefaultTime(minutes)} `;
};

export default parceProperDate;
