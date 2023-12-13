'use client';
export default function QuickCheck() {
	return (
		<div className='h-[490px] w-full flex justify-center items-center flex-col relative'>
			<div className='text-[28px] text-[#252525] mb-[42px] font-bold text-center'>
				Short on time?
				<br />
				Check your luck ambience today by one click!
			</div>

			<div className='w-[560px] h-[62px] bg-[#252525] rounded-[67.5px] cursor-pointer flex items-center justify-center'>
				<div className='text-center text-[#fff] text-[28px] font-medium   uppercase'>
					QUICK CHECK
				</div>
			</div>

			<div
				className='absolute bottom-[50px] right-[50px] border solid border-[#252525] py-2 px-[30px] cursor-pointer flex items-center h-[52px] rounded-[26px] text-[#252525] gap-3'
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}}
			>
				<div>Back to Top</div>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='12'
						height='16'
						viewBox='0 0 12 16'
						fill='none'
					>
						<path
							d='M6.92374 4.46452L10.1719 7.81257C10.5296 8.18128 11.1219 8.17963 11.4775 7.80893C11.8156 7.45656 11.814 6.89981 11.474 6.54934L6.04966 0.958221L6.00664 0.913882L5.96358 0.958173L0.539317 6.53692C0.192783 6.89333 0.19404 7.46116 0.542147 7.81602C0.902793 8.18367 1.49564 8.18154 1.85363 7.81131L5.08945 4.46487L5.08945 14.1429C5.08945 14.6494 5.50007 15.06 6.00659 15.06C6.51312 15.06 6.92374 14.6494 6.92374 14.1429L6.92374 4.46452Z'
							fill='#252525'
							stroke='#252525'
							stroke-width='0.12'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
