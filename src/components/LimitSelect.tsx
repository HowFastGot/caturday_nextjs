import {ChangeEvent} from 'react';

function LimitSelect({
	changeQueryLimit,
}: {
	changeQueryLimit: (limit: string) => any;
}) {
	return (
		<>
			<label
				htmlFor='limit_select'
				className='realtive inline-block select_after bg-prewhite text-dark_gray rounded-[10px] overflow-hidden hover:outline hover:outline-2 hover:outline-pale_peach'
			>
				<select
					id='limit_select'
					name='breads'
					className='relative w-[89px] cursor-pointer bg-prewhite leading-6 px-2.5 py-2 appearance-none'
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						changeQueryLimit(e.target.value)
					}
				>
					<option value='5'>Limit: 5</option>
					<option value='10'>Limit: 10</option>
					<option value='15'>Limit: 15</option>
					<option value='20'>Limit: 20</option>
				</select>
			</label>
		</>
	);
}
export default LimitSelect;
