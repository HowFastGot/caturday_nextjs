import Image from 'next/image';
import Link from 'next/link';

import {ILayoutProps} from '@/types';

interface IVoitingPageProps extends ILayoutProps {}

function PageContainer({children}: IVoitingPageProps) {
	return (
		<>
			<section className='relative main_container w-full mt-5 py-5 px-5 bg-white rounded-[20px]'>
				{children}
			</section>
		</>
	);
}
export default PageContainer;
