'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Header() {
	const ref = useRef<any>();
	useEffect(() => {
		if (ref.current) {
			(ref.current as HTMLVideoElement).play();
		}
	}, []);
	return (
		<div className='h-[800px] relative w-full bg-[#000]  bg-opacity-40 '>
			<video
				ref={ref}
				src='/heropage.mp4'
				className='absolute left-0 right-0 bottom-0 w-full z-0 min-w-fit'
				autoPlay={true}
				loop={true}
				muted
			/>
			<div className='flex flex-col items-center justify-center h-full z-[1] relative'>
				<div className='flex text-[16px] absolute top-[18px] right-[50px] gap-[20px]   text-[#fff]'>
					<div className='flex gap-3 items-center rounded-[67.5px] bg-[#000] opacity-60 w-[133px] h-[52px] justify-center cursor-pointer'>
						Sign up
						<svg
							width='14'
							height='9'
							viewBox='0 0 14 9'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 1L7 7L13 1'
								stroke='white'
								stroke-width='2'
								stroke-linecap='round'
							/>
						</svg>
					</div>
					<div className='flex gap-3 items-center rounded-[67.5px] bg-[#000] opacity-60 w-[194px] h-[52px] justify-center cursor-pointer'>
						Browse Community
					</div>
				</div>
				<Image
					className='mt-[150px]'
					src='/logo.svg'
					alt='Cozyverse Logo'
					width={430}
					height={57.5}
					priority
				/>
				<div className='text-[36px] mt-4 max-w-full text-[#fff]'>
					<span
						className='text-primary-400 text-[40px] font-black  '
						style={{
							textShadow: '0px 0px 10px rgba(0, 0, 0, 0.70)',
						}}
					>
						3 simple steps
					</span>{' '}
					away from your own soothing universe
				</div>
				<div
					className='mt-[90px] w-[560px] h-[62px] bg-[#484BC9] rounded-[67.5px] cursor-pointer flex items-center justify-center'
					onClick={() => {
						document
							.getElementById('form')
							?.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					<div className='text-center text-[#fff] text-[28px] font-medium   uppercase'>
						START TEST
					</div>
				</div>
				<div className='flex items-stretch mb-[60px] mt-auto px-[52px]'>
					<div className='bg-[#C6C4D5] rounded-[18px] py-[21px] px-[44px] basis-[379px] max-w-[379px] flex-1'>
						<div className='text-[#252525] text-[24px] font-bold mb-[10px]'>
							Take the test
						</div>
						<div className='font-light leading-6  text-[20px] text-[#444]'>
							Complete the 14-question test, which takes about 4
							minutes, to let us get to know you
						</div>
					</div>
					<div className='flex items-center px-1'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='44'
							height='12'
							viewBox='0 0 44 12'
							fill='none'
						>
							<path
								d='M0.666667 6C0.666666 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666666 0.666667 3.05448 0.666667 6ZM32.6667 6C32.6667 8.94552 35.0545 11.3333 38 11.3333C40.9455 11.3333 43.3333 8.94552 43.3333 6C43.3333 3.05448 40.9455 0.66667 38 0.666669C35.0545 0.666669 32.6667 3.05448 32.6667 6ZM6 7L38 7L38 5L6 5L6 7Z'
								fill='#252525'
							/>
						</svg>
					</div>
					<div className='bg-[#D0CABB] rounded-[18px] py-[21px] px-[44px]   basis-[377px] max-w-[377px]  flex-1'>
						<div className='text-[#252525] text-[24px] font-bold  mb-[10px]'>
							Find out your best fit
						</div>
						<div className=' font-light  leading-6  text-[20px]  text-[#444]'>
							Based on your answers, we’ll create a unique
							soothing ambient video unit just for you.
						</div>
					</div>
					<div className='flex items-center  px-1'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='44'
							height='12'
							viewBox='0 0 44 12'
							fill='none'
						>
							<path
								d='M0.666667 6C0.666666 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666666 0.666667 3.05448 0.666667 6ZM32.6667 6C32.6667 8.94552 35.0545 11.3333 38 11.3333C40.9455 11.3333 43.3333 8.94552 43.3333 6C43.3333 3.05448 40.9455 0.66667 38 0.666669C35.0545 0.666669 32.6667 3.05448 32.6667 6ZM6 7L38 7L38 5L6 5L6 7Z'
								fill='#252525'
							/>
						</svg>
					</div>
					<div className='bg-[#BCD1BE] rounded-[18px]  py-[21px] px-[44px]   basis-[549px] max-w-[549px]  flex-1'>
						<div className='text-[#252525] text-[24px] font-bold  mb-[10px]'>
							Get relaxed, focused, or productive
						</div>
						<div className='font-light leading-6 text-[20px]  text-[#444]'>
							Set up a customized video duration, and play the
							ambient video as a supportive vibe for your work,
							study, meditation, or other activities.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
