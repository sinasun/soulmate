import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type TextFieldProps = {
	id: HTMLInputTypeAttribute;
	name: HTMLInputTypeAttribute;
	placeholder: HTMLInputTypeAttribute;
	type: HTMLInputTypeAttribute;
	handle: ChangeEventHandler<HTMLInputElement>;
};

const TextField = ({ id, name, placeholder, type, handle }: TextFieldProps) => (
	<div className='mb-8 mt-24'>
		<input
			required
			type={type}
			id={id}
			name={name}
			onChange={handle}
			placeholder={placeholder}
			className='bg-white border font-ubuntu outline-none border-primary  text-text-primary focus:!border-text-primary text-base rounded-3xl  block w-full px-4 py-3'
		/>
	</div>
);
export default TextField;
