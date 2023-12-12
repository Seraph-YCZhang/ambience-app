'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ColorItem = {
	color: string;
	code: string;
	textColor: string;
};
const colorList: ColorItem[] = [
	{
		color: 'Red',
		code: 'C23838',
		textColor: 'B42323',
	},
	{
		color: 'Yellow',
		code: 'F4DE6C',
		textColor: 'A78D00',
	},
	{
		color: 'Green',
		code: '64C238',
		textColor: '42A912',
	},
	{
		color: 'Blue',
		code: '3878C2',
		textColor: '2262AF',
	},
	{
		color: 'Purple',
		code: '8E38C2',
		textColor: '7A20B1',
	},
	{
		color: 'White',
		code: 'FFF',
		textColor: '838383',
	},
	{
		color: 'Black',
		code: '000',
		textColor: '252525',
	},
	{
		color: 'Beige',
		code: 'BC9B69',
		textColor: '997135',
	},
	{
		color: 'Other',
		code: '',
		textColor: '252525',
	},
];

export default function ColorPicker({
	isMulti,
	onChange,
}: {
	isMulti: boolean;
	onChange?: (v: string[]) => void;
}) {
	const [selected, setSelected] = useState<string[]>([]);
	useEffect(() => {
		if (!isMulti && selected.length > 1) {
			setSelected((prev) => [...prev.slice(0, 1)]);
		}
	}, [isMulti]);
	useEffect(() => {
		onChange && onChange(selected);
	}, [selected]);
	return (
		<div className='mt-[40px]'>
			<div className=' font-normal text-[28px] mb-[50px] flex justify-center'>
				{isMulti
					? 'Select the colors you like'
					: 'Select your favorite color'}
			</div>

			<div className='flex gap-[60px]'>
				{colorList.map((c) => {
					return (
						<div
							key={c.code}
							className='flex flex-col gap-[10px] items-center cursor-pointer'
							onClick={() => {
								if (isMulti) {
									setSelected((prev) => [...prev, c.color]);
								} else {
									setSelected((prev) => [c.color]);
								}
							}}
						>
							{c.color === 'Other' ? (
								<input
									placeholder='Type in your favorite color...'
									className='w-[355px] px-[20px] h-[60px] rounded-[10px] border-2 border-[#D1D1D1] outline-none'
								/>
							) : (
								<div
									className='w-[60px] h-[60px] rounded-[10px] flex items-center justify-center'
									style={{ background: `#${c.code}` }}
								>
									{selected.includes(c.color) &&
										(c.color === 'White' ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='34'
												height='23'
												viewBox='0 0 34 23'
												fill='none'
											>
												<path
													d='M3 9.16667L13.1867 19.2986C13.5768 19.6866 14.207 19.6866 14.5971 19.2986L30.9838 3'
													stroke='#838383'
													stroke-width='5'
													stroke-linecap='round'
												/>
											</svg>
										) : (
											<Image
												src='/mark.svg'
												alt='mark'
												width={28}
												height={17}
												priority
											/>
										))}
								</div>
							)}
							<div style={{ color: `#${c.textColor}` }}>
								{c.color}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
