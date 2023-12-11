'use client';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

export default function Checkbox({
	value,
	onChange,
}: {
	value: boolean;
	onChange?: (v: boolean) => void;
}) {
	const [isChecked, setIsChecked] = useState(value);

	const handleOnChange = () => {
		const _v = !isChecked;
		setIsChecked(_v);
		onChange && onChange(_v);
	};
	useEffect(() => {
		setIsChecked(value);
	}, [value]);

	return (
		<div
			className={classnames(
				'relative w-[48px] h-[48px] rounded-lg border-2 border-[#D1D1D1] cursor-pointer',
				{
					'bg-[#fff]': !isChecked,
					'bg-[#484BC9]': isChecked,
					'border-[#D1D1D1]': !isChecked,
					'border-[#484BC9]': isChecked,
				}
			)}
		>
			<input
				className='peer shrink-0
        appearance-none w-full h-full rounded-sm bg-white cursor-pointer'
				type='checkbox'
				checked={isChecked}
				onChange={handleOnChange}
			/>
			{isChecked && (
				<span className='absolute w-full h-full flex items-center justify-center pointer-events-none inset-0 cursor-pointer'>
					<Image
						src='/mark.svg'
						alt='Cozyverse Logo'
						width={28}
						height={17}
						priority
					/>
				</span>
			)}
			{/* You can add label text or other elements here */}
		</div>
	);
}
