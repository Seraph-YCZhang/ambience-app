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
		<div className='mt-[36px]'>
			<div className=' font-normal text-[20px] leading-[26px] mb-[48px] flex justify-center'>
				{isMulti
					? 'Select the colors you like'
					: 'Select your favorite color'}
			</div>

			<div className='flex gap-[40px] justify-center'>
				{colorList.map((c) => {
					return (
						<div
							key={c.code}
							className='flex flex-col gap-[10px] items-center cursor-pointer'
							onClick={() => {
								if (isMulti) {
									setSelected((prev) =>
										prev.includes(c.color)
											? prev.filter(
													(cl) => cl !== c.color
											  )
											: [...prev, c.color]
									);
								} else {
									setSelected((prev) =>
										prev.includes(c.color)
											? prev.filter(
													(cl) => cl !== c.color
											  )
											: [c.color]
									);
								}
							}}
						>
							{c.color === 'Other' ? (
								<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40" fill="none">
								<rect x="1" y="1" width="78" height="38" rx="7" stroke="#C8C8C8" stroke-width="2"/>
								<path d="M3 5L77 35" stroke="#C8C8C8" stroke-width="2" stroke-linecap="round"/>
								</svg>
							) : (
								<div
									className='w-[80px] h-[40px] rounded-[8px] flex items-center justify-center'
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
