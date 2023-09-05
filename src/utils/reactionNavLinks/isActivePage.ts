import {Path} from '@/types';

function isActivePage(
	browserPathName: string,
	manualPath: Path,
	index: number
) {
	switch (index) {
		case 0:
			return browserPathName === manualPath;
		case 1:
			return browserPathName === manualPath;
		case 2:
			return browserPathName === manualPath;

		default:
			throw new Error('Accidentally was added a new path to a page!');
	}
}

export default isActivePage;
