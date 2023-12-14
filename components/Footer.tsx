import Image from 'next/image';

export default function Footer() {
	return (
		<div className='min-h-[220px] w-full bg-[#252525] py-[50px] text-[#bbbfc4] flex'>
			<div className='ml-[33px] mr-[50px] w-full'>
				<div className='flex border-solid w-full'>
					<div className='flex-1'>
						<Image
							src='/logo.svg'
							alt='Cozyverse Logo'
							width={215}
							height={29}
							priority
						/>
						<div className='ml-2 mt-4 text-[14px] max-w-[400px]'>
							An AI-powered platform that generates unique ambient
							videos based on the your very own needs
						</div>
						<div className='mt-auto text-[14px] flex flex-col gap-5 pt-4'>
							<div className='border solid border-[#bbbfc4] py-2 px-4 cursor-pointer flex items-center w-[140px] h-[52px] rounded-[26px]'>
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
							<div className=' ml-2 flex justify-between items-end'>
								<div>© 2023 Cozyverse</div>
								<div className='flex gap-[30px] ml-[auto]'>
									<Image
										className=' cursor-pointer'
										alt='discord'
										width={26}
										height={26}
										src='/discord.png'
									/>
									<Image
										className=' cursor-pointer'
										alt='ins'
										width={26}
										height={26}
										src='/ins.png'
									/>
									<Image
										className=' cursor-pointer'
										alt='tt'
										width={26}
										height={26}
										src='/tiktok.png'
									/>
									<Image
										className=' cursor-pointer'
										alt='youtube'
										width={26}
										height={26}
										src='/youtube.png'
									/>
									<Image
										className=' cursor-pointer'
										alt='red'
										width={26}
										height={26}
										src='/red.png'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='ml-auto pl-[100px] flex gap-[50px] items-end text-[#fff] text-[16px]'>
						<div className='flex flex-col gap-4'>
							<div className='text-[16px] font-semibold'>
								Team
							</div>
							<a className='hover:underline cursor-pointer font-light'>
								About Cozyverse
							</a>
							<a className='hover:underline cursor-pointer  font-light'>
								Our team
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Newsroom
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Jobs
							</a>
						</div>

						<div className='flex flex-col gap-4'>
							<div className='text-[16px] font-semibold'>
								Resources
							</div>
							<a className='hover:underline cursor-pointer font-light'>
								Tutorials
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Privacy policy
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Ambient Video Gallery
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Terms of service
							</a>
						</div>

						<div className='flex flex-col gap-4'>
							<div className='text-[16px] font-semibold'>
								Legal
							</div>
							<a className='hover:underline cursor-pointer font-light'>
								Community
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Cookie policy
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								Our user stories
							</a>
							<a className='hover:underline cursor-pointer font-light'>
								California Privacy Notice
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
