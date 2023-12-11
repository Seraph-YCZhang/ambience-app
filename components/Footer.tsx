import Image from 'next/image';

export default function Footer() {
	return (
		<div className='h-[420px] w-full bg-[#393939] px-[240px] py-[40px] text-[#bbbfc4] flex flex-col'>
			<div className='flex'>
				<div>
					<Image
						src='/logo.svg'
						alt='Cozyverse Logo'
						width={215}
						height={29}
						priority
					/>
				</div>
			</div>
			<div className='mt-auto'>
            © 2023 XYG Studio
            </div>
		</div>
	);
}
