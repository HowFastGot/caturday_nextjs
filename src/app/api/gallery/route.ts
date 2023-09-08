import {ICatCart} from '@/types';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest, resp: NextResponse) {
	const paginationPage = req.nextUrl.searchParams.getAll;

	try {
		const rawResponse = await fetch(
			`https://api.thecatapi.com/v1/images/search?page=${paginationPage}`,
			{
				headers: {
					'x-api-key': process.env.API_KEY ?? '',
					'Content-Type': 'application/json',
				},
			}
		);

		if (!rawResponse.ok) {
			throw new Error(`Could not fetch ${req.url}, status: ${resp.status}`);
		}

		const data: ICatCart[] = await rawResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error:', error);

		NextResponse.json({error: 'Internal Server Error'});
	}
}
