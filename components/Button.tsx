import classNames from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
	onClick: MouseEventHandler<HTMLDivElement>;
	type?: 'primary' | 'secondary' | 'disabled';
	className?: string;
};
export default function Button({
	onClick,
	children,
	type = 'primary',
	className = '',
}: PropsWithChildren<ButtonProps>) {
	return (
		<div
			className={classNames(
				'rounded-[67.5px] cursor-pointer flex items-center justify-center',
				{
					'bg-[#484BC9]': type === 'primary',
					'bg-[#252525]': type === 'secondary',
					'bg-[#C8C8C8] cursor-not-allowed': type === 'disabled',
				},
				className
			)}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
