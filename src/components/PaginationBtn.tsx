import Image from 'next/image';
import {useState} from 'react';

import paginationArrow from '/public/assets/gallery/pagination_arrow.png';
import paginationRedArrow from '/public/assets/gallery/pagination_red_arrow.png';

function PaginationBtn() {
	const [isImgHovered, setIsImgHovered] = useState(false);

	return (
		<>
			<button
				className='rounded-[10px] py-3 px-[11px] bg-white hover:bg-peach cursor-pointer last:self-end'
				onMouseEnter={() => setIsImgHovered(true)}
				onMouseLeave={() => setIsImgHovered(false)}
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
