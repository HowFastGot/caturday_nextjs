import ReactionNavLinks from '@/components/ReactionNavBar';
import {ILayoutProps} from '@/types';

function Toolbar() {
	return (
		<>
			<div className='flex w-full items-center justify-center gap-2.5'>
				<label className="after:bg-input_lense relative w-full after:absolute after:!right-2.5 after:top-1/2 after:ml-0.5 after:inline-block after:h-10 after:w-10 after:-translate-y-1/2 after:cursor-pointer after:rounded-[10px] after:bg-pale_peach after:bg-center after:bg-no-repeat after:text-peach after:content-[''] ">
					<input
						type='text'
						placeholder='Search for breeds by name'
						className='h-[60px] w-full flex-auto rounded-[20px] p-2 placeholder:text-[20px] placeholder:text-dark_gray hover:placeholder:text-white hover:border-pale_peach hover:border-2 hover:border-solid'
					/>
				</label>
				<ReactionNavLinks />
			</div>
		</>
	);
}
export default Toolbar;
