import {getPlaiceholder} from 'plaiceholder';

async function generateBlur(url: string) {
	try {
		const buffer = await fetch(url).then(async (res) =>
			Buffer.from(await res.arrayBuffer())
		);

		const {base64} = await getPlaiceholder(buffer);

		return {base64};
	} catch (err) {
		err;
	}
}
export default generateBlur;
