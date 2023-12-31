'use client';
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

export default function Checkbox({
	value,
	onChange,
	type = 'checkbox',
	className = '',
	defaultValue = false,
}: {
	value?: boolean;
	onChange?: (v: boolean) => void;
	type?: 'checkbox' | 'toggle';
	className?: string;
	defaultValue?: boolean;
}) {
	const [isChecked, setIsChecked] = useState(value ?? defaultValue ?? false);
	const ref = useRef<HTMLInputElement>(null);

	const handleOnChange = () => {
		const _v = !isChecked;
		setIsChecked(_v);
		onChange && onChange(_v);
	};
	useEffect(() => {
		typeof value !== 'undefined' && setIsChecked(value);
	}, [value]);

	if (type === 'toggle') {
		return (
			<div
				className={classnames(
					'relative w-[86px] h-[34px] rounded-[70px] border cursor-pointer',
					{
						'bg-[#C8C8C8]': !isChecked,
						'bg-[#DADBF4]': isChecked,
						'border-[#DADBF4]': !isChecked,
						'border-[#C8C8C8]': isChecked,
						'text-[#484BC9]': isChecked,
						'text-[rgba(255,255,255,0.90)]': !isChecked,
					},
					className
				)}
				onClick={() => ref.current?.click()}
			>
				<input
					ref={ref}
					className='peer shrink-0
			appearance-none w-full h-full rounded-sm bg-white cursor-pointer z-[1]'
					type='checkbox'
					checked={isChecked}
					onChange={handleOnChange}
				/>
				<div
					className='absolute h-full flex items-center text-[12px] top-0 '
					style={{
						left: isChecked ? '14px' : undefined,
						right: isChecked ? undefined : '14px',
					}}
				>
					{isChecked ? 'On' : 'Off'}
				</div>
				<div
					className='rounded-[18px] w-[42px] h-[32px] absolute top-[0px]'
					style={{
						backgroundColor: '#484BC9',
						left: isChecked ? '42px' : '0px',
						transition: 'all 0.5s ease',
					}}
				></div>
			</div>
		);
	}

	return (
		<div
			className={classnames(
				'relative w-[42px] h-[42px] box-border rounded-lg border-2 border-[#D1D1D1] cursor-pointer',
				{
					'bg-[#fff]': !isChecked,
					'bg-[#484BC9]': isChecked,
					'border-[#D1D1D1]': !isChecked,
					'border-[#484BC9]': isChecked,
				},
				className
			)}
		>
			<input
				className='peer shrink-0
        appearance-none w-full h-full rounded-lg bg-white cursor-pointer'
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
