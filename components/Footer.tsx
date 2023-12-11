import Image from 'next/image';

export default function Footer() {
	return (
		<div className='min-h-[220px] w-full bg-[#393939] px-[240px] py-[40px] text-[#bbbfc4] flex flex-col'>
			<div className='flex border-b-[1px] border-solid border-[#fff] pb-4'>
				<div>
					<Image
						src='/logo.svg'
						alt='Cozyverse Logo'
						width={215}
						height={29}
						priority
					/>
					<div className='ml-2 mt-4 text-[14px] max-w-[400px]'>
						Cozyverse is a platform created by XYG studio, at here, you can create, enjoy and share your cozy
						world!
					</div>
				</div>
				<div className='pl-[120px] flex gap-10 text-[20px] items-center'>
					<a className='hover:underline cursor-pointer'>About us</a>
					<a className='hover:underline cursor-pointer'>
						Terms of Service
					</a>
					<a className='hover:underline cursor-pointer'>
						Privacy Policy
					</a>
					<a className='hover:underline cursor-pointer'>Contact us</a>
					<a className='hover:underline cursor-pointer'>Community</a>
				</div>
			</div>
			<div className='mt-auto text-[14px] flex gap-6 items-center pt-4'>
				<div className='rounded-[6px] border solid border-[#bbbfc4] py-2 px-4 cursor-pointer flex items-center w-[140px]'>
					<div>English</div>
					<div className='ml-auto'>
						<svg
							width='24px'
							height='24px'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z'
								fill='#fff'
							/>
						</svg>
					</div>
				</div>
				<div>© 2023 XYG Studio</div>
			</div>
		</div>
	);
}
