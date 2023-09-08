import {IServerFeedback} from '@/types';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest, resp: NextResponse) {
	try {
		const body = await req.text(); // Получаем текст из тела запроса
		const data = JSON.parse(body); // Преобразуем его в объект
		console.log(data);

		const rawResp = await fetch('https://api.thecatapi.com/v1/favourites', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': process.env.API_KEY ?? '',
			},
		});

		if (!rawResp.ok) {
			throw new Error('Upload failure! User favorite vote was rejected!');
		}

		const serverFeedback: IServerFeedback = await rawResp.json();

		return NextResponse.json(serverFeedback);
	} catch (error) {
		console.error('Error:', error);

		NextResponse.json({error: 'Internal Server Error'});
	}
}
