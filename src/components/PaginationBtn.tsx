import Image from 'next/image';
import {useCallback, useState, MouseEvent, useEffect} from 'react';

import paginationArrow from '/public/assets/gallery/pagination_arrow.png';
import paginationRedArrow from '/public/assets/gallery/pagination_red_arrow.png';

function PaginationBtn({setNumberPage}: {setNumberPage: (prop: any) => void}) {
	const [pageCount, setPageCount] = useState<string>('0');
	const [isImgHovered, setIsImgHovered] = useState(false);

	const handleChangePaginationPage = useCallback(() => {
		setPageCount((prev: any) => (parseInt(prev) + 1).toString());
	}, []);

	useEffect(() => {
		setNumberPage(pageCount);
	}, [setNumberPage, pageCount]);

	return (
		<>
			<button
				className='rounded-[10px] py-3 px-[11px] bg-white hover:bg-peach cursor-pointer last:self-end'
				onMouseEnter={() => setIsImgHovered(true)}
				onMouseLeave={() => setIsImgHovered(false)}
				onClick={handleChangePaginationPage}
			>
				<Image
					src={isImgHovered ? paginationArrow : paginationRedArrow}
					alt='Pagination circle arrow'
				/>
			</button>
		</>
	);
}
export default PaginationBtn;
