import { ChangeEventHandler } from "react";

const TextField = (handleEmail: ChangeEventHandler<HTMLInputElement>) => {
	return (
		<div className='mb-8 mt-24'>
			<input
				required
				type='email'
				id='email'
				name='email'
				onChange={handleEmail}
				placeholder='Your Email Address'
				className='bg-white border outline-none border-primary  text-text-primary focus:!border-text-primary text-base rounded-3xl  block w-full px-4 py-3'
			/>
		</div>
	);
};

export default TextField;
