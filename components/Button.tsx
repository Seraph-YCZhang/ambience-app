import classNames from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
	onClick: MouseEventHandler<HTMLDivElement>;
	type?: 'primary' | 'secondary' | 'disabled';
};
export default function Button({
	onClick,
	children,
	type = 'primary',
}: PropsWithChildren<ButtonProps>) {
	return (
		<div
			className={classNames(
				'mt-[90px] w-[560px] h-[72px]  rounded-[67.5px] cursor-pointer flex items-center justify-center',
				{
					'bg-[#484BC9]': type === 'primary',
					'bg-[#252525]': type === 'secondary',
					'bg-[#C8C8C8] cursor-not-allowed': type === 'disabled',
				}
			)}
			onClick={onClick}
		>
			<div className="text-center text-[#fff] text-[28px] font-medium font-['Inter'] uppercase">
				{children}
			</div>
		</div>
	);
}
