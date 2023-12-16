'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
	const ref = useRef<any>();
	const [forceRedner, setForceRender] = useState(false);
	useEffect(() => {
		if (ref.current) {
			(ref.current as HTMLVideoElement).play();
		}
		const handler = () => {
			setForceRender((prev) => !prev);
		};
		window.addEventListener('resize', handler);
		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	return (
		<div className='h-[800px] relative w-full bg-[#000]  bg-opacity-40 overflow-hidden'>
			{/* <div >

			</div> */}
			<video
				ref={ref}
				src='/heropage.mp4'
				style={{
					left: Math.min(
						0,
						-(
							1728 -
							(typeof window !== 'undefined'
								? window.innerWidth
								: 1728)
						) / 2
					),
				}}
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
				<div className='mt-[150px]'>
					<svg
						width='468'
						height='122'
						viewBox='0 0 468 122'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g filter='url(#filter0_d_684_4221)'>
							<path
								d='M195.852 37.9804C195.139 36.6481 196.104 35.0361 197.615 35.0361H208.829C209.598 35.0361 210.299 35.4767 210.632 36.1695L220.199 56.0702C220.253 56.1826 220.367 56.2541 220.492 56.2541C220.616 56.2541 220.73 56.1826 220.784 56.0702L230.352 36.1695C230.685 35.4767 231.386 35.0361 232.154 35.0361H243.368C244.88 35.0361 245.845 36.6481 245.131 37.9804L227.53 70.8414L215.911 86.7083C215.655 87.0582 215.247 87.2649 214.813 87.2649C214.062 87.2649 213.453 86.6559 213.453 85.9047V71.3433C213.453 71.0138 213.372 70.6894 213.216 70.399L195.852 37.9804Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter1_d_684_4221)'>
							<path
								d='M148.76 87.2649C147.655 87.2649 146.76 86.3694 146.76 85.2649V80.0763C146.76 79.6439 146.9 79.2231 147.159 78.8771L169.049 49.6604C170.037 48.3418 169.096 46.4612 167.448 46.4612H148.862C147.757 46.4612 146.862 45.5657 146.862 44.4612V37.0361C146.862 35.9316 147.757 35.0361 148.862 35.0361H187.502C188.606 35.0361 189.502 35.9316 189.502 37.0361V42.2247C189.502 42.6571 189.362 43.0779 189.102 43.4239L167.212 72.6406C166.224 73.9592 167.165 75.8398 168.813 75.8398H187.4C188.504 75.8398 189.4 76.7353 189.4 77.8398V85.2649C189.4 86.3694 188.504 87.2649 187.4 87.2649H148.76Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter2_d_684_4221)'>
							<path
								d='M139.994 61.1507C139.994 66.9652 138.863 71.8702 136.602 75.8655C134.341 79.8439 131.289 82.8617 127.447 84.9189C123.604 86.959 119.32 87.9791 114.594 87.9791C109.833 87.9791 105.532 86.9505 101.689 84.8934C97.8642 82.8192 94.8209 79.7929 92.5597 75.8145C90.3155 71.8192 89.1934 66.9312 89.1934 61.1507C89.1934 55.3362 90.3155 50.4397 92.5597 46.4614C94.8209 42.466 97.8642 39.4482 101.689 37.408C105.532 35.3509 109.833 34.3223 114.594 34.3223C119.32 34.3223 123.604 35.3509 127.447 37.408C131.289 39.4482 134.341 42.466 136.602 46.4614C138.863 50.4397 139.994 55.3362 139.994 61.1507ZM125.407 61.1507C125.407 58.0224 124.99 55.3872 124.157 53.245C123.341 51.0858 122.125 49.4536 120.51 48.3485C118.912 47.2264 116.94 46.6654 114.594 46.6654C112.247 46.6654 110.267 47.2264 108.652 48.3485C107.053 49.4536 105.838 51.0858 105.005 53.245C104.189 55.3872 103.781 58.0224 103.781 61.1507C103.781 64.279 104.189 66.9227 105.005 69.0819C105.838 71.2241 107.053 72.8563 108.652 73.9784C110.267 75.0835 112.247 75.636 114.594 75.636C116.94 75.636 118.912 75.0835 120.51 73.9784C122.125 72.8563 123.341 71.2241 124.157 69.0819C124.99 66.9227 125.407 64.279 125.407 61.1507Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter3_d_684_4221)'>
							<path
								d='M82.7011 52.4639C82.8886 53.6192 81.9603 54.6221 80.7899 54.6221H70.417C69.3787 54.6221 68.5385 53.8184 68.2734 52.8145C68.1411 52.3133 67.9717 51.8362 67.7651 51.3833C67.34 50.4142 66.745 49.5812 65.9799 48.8841C65.2318 48.17 64.3223 47.626 63.2512 47.2519C62.1801 46.8609 60.9644 46.6654 59.6043 46.6654C57.2241 46.6654 55.2094 47.2434 53.5603 48.3995C51.9281 49.5556 50.687 51.2133 49.8369 53.3725C49.0039 55.5317 48.5873 58.1244 48.5873 61.1507C48.5873 64.347 49.0124 67.0247 49.8624 69.1839C50.7295 71.3261 51.9791 72.9413 53.6113 74.0294C55.2434 75.1005 57.2071 75.636 59.5023 75.636C60.8114 75.636 61.9845 75.4745 63.0216 75.1515C64.0587 74.8114 64.9598 74.3269 65.7249 73.6978C66.49 73.0688 67.1105 72.3122 67.5865 71.4281C67.8197 71.002 68.0168 70.5512 68.1777 70.0756C68.4964 69.1338 69.319 68.3986 70.3133 68.4056L80.82 68.4802C81.9794 68.4884 82.8973 69.4815 82.6654 70.6174C82.3541 72.143 81.8332 73.6884 81.1028 75.2535C80.0317 77.5317 78.51 79.6399 76.5379 81.5781C74.5827 83.4992 72.16 85.0464 69.2697 86.2195C66.3794 87.3926 63.0216 87.9791 59.1963 87.9791C54.4019 87.9791 50.1005 86.9505 46.2921 84.8934C42.5008 82.8362 39.5 79.8099 37.2898 75.8145C35.0966 71.8192 34 66.9312 34 61.1507C34 55.3362 35.1221 50.4397 37.3663 46.4614C39.6105 42.466 42.6368 39.4482 46.4451 37.408C50.2535 35.3509 54.5039 34.3223 59.1963 34.3223C62.4946 34.3223 65.5294 34.7728 68.3006 35.6739C71.0719 36.575 73.5031 37.8926 75.5943 39.6267C77.6855 41.3439 79.3686 43.4606 80.6437 45.9768C81.6289 47.921 82.3148 50.0833 82.7011 52.4639Z'
								fill='white'
							/>
						</g>
						<path
							d='M230.518 36.0436C230.858 35.3687 231.549 34.9429 232.304 34.9429H243.01C244.499 34.9429 245.466 36.5121 244.796 37.8422L220.47 86.1642C220.13 86.8391 219.439 87.2649 218.684 87.2649H207.978C206.489 87.2649 205.522 85.6957 206.192 84.3656L230.518 36.0436Z'
							fill='white'
						/>
						<g filter='url(#filter4_d_684_4221)'>
							<path
								d='M414.62 87.9787C410.437 87.9787 406.833 87.1796 403.807 85.5815C400.797 83.9663 398.477 81.6541 396.845 78.6448C395.229 75.6186 394.422 71.9972 394.422 67.7808C394.422 63.7345 395.238 60.1982 396.87 57.1719C398.502 54.1456 400.806 51.7909 403.781 50.1077C406.756 48.4246 410.267 47.583 414.314 47.583C417.272 47.583 419.95 48.042 422.347 48.9601C424.744 49.8782 426.793 51.2128 428.493 52.964C430.193 54.6982 431.502 56.8063 432.42 59.2886C433.338 61.7708 433.797 64.5675 433.797 67.6788V68.9431C433.797 70.0477 432.902 70.9431 431.797 70.9431H400.808C399.704 70.9431 398.808 70.0477 398.808 68.9431V65.1904C398.808 64.0859 399.704 63.1904 400.808 63.1904H418.812C419.928 63.1904 420.877 62.2458 420.476 61.204C420.344 60.8624 420.177 60.5384 419.975 60.2322C419.431 59.3651 418.692 58.6935 417.756 58.2175C416.838 57.7244 415.793 57.4779 414.62 57.4779C413.481 57.4779 412.435 57.7244 411.483 58.2175C410.531 58.6935 409.766 59.3566 409.188 60.2067C408.627 61.0567 408.329 62.0513 408.295 63.1904V71.5552C408.295 72.8133 408.559 73.9354 409.086 74.9215C409.613 75.9076 410.369 76.6811 411.355 77.2422C412.341 77.8032 413.532 78.0838 414.926 78.0838C415.895 78.0838 416.779 77.9478 417.578 77.6757C418.394 77.4037 419.091 77.0127 419.669 76.5026C419.897 76.2948 420.101 76.0711 420.282 75.8315C420.784 75.164 421.498 74.6155 422.334 74.6155H431.446C432.679 74.6155 433.629 75.7265 433.257 76.9019C432.695 78.6823 431.829 80.2833 430.661 81.7051C429.012 83.6943 426.827 85.2414 424.107 86.3465C421.403 87.4346 418.241 87.9787 414.62 87.9787Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter5_d_684_4221)'>
							<path
								d='M389.206 58.7743C389.413 59.8921 388.487 60.8442 387.35 60.8442H378.316C377.277 60.8442 376.471 59.988 375.897 59.1225C375.818 59.0038 375.732 58.8891 375.637 58.7785C375.144 58.2005 374.507 57.7584 373.725 57.4524C372.959 57.1294 372.109 56.9679 371.174 56.9679C369.967 56.9679 368.93 57.1889 368.063 57.6309C367.196 58.073 366.771 58.702 366.788 59.5181C366.771 60.0961 367.017 60.6317 367.527 61.1247C368.055 61.6178 369.066 62.0003 370.562 62.2723L378.519 63.7005C382.531 64.4315 385.515 65.6641 387.47 67.3983C389.442 69.1155 390.437 71.4192 390.454 74.3094C390.437 77.0977 389.604 79.5204 387.955 81.5776C386.323 83.6178 384.087 85.1989 381.248 86.321C378.425 87.4261 375.204 87.9787 371.582 87.9787C365.598 87.9787 360.914 86.7546 357.531 84.3063C354.794 82.3162 353.041 79.8092 352.27 76.7855C351.979 75.6408 352.918 74.6155 354.099 74.6155H364.149C365.138 74.6155 365.922 75.3846 366.443 76.2257C366.752 76.7237 367.173 77.1476 367.706 77.4972C368.76 78.1603 370.086 78.4918 371.684 78.4918C372.976 78.4918 374.039 78.2708 374.872 77.8288C375.722 77.3867 376.156 76.7577 376.173 75.9416C376.156 75.1935 375.782 74.5985 375.051 74.1564C374.337 73.7144 373.214 73.3573 371.684 73.0853L364.748 71.8612C360.752 71.1641 357.76 69.838 355.771 67.8828C353.782 65.9277 352.796 63.4114 352.813 60.3342C352.796 57.6139 353.51 55.3102 354.955 53.423C356.417 51.5189 358.5 50.0737 361.203 49.0876C363.923 48.0846 367.145 47.583 370.868 47.583C376.53 47.583 380.993 48.7561 384.257 51.1023C386.971 53.0431 388.621 55.6004 389.206 58.7743Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter6_d_684_4221)'>
							<path
								d='M324.492 87.2646C323.388 87.2646 322.492 86.3692 322.492 85.2646V50.0931C322.492 48.9885 323.388 48.0931 324.492 48.0931H334.161C335.266 48.0931 336.161 48.9885 336.161 50.0931V55.3097C336.161 55.4367 336.264 55.5397 336.391 55.5397C336.496 55.5397 336.588 55.4685 336.615 55.3672C337.331 52.7012 338.447 50.744 339.961 49.4957C341.525 48.2206 343.353 47.583 345.444 47.583C346.056 47.583 346.66 47.634 347.255 47.736C347.361 47.7507 347.466 47.7667 347.57 47.7839C348.44 47.9276 349.015 48.7211 349.015 49.6023V57.4945C349.015 58.787 347.723 59.7444 346.439 59.5946C345.419 59.4756 344.543 59.4161 343.812 59.4161C342.435 59.4161 341.194 59.7306 340.089 60.3597C339.001 60.9717 338.142 61.8388 337.513 62.9609C336.884 64.066 336.569 65.3666 336.569 66.8628V85.2646C336.569 86.3692 335.674 87.2646 334.569 87.2646H324.492Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter7_d_684_4221)'>
							<path
								d='M297.569 87.9787C293.387 87.9787 289.782 87.1796 286.756 85.5815C283.747 83.9663 281.426 81.6541 279.794 78.6448C278.179 75.6186 277.371 71.9972 277.371 67.7808C277.371 63.7345 278.187 60.1982 279.819 57.1719C281.451 54.1456 283.755 51.7909 286.73 50.1077C289.706 48.4246 293.217 47.583 297.263 47.583C300.221 47.583 302.899 48.042 305.296 48.9601C307.693 49.8782 309.742 51.2128 311.442 52.964C313.142 54.6982 314.451 56.8063 315.37 59.2886C316.288 61.7708 316.747 64.5675 316.747 67.6788V68.9431C316.747 70.0477 315.851 70.9431 314.747 70.9431H283.757C282.653 70.9431 281.757 70.0477 281.757 68.9431V65.1904C281.757 64.0859 282.653 63.1904 283.757 63.1904H301.761C302.877 63.1904 303.826 62.2458 303.425 61.204C303.293 60.8624 303.127 60.5384 302.924 60.2322C302.38 59.3651 301.641 58.6935 300.706 58.2175C299.788 57.7244 298.742 57.4779 297.569 57.4779C296.43 57.4779 295.384 57.7244 294.432 58.2175C293.48 58.6935 292.715 59.3566 292.137 60.2067C291.576 61.0567 291.278 62.0513 291.244 63.1904V71.5552C291.244 72.8133 291.508 73.9354 292.035 74.9215C292.562 75.9076 293.319 76.6811 294.305 77.2422C295.291 77.8032 296.481 78.0838 297.875 78.0838C298.844 78.0838 299.728 77.9478 300.527 77.6757C301.343 77.4037 302.04 77.0127 302.618 76.5026C302.846 76.2948 303.05 76.0711 303.231 75.8315C303.733 75.164 304.448 74.6155 305.283 74.6155H314.395C315.628 74.6155 316.578 75.7265 316.207 76.9019C315.644 78.6823 314.779 80.2833 313.61 81.7051C311.961 83.6943 309.776 85.2414 307.056 86.3465C304.353 87.4346 301.19 87.9787 297.569 87.9787Z'
								fill='white'
							/>
						</g>
						<g filter='url(#filter8_d_684_4221)'>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M231.425 48.5044C231.477 48.4014 231.402 48.2798 231.286 48.2798C231.232 48.2798 231.182 48.3083 231.154 48.355L229.457 51.1828C229.387 51.299 229.329 51.4219 229.285 51.5497L228.098 54.9319C228.094 54.9423 228.095 54.9538 228.1 54.9637C228.115 54.9937 228.158 54.9937 228.173 54.9637L231.425 48.5044ZM236.181 69.2175C235.896 69.7833 235.896 70.4504 236.181 71.0162L243.807 86.1641C244.147 86.839 244.838 87.2648 245.593 87.2648H257.479C257.479 87.2648 257.479 87.2648 257.479 87.2647C257.479 87.2647 257.479 87.2647 257.479 87.2647H258.329C258.65 87.2647 258.944 87.0837 259.088 86.7967L277.019 51.1791C277.689 49.849 276.722 48.2798 275.233 48.2798H264.527C263.772 48.2798 263.08 48.7056 262.741 49.3805L253.393 67.9485C252.654 69.4161 250.559 69.4161 249.82 67.9485L245.107 58.5848C244.368 57.1172 242.273 57.1172 241.534 58.5848L236.181 69.2175Z'
								fill='white'
							/>
						</g>
						<defs>
							<filter
								id='filter0_d_684_4221'
								x='161.613'
								y='1.03613'
								width='117.758'
								height='120.229'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter1_d_684_4221'
								x='112.76'
								y='1.03613'
								width='110.742'
								height='120.229'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter2_d_684_4221'
								x='55.1934'
								y='0.322266'
								width='118.801'
								height='121.657'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter3_d_684_4221'
								x='0'
								y='0.322266'
								width='116.725'
								height='121.657'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter4_d_684_4221'
								x='360.422'
								y='13.583'
								width='107.375'
								height='108.396'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter5_d_684_4221'
								x='318.217'
								y='13.583'
								width='106.236'
								height='108.396'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter6_d_684_4221'
								x='288.492'
								y='13.583'
								width='94.5215'
								height='107.682'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter7_d_684_4221'
								x='243.371'
								y='13.583'
								width='107.375'
								height='108.396'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
							<filter
								id='filter8_d_684_4221'
								x='194.096'
								y='14.2798'
								width='117.139'
								height='106.985'
								filterUnits='userSpaceOnUse'
								color-interpolation-filters='sRGB'
							>
								<feFlood
									flood-opacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset />
								<feGaussianBlur stdDeviation='17' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_684_4221'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_684_4221'
									result='shape'
								/>
							</filter>
						</defs>
					</svg>
				</div>
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
							minutes, to let us get to know you.
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
