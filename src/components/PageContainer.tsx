import Image from 'next/image';
import Link from 'next/link';

import {ILayoutProps} from '@/types';

interface IVoitingPageProps extends ILayoutProps {}

function PageContainer({children}: IVoitingPageProps) {
	return (
		<>
			<section className='min-h-[501px] h-full mt-2.5 py-5 px-5 bg-white rounded-[20px] flex items-start justify-start gap-x-2.5 flex-wrap'>
				{children}
			</section>
		</>
	);
}
export default PageContainer;
