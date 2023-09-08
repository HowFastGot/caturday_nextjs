export function modifyDefaultTime(time: number | string) {
	if (time.toString().length > 1) return time;

	return '0' + time;
}
