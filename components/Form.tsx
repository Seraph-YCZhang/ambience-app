'use client';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import ColorPicker from './ColorPicker';
import classNames from 'classnames';
import Modal from 'react-modal';
import Image from 'next/image';
import { useTimer } from 'react-timer-hook';
import { SortableItem } from './SortableItem';
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
type SectionProps = {
	curSection: number;
	totalSection: number;
	text: string;
};
const Section = ({ curSection, totalSection, text }: SectionProps) => {
	return (
		<div className='w-full h-[124px] flex items-center justify-center'>
			<div className="text-center text-[#484BC9] text-[28px] font-extrabold font-['Inter'] uppercase">
				Section {curSection} / {totalSection} - {text}
			</div>
		</div>
	);
};

const sectionTextMap: Record<ISection, string> = {
	1: 'Let us get to know you',
	2: 'Let us get to know you',
};

type ISection = 1 | 2;

type Option = {
	value: string;
	text: string;
	num?: number;
};

type Question = {
	question: string;
	values: string[] | boolean[];
	extra?: any;
	//    allowMultiple: boolean,
	options: Option[];
	key: string;
	isTwoLine?: boolean;
	sortable?: boolean;
};

type QuestionForm = Record<number, { title: string; questions: Question[] }>;

const genInitForm = (): QuestionForm => {
	return {
		1: {
			title: 'Let us get to know you',
			questions: [
				{
					question:
						'Do you have a favorite color that always makes you feel good?',
					values: [],
					key: 'color',
					options: [
						{
							text: 'Yes, I have one favorite color and it always brings a sense of comfort and positivity.',
							value: 'yes',
						},
						{
							text: `No, I don't have a specific favorite color that consistently affects my mood.`,
							value: 'no',
						},
						{
							text: 'I enjoy a variety of colors, and different ones make me feel good at different times.',
							value: 'multi',
						},
					],
				},
				{
					question:
						'Which of the following statements best describes you?',
					values: [],
					key: 'people',
					options: [
						{
							text: 'I seeking quiet and solitude when feeling bad',
							value: 'no_people',
						},
						{
							text: `I like to seeking social support when I'm bad mood`,
							value: 'have_people',
						},
					],
				},
				{
					question: `When you see others engaging in activities or achieving goals <br /> you aspire to, what typically goes through your mind?`,
					values: [],
					key: 'activity',
					options: [
						{
							text: 'Motivation - I see it as encouragement as it fuels my determination to strive harder for my aspirations',
							value: 'motivation',
						},
						{
							text: 'Envy - I experience a sense of envy or jealousy, wishing I could achieve the same',
							value: 'envy',
						},
						{
							text: `Indifference - I don't pay much attention to what others are doing in relation to my goals`,
							value: 'indifference',
						},
						{
							text: `Disheartened - I take it as external pressure that makes me feel discouraged`,
							value: 'disheartened',
						},
					],
				},
				{
					question: `How do you agree with this statement: <br />
                        I enjoy embracing changes and try out new things`,
					values: [],
					key: 'embracing_changes',
					options: [
						{
							text: 'Strongly Agree - I actively seek and embrace change, finding it invigorating and full of opportunities',
							value: 'strongly_agree',
						},
						{
							text: 'Agree - I generally welcome change and view it as a chance for growth and improvement',
							value: 'agree',
						},
						{
							text: `Neutral - I am open to change but prefer a balance between stability and new experiences`,
							value: 'neutral',
						},
						{
							text: `Disagree - I find change challenging and prefer stability in most areas of my life`,
							value: 'disagree',
						},
						{
							text: `Strongly Disagree - I resist change and feel uncomfortable when faced with new situations or circumstances`,
							value: 'strongly_disagree',
						},
					],
				},

				{
					question: `Choose your favorite one from the following movies`,
					values: [],
					key: 'favorite_movies',
					isTwoLine: true,
					options: [
						{
							text: 'Roman Holiday',
							value: 'roman_holiday',
						},
						{
							text: 'Dune',
							value: 'dune',
						},
						{
							text: 'Raise The Red Lantern',
							value: 'raise_the_red_lantern',
						},
						{
							text: 'Cyberpunk',
							value: 'cyberpunk',
						},
						{
							text: 'Titanic',
							value: 'titanic',
						},
						{
							text: 'Flipped',
							value: 'flipped',
						},
						{
							text: 'Rain Man',
							value: 'rain_man',
						},
						{
							text: 'The God Father',
							value: 'the_god_father',
						},
					],
				},
			],
		},
		2: {
			title: 'tailor the ambience that fits you best',
			questions: [
				{
					question: `What's your most desired type of environment at this time?`,
					values: [],
					key: 'desired_environment',
					options: [
						{
							text: 'Calming',
							value: 'calming',
						},
						{
							text: 'Energetic',
							value: 'energetic',
						},
						{
							text: 'Mysterious',
							value: 'mysterious',
						},
						{
							text: 'Futuristic',
							value: 'futuristic',
						},
					],
				},
				{
					question: `Does a natural environment or a human-made environment make you feel more calm at this time?`,
					values: [],
					key: 'favorite_movies',
					options: [
						{
							text: 'Natural environment - I like to feel the connection with the Earth',
							value: 'natural',
						},
						{
							text: `Human-made environment - I'm more used to city life`,
							value: 'human_made',
						},
					],
				},
				{
					question: `At this time, I feel more calm staying indoor as opposed to outdoor`,
					values: [],
					key: 'indoor_outdoor',
					options: [
						{
							text: 'Strongly Agree',
							value: 'strongly_agree',
						},
						{
							text: `Agree`,
							value: 'agree',
						},
						{
							text: `Neutral`,
							value: 'neutral',
						},
						{
							text: `Disagree`,
							value: 'disagree',
						},
						{
							text: `Strongly Disagree`,
							value: 'strongly_disagree',
						},
					],
				},
				{
					question: `Rank the following scenes in order of your preference, with being the 
				most preferred and 5 being the least preferred:`,
					values: [
						{
							text: 'Potted plants scattered around the room for a touch of nature',
							value: 'Potted plants scattered around the room for a touch of nature',
							num: 1,
						},
						{
							text: `A sleepy cat basking by the fireplace`,
							value: 'A sleepy cat basking by the fireplace',
							num: 2,
						},
						{
							text: `Bird feeders strategically placed to attract feathered visitors to the balcony`,
							value: 'Bird feeders strategically placed to attract feathered visitors to the balcony',
							num: 3,
						},
						{
							text: `A dog sunbathing on a comfortable pet bed`,
							value: 'A dog sunbathing on a comfortable pet bed',
							num: 4,
						},
						{
							text: `A guinea pig grazing ample fresh hay besides comfy hideouts and tunnels`,
							value: 'A guinea pig grazing ample fresh hay besides comfy hideouts and tunnels',
							num: 5,
						},
					].map((i) => i.value),
					key: 'prefer_scenes',
					sortable: true,
					options: [
						{
							text: 'Potted plants scattered around the room for a touch of nature',
							value: 'Potted plants scattered around the room for a touch of nature',
							num: 1,
						},
						{
							text: `A sleepy cat basking by the fireplace`,
							value: 'A sleepy cat basking by the fireplace',
							num: 2,
						},
						{
							text: `Bird feeders strategically placed to attract feathered visitors to the balcony`,
							value: 'Bird feeders strategically placed to attract feathered visitors to the balcony',
							num: 3,
						},
						{
							text: `A dog sunbathing on a comfortable pet bed`,
							value: 'A dog sunbathing on a comfortable pet bed',
							num: 4,
						},
						{
							text: `A guinea pig grazing ample fresh hay besides comfy hideouts and tunnels`,
							value: 'A guinea pig grazing ample fresh hay besides comfy hideouts and tunnels',
							num: 5,
						},
					],
				},
				{
					question: `Which of the following activities would best help you unwind after a long day?`,
					values: [],
					key: 'activity',
					isTwoLine: true,
					options: [
						{
							text: 'Read a book',
							value: 'Read a book',
						},
						{
							text: `Listen to music`,
							value: 'Listen to music',
						},
						{
							text: `Meditation`,
							value: 'Meditation',
						},
						{
							text: `Getting a good sleep`,
							value: 'Getting a good sleep',
						},
						{
							text: `Have comfort food`,
							value: 'Have comfort food',
						},
						{
							text: `Watch TV`,
							value: 'Watch TV',
						},
						{
							text: `Workout`,
							value: 'Workout',
						},

						{
							text: `Tidy up the room`,
							value: 'Tidy up the room',
						},

						{
							text: `Engage in a creative hobby`,
							value: 'Engage in a creative hobby',
						},

						{
							text: `Other`,
							value: 'Other',
						},
					],
				},
				{
					question: `Is there a specific type of weather can put you in a calming mood right now?`,
					values: [],
					key: 'weather',

					options: [
						{
							text: 'Sunny and clear',
							value: 'Sunny and clear',
						},
						{
							text: `Cloudy`,
							value: 'Cloudy',
						},
						{
							text: `Rainy`,
							value: 'Rainy',
						},
						{
							text: `Snowy`,
							value: `Snowy`,
						},
						{
							text: `Mild/breezy`,
							value: 'Mild/breezy',
						},
						{
							text: `No specific preference`,
							value: 'No specific preference',
						},
					],
				},
				{
					question: `Which sounds do you find relaxing? Please select all that apply or add your own`,
					values: [],
					key: 'sounds',

					options: [
						{
							text: 'Ocean waves',
							value: 'Ocean waves',
						},
						{
							text: `Birdsong`,
							value: 'Birdsong',
						},
						{
							text: `Rainfall`,
							value: 'Rainfall',
						},
						{
							text: `Crackling fireplace`,
							value: `Crackling fireplace`,
						},
						{
							text: `Thunderstorms`,
							value: 'Thunderstorms',
						},
						{
							text: `Other`,
							value: 'Other',
						},
					],
				},
				{
					question: `Which scents or smells do you find relaxing at this time?`,
					values: [],
					key: 'smells',
					isTwoLine: true,
					options: [
						{
							text: 'Sandalwood',
							value: 'Sandalwood',
						},
						{
							text: `Citrus`,
							value: 'Citrus',
						},
						{
							text: `Fresh Rain`,
							value: 'Fresh Rain',
						},
						{
							text: `Ocean Breeze`,
							value: 'Ocean Breeze',
						},
						{
							text: `Fallen snow`,
							value: `Fallen snow`,
						},
						{
							text: `Coffee smell`,
							value: `Coffee smell`,
						},
						{
							text: `Tea aromas`,
							value: `Tea aromas`,
						},
						{
							text: `Vanilla`,
							value: `Vanilla`,
						},

						{
							text: `Hot chocolate`,
							value: 'Hot chocolate',
						},

						{
							text: `No specific preference`,
							value: `No specific preference`,
						},

						{
							text: `Other`,
							value: `Other`,
						},
					],
				},
			],
		},
	};
};

const Digit = ({ digit }: { digit: number }) => (
	<div className='digit'>
		<div className='stick one' style={getRotation(digit, 0)}>
			<div className='stick three' style={getRotation(digit, 2)}>
				<div className='stick seven' style={getRotation(digit, 6)} />
			</div>
		</div>
		<div className='stick two' style={getRotation(digit, 1)}>
			<div className='stick four' style={getRotation(digit, 3)}>
				<div className='stick five' style={getRotation(digit, 4)} />
			</div>
		</div>
		<div className='stick six' style={getRotation(digit, 5)} />
	</div>
);

function getRotation(digit: any, stick: any) {
	const digitMap = [
		[90, 270, 90, 270, 270, 90, 90],
		[90, -90, 0, 360, 360, 90, 0],
		[90, 0, 90, 450, 90, 90, 0],
		[90, 270, 90, 270, 360, 0, 0],
		[0, 270, 270, 360, 360, 90, 0],
		[0, 270, 270, 270, 360, 0, 270],
		[0, 270, -90, 270, 270, 0, -90],
		[90, 270, 90, 360, 360, 90, 0],
		[90, 270, 90, 270, 270, 0, 90],
		[90, 270, 90, 360, 360, 0, 90],
	].map((d) => d.map((s) => ({ transform: `rotate(${s}deg)` })));
	return digitMap[digit][stick];
}

export default function Form() {
	const [curSection, setCurSection] = useState<ISection>(1);
	const [questionNum, setQuestionNum] = useState(0);
	const [questionForm, setQuestionForm] = useState(() => genInitForm());
	const [showModal, setShowModal] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	useEffect(() => {
		const onFullScreenChange = () => {
			if (document.fullscreenElement) {
				setIsFullScreen(true);
			} else {
				setIsFullScreen(false);
			}
		};
		document.addEventListener('fullscreenchange', onFullScreenChange);
	}, []);

	const [timerExpanded, setTimeExpanded] = useState(true);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const [colors, setColors] = useState<string[]>([]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setQuestionForm((prev) => {
				const items = prev[2].questions.find(
					(q) => q.sortable
				)?.options;
				if (!items || !over) {
					return prev;
				}
				const oldIndex = items.findIndex(
					(item) => item.value === active.id
				);
				const newIndex = items.findIndex(
					(item) => item.value === over.id
				);
				const newOptions = arrayMove(items, oldIndex, newIndex);
				return {
					...prev,
					2: {
						...prev[2],
						questions: prev[2].questions.map((q) => {
							if (q.sortable) {
								return {
									...q,
									options: newOptions,
									values: newOptions.map((op) => op.value),
								};
							} else {
								return { ...q };
							}
						}),
					},
				};
			});
		}
	};

	// console.log('debug', questionForm[1].questions[0].extra?.selectedOption)

	const renderQuestion = (question: Question) => {
		let _options = [[...question.options]];
		if (question.isTwoLine) {
			let midPoint = Math.ceil(question.options.length / 2);

			let arrayA = question.options.slice(0, midPoint);
			let arrayB = question.options.slice(midPoint);
			_options = [[...arrayA], [...arrayB]];
		}
		return (
			<div
				className={classNames(
					'w-full flex justify-center flex-col items-center',
					{
						'px-[240px]': !question.sortable,
						'px-[200px]': question.sortable,
					}
				)}
			>
				<div className='flex font-normal gap-[20px]  text-[28px] leading-10 mb-[40px]'>
					<div
						className={`text-[#252525] text-[28px] font-bold font-['Inter'] leading-10 shrink-0`}
					>
						Question {questionNum + 1}/
						{questionForm[curSection].questions.length}
					</div>
					<div
						dangerouslySetInnerHTML={{ __html: question.question }}
					/>
				</div>
				<div className='flex flex-col gap-[30px] w-full'>
					<div
						className={classNames('w-full flex', {
							'justify-around': !question.sortable,
						})}
					>
						{_options &&
							_options.map((ops, index) => {
								if (question.sortable) {
									return (
										<SortableContext
											items={ops.map((op) => op.value)}
											strategy={
												verticalListSortingStrategy
											}
											key={index}
										>
											<div className='w-full flex flex-col gap-[10px]'>
												{ops.map((op, idx) => {
													const onChange = (
														v: boolean
													) => {
														setQuestionForm(
															(prev) => {
																return {
																	...prev,
																	[curSection]:
																		{
																			...prev[
																				curSection
																			],

																			questions:
																				prev[
																					curSection
																				].questions.map(
																					(
																						q
																					) => {
																						if (
																							q.key !==
																							question.key
																						) {
																							return q;
																						} else {
																							if (
																								curSection ===
																									1 &&
																								questionNum ===
																									0
																							) {
																								if (
																									v
																								) {
																									return {
																										...q,
																										values: [
																											op.value,
																										],
																										extra: {
																											selectedOption:
																												v,
																										},
																									};
																								} else {
																									return {
																										...q,
																										values: [],
																										extra: {
																											selectedOption:
																												undefined,
																										},
																									};
																								}
																							}
																							return {
																								...q,
																								values: [
																									op.value,
																								],
																							};
																						}
																					}
																				),
																		},
																};
															}
														);
													};
													return (
														<SortableItem
															id={op.value}
															key={op.value}
														>
															<div
																key={op.value}
																className='text-[#777] text-[28px] font-normal leading-10  rounded-[18px] cursor-pointer w-full'
															>
																<div className='flex items-center gap-[20px] w-full'>
																	<div className='bg-[#FFF] text-[#252525] w-[84px] h-[84px] rounded-[18px] flex items-center justify-center'>
																		{op.num}
																	</div>
																	<div className='flex bg-[#FFF] py-[22px] px-[44px] rounded-[18px] items-center flex-1'>
																		<div>
																			{
																				op.text
																			}
																		</div>
																		<div className='ml-auto'>
																			<svg
																				width='24'
																				height='24'
																				viewBox='0 0 24 24'
																				fill='none'
																				xmlns='http://www.w3.org/2000/svg'
																			>
																				<path
																					d='M2 22H22'
																					stroke='#444444'
																					stroke-width='4'
																					stroke-linecap='round'
																				/>
																				<path
																					d='M2 12H22'
																					stroke='#444444'
																					stroke-width='4'
																					stroke-linecap='round'
																				/>
																				<path
																					d='M2 2H22'
																					stroke='#444444'
																					stroke-width='4'
																					stroke-linecap='round'
																				/>
																			</svg>
																		</div>
																	</div>
																</div>
																{op.value ===
																	'Other' &&
																	questionNum !==
																		0 &&
																	curSection !==
																		1 &&
																	(
																		questionForm[
																			curSection
																		]
																			.questions[
																			questionNum
																		]
																			.values as string[]
																	).includes(
																		op.value
																	) && (
																		<input
																			placeholder='Type in...'
																			className='mt-[30px] w-[355px] px-[20px] h-[60px] rounded-[10px] border-2 border-[#D1D1D1] outline-none'
																		/>
																	)}
															</div>
														</SortableItem>
													);
												})}
											</div>
										</SortableContext>
									);
								}
								return (
									<div className='flex flex-col' key={index}>
										{ops.map((op) => {
											const onChange = (v: boolean) => {
												setQuestionForm((prev) => {
													return {
														...prev,
														[curSection]: {
															...prev[curSection],

															questions: prev[
																curSection
															].questions.map(
																(q) => {
																	if (
																		q.key !==
																		question.key
																	) {
																		return q;
																	} else {
																		if (
																			curSection ===
																				1 &&
																			questionNum ===
																				0
																		) {
																			if (
																				v
																			) {
																				return {
																					...q,
																					values: [
																						op.value,
																					],
																					extra: {
																						selectedOption:
																							v,
																					},
																				};
																			} else {
																				return {
																					...q,
																					values: [],
																					extra: {
																						selectedOption:
																							undefined,
																					},
																				};
																			}
																		}
																		return {
																			...q,
																			values: [
																				op.value,
																			],
																		};
																	}
																}
															),
														},
													};
												});
											};
											return (
												<div
													key={op.value}
													className='text-[#777] text-[28px] font-normal leading-10 hover:bg-[#DADBF4] rounded-[18px] px-[30px] py-[15px] cursor-pointer'
													onClick={() => {
														onChange(
															!(
																questionForm[
																	curSection
																].questions[
																	questionNum
																]
																	.values as string[]
															).includes(op.value)
														);
													}}
												>
													<div className='flex items-center  '>
														<Checkbox
															value={(
																questionForm[
																	curSection
																].questions[
																	questionNum
																]
																	.values as string[]
															).includes(
																op.value
															)}
														/>
														<div className='ml-[28px]'>
															{op.text}
														</div>
													</div>
													{op.value === 'Other' &&
														questionNum !== 0 &&
														curSection !== 1 &&
														(
															questionForm[
																curSection
															].questions[
																questionNum
															].values as string[]
														).includes(
															op.value
														) && (
															<input
																placeholder='Type in...'
																className='mt-[30px] w-[355px] px-[20px] h-[60px] rounded-[10px] border-2 border-[#D1D1D1] outline-none'
															/>
														)}
												</div>
											);
										})}
									</div>
								);
							})}
					</div>
					{questionNum === 0 &&
						curSection === 1 &&
						questionForm[1].questions[0].extra?.selectedOption !==
							undefined &&
						!(
							questionForm[1].questions[0].values as string[]
						).includes('no') && (
							<ColorPicker
								isMulti={(
									questionForm[1].questions[0]
										.values as string[]
								).includes('multi')}
								onChange={(v) => {
									setColors(v);
									// setQuestionForm((prev) => {
									// 	return {
									// 		...prev,
									// 		1: {
									// 			...prev[1],
									// 			questions:
									// 				prev[1].questions.map(
									// 					(q, idx) => {
									// 						if (idx === 0) {
									// 							return {
									// 								...q,
									// 								values: v,
									// 							};
									// 						} else {
									// 							return {
									// 								...q,
									// 							};
									// 						}
									// 					}
									// 				),
									// 		},
									// 	};
									// });
								}}
							/>
						)}
				</div>
			</div>
		);
	};

	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp: (() => {
			const dt = new Date();
			dt.setSeconds(0);
			return dt;
		})(),
		onExpire: () => console.warn('onExpire called'),
	});

	const getHours = () => [~~(hours / 10), hours % 10];
	const getMins = () => [~~(minutes / 10), minutes % 10];
	const getSecs = () => [~~(seconds / 10), seconds % 10];

	const [modalStep, setModalStep] = useState(1);

	useEffect(() => {
		if (!showModal) [setModalStep(1)];
	}, [showModal]);

	// console.log(
	// 	'debug per',
	// 	questionNum / (questionForm[curSection].questions.length - 1),
	// 	questionNum,
	// 	questionForm[curSection].questions.length
	// );

	console.log(
		'debug timer',
		getHours(),
		getMins(),
		getSecs(),
		hours,
		minutes,
		seconds,
		isRunning
	);

	return (
		<div className='w-full' id='form'>
			<Modal
				isOpen={showModal}
				style={{
					overlay: {
						background: 'rgba(0, 0, 0, 0.56)',
					},
					content: {
						width: '1082px',
						height: '750px',
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						padding: '0',
						borderRadius: '16px',
						boxShadow:
							'0px 2px 21px 0px rgba(0, 0, 0, 0.15), 0px 32px 64px 0px rgba(0, 0, 0, 0.19)',
					},
				}}
			>
				{modalStep === 1 && (
					<div className='w-full h-full flex flex-col justify-center items-center gap-10'>
						<div
								className='absolute top-[30px] right-[30px] cursor-pointer'
								onClick={() => setShowModal(false)}
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M19 1L10.7071 9.29289C10.3166 9.68342 10.3166 10.3166 10.7071 10.7071L19 19'
										stroke='#252525'
										stroke-width='2'
										stroke-linecap='round'
									/>
									<path
										d='M1 19L9.29289 10.7071C9.68342 10.3166 9.68342 9.68342 9.29289 9.29289L1 1'
										stroke='#252525'
										stroke-width='2'
										stroke-linecap='round'
									/>
								</svg>
							</div>
						<div className='text-[20px] text-[#252525] max-w-[793px] font-semibold'>
							Before we finalize your ambient video unit, do you
							want to add some Christmas atmosphere to your
							ambience?
						</div>
						<div>
							<Image
								src='/form_image_1.png'
								width={617}
								height={224}
								alt='form_img'
							/>
						</div>
						<div className='flex items-center gap-6 text-[20px] text-[#252525] font-semibold'>
							<Checkbox type='toggle' /> Add Christmas vibes
						</div>
						<div
							className={classNames(
								'w-[516px] h-[72px] bg-[#484BC9] rounded-[67.5px] cursor-pointer flex items-center justify-center'
							)}
							onClick={() => {
								setModalStep(2);
							}}
						>
							<div className="text-center text-[#fff] text-[28px] font-medium font-['Inter'] uppercase">
								Confirm
							</div>
						</div>
					</div>
				)}
				{modalStep === 2 && (
					<div className='w-full h-full flex flex-col'>
						<div className='relative p-[30px] shrink-0'>
							<div
								className='absolute top-[30px] right-[30px] cursor-pointer'
								onClick={() => setShowModal(false)}
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M19 1L10.7071 9.29289C10.3166 9.68342 10.3166 10.3166 10.7071 10.7071L19 19'
										stroke='#252525'
										stroke-width='2'
										stroke-linecap='round'
									/>
									<path
										d='M1 19L9.29289 10.7071C9.68342 10.3166 9.68342 9.68342 9.29289 9.29289L1 1'
										stroke='#252525'
										stroke-width='2'
										stroke-linecap='round'
									/>
								</svg>
							</div>
							<div className='text-[#252525] text-[20px] font-semibold mb-[18px]'>
								We&lsquo;ve created the video unit for you! You
								can decide how long you want the{' '}
							</div>
							<div className='text-[#444] text-[20px] font-medium underline cursor-pointer'>
								Publish video unit to community
							</div>
						</div>
						<div
							className='relative flex-1'
							id='generated-image-ctn'
						>
							<video
								src='/unit.mp4'
								autoPlay
								loop
								muted
								style={{
									width: '100%',
									height: '100%',
									position: 'relative',
								}}
							/>
							<div className='absolute right-6 bottom-6 flex gap-4'>
								<div className='rounded-[50%] w-[55px] h-[55px] bg-[#484BC9] border-[#000] border-solid border flex items-center justify-center'>
									<svg
										width='16'
										height='14'
										viewBox='0 0 16 14'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 13.2422C12 13.1536 12.0156 13.0833 12.0469 13.0312C12.0833 12.974 12.1302 12.9141 12.1875 12.8516C12.2604 12.7786 12.3385 12.7109 12.4219 12.6484C12.5052 12.5807 12.5859 12.5104 12.6641 12.4375C13.0391 12.0938 13.3724 11.7135 13.6641 11.2969C13.9557 10.875 14.2005 10.4297 14.3984 9.96094C14.5964 9.49219 14.7448 9.00781 14.8438 8.50781C14.9479 8.00781 15 7.50521 15 7C15 6.5 14.9479 6 14.8438 5.5C14.7448 4.99479 14.5938 4.50781 14.3906 4.03906C14.1927 3.5651 13.9479 3.11719 13.6562 2.69531C13.3698 2.27344 13.0391 1.89323 12.6641 1.55469C12.5859 1.48177 12.5052 1.41406 12.4219 1.35156C12.3385 1.28385 12.2604 1.21354 12.1875 1.14062C12.125 1.07812 12.0781 1.02083 12.0469 0.96875C12.0156 0.916667 12 0.84375 12 0.75C12 0.609375 12.0469 0.492188 12.1406 0.398438C12.2396 0.304688 12.3594 0.257812 12.5 0.257812C12.5625 0.257812 12.6172 0.268229 12.6641 0.289062C12.7109 0.304688 12.7604 0.330729 12.8125 0.367188C13.0469 0.518229 13.2786 0.710938 13.5078 0.945312C13.737 1.17969 13.9531 1.43229 14.1562 1.70312C14.3646 1.96875 14.5547 2.24219 14.7266 2.52344C14.8984 2.80469 15.0443 3.07031 15.1641 3.32031C15.4401 3.89844 15.6484 4.4974 15.7891 5.11719C15.9297 5.73177 16 6.35938 16 7C16 7.63542 15.9297 8.26562 15.7891 8.89062C15.6484 9.51042 15.4401 10.1068 15.1641 10.6797C15.0443 10.9245 14.8984 11.1901 14.7266 11.4766C14.5547 11.7578 14.3646 12.0339 14.1562 12.3047C13.9479 12.5703 13.7292 12.8203 13.5 13.0547C13.2708 13.2891 13.0417 13.4818 12.8125 13.6328C12.7552 13.6693 12.7031 13.6979 12.6562 13.7188C12.6146 13.7344 12.5625 13.7422 12.5 13.7422C12.3646 13.7422 12.2474 13.6927 12.1484 13.5938C12.0495 13.4948 12 13.3776 12 13.2422ZM3.29688 10H1.5C1.29688 10 1.10417 9.96094 0.921875 9.88281C0.739583 9.80469 0.578125 9.69792 0.4375 9.5625C0.302083 9.42188 0.195312 9.26042 0.117188 9.07812C0.0390625 8.89583 0 8.70312 0 8.5V5.5C0 5.29688 0.0390625 5.10417 0.117188 4.92188C0.195312 4.73958 0.302083 4.58073 0.4375 4.44531C0.578125 4.30469 0.739583 4.19531 0.921875 4.11719C1.10417 4.03906 1.29688 4 1.5 4H3.29688L5.71875 1.57031C5.79167 1.4974 5.8724 1.44531 5.96094 1.41406C6.05469 1.3776 6.15104 1.35938 6.25 1.35938C6.46354 1.35938 6.64062 1.42969 6.78125 1.57031C6.92708 1.71094 7 1.88802 7 2.10156V11.8984C7 12.0026 6.97917 12.099 6.9375 12.1875C6.90104 12.276 6.84635 12.3568 6.77344 12.4297C6.70573 12.4974 6.625 12.5521 6.53125 12.5938C6.44271 12.6302 6.34896 12.6484 6.25 12.6484C6.04167 12.6484 5.86458 12.5755 5.71875 12.4297L3.29688 10ZM10.0312 11.4453C10.0312 11.3568 10.0443 11.2891 10.0703 11.2422C10.1016 11.1953 10.1458 11.138 10.2031 11.0703C10.4896 10.7474 10.7448 10.4375 10.9688 10.1406C11.1927 9.84375 11.3802 9.53906 11.5312 9.22656C11.6823 8.90885 11.7969 8.57031 11.875 8.21094C11.9583 7.85156 12 7.44792 12 7C12 6.55208 11.9583 6.14844 11.875 5.78906C11.7969 5.42969 11.6823 5.09375 11.5312 4.78125C11.3802 4.46354 11.1927 4.15625 10.9688 3.85938C10.7448 3.5625 10.4896 3.2526 10.2031 2.92969C10.1458 2.86198 10.1016 2.80469 10.0703 2.75781C10.0443 2.71094 10.0312 2.64323 10.0312 2.55469C10.0312 2.41927 10.0807 2.30469 10.1797 2.21094C10.2839 2.11198 10.4036 2.0625 10.5391 2.0625C10.6172 2.0625 10.6771 2.07292 10.7188 2.09375C10.7604 2.10938 10.8125 2.14062 10.875 2.1875C11.0312 2.30729 11.1849 2.45573 11.3359 2.63281C11.4922 2.80469 11.638 2.98958 11.7734 3.1875C11.9141 3.38542 12.0417 3.58854 12.1562 3.79688C12.2708 4 12.3672 4.19271 12.4453 4.375C12.8151 5.20833 13 6.08333 13 7C13 7.91667 12.8151 8.79167 12.4453 9.625C12.3724 9.79167 12.276 9.98177 12.1562 10.1953C12.0417 10.4036 11.9141 10.612 11.7734 10.8203C11.6328 11.0234 11.4844 11.2135 11.3281 11.3906C11.1771 11.5677 11.026 11.7083 10.875 11.8125C10.8177 11.849 10.763 11.8802 10.7109 11.9062C10.6641 11.9271 10.6068 11.9375 10.5391 11.9375C10.4036 11.9375 10.2839 11.8906 10.1797 11.7969C10.0807 11.6979 10.0312 11.5807 10.0312 11.4453ZM6 11.2891V2.70312L3.85156 4.85156C3.7526 4.95052 3.63542 5 3.5 5H1.5C1.36458 5 1.2474 5.04948 1.14844 5.14844C1.04948 5.2474 1 5.36458 1 5.5V8.5C1 8.63542 1.04948 8.7526 1.14844 8.85156C1.2474 8.95052 1.36458 9 1.5 9H3.5C3.63542 9 3.7526 9.04948 3.85156 9.14844L6 11.2891ZM8.09375 9.53906C8.09375 9.46615 8.10156 9.40885 8.11719 9.36719C8.13802 9.32552 8.16927 9.27604 8.21094 9.21875C8.33073 9.03646 8.4401 8.86198 8.53906 8.69531C8.63802 8.52344 8.72135 8.35156 8.78906 8.17969C8.85677 8.0026 8.90885 7.82031 8.94531 7.63281C8.98177 7.4401 9 7.22917 9 7C9 6.77604 8.98177 6.56771 8.94531 6.375C8.90885 6.18229 8.85677 6 8.78906 5.82812C8.72135 5.65104 8.63802 5.47917 8.53906 5.3125C8.4401 5.14062 8.33073 4.96354 8.21094 4.78125C8.16927 4.72396 8.13802 4.67448 8.11719 4.63281C8.10156 4.59115 8.09375 4.53385 8.09375 4.46094C8.09375 4.32552 8.14323 4.20833 8.24219 4.10938C8.34115 4.01042 8.45833 3.96094 8.59375 3.96094C8.68229 3.96094 8.75521 3.97656 8.8125 4.00781C8.86979 4.03906 8.92708 4.08594 8.98438 4.14844C9.15104 4.33073 9.29688 4.53646 9.42188 4.76562C9.54688 4.98958 9.65104 5.22917 9.73438 5.48438C9.82292 5.73438 9.88802 5.98958 9.92969 6.25C9.97656 6.51042 10 6.76042 10 7C10 7.22917 9.97656 7.47656 9.92969 7.74219C9.88802 8.0026 9.82292 8.26302 9.73438 8.52344C9.65104 8.77865 9.54427 9.02344 9.41406 9.25781C9.28906 9.48698 9.14583 9.6849 8.98438 9.85156C8.875 9.97135 8.74479 10.0312 8.59375 10.0312C8.45833 10.0312 8.34115 9.98438 8.24219 9.89062C8.14323 9.79167 8.09375 9.67448 8.09375 9.53906Z'
											fill='white'
											fill-opacity='0.8956'
										/>
									</svg>
								</div>
								<div
									className='rounded-[50%] w-[55px] h-[55px]  bg-[#484BC9] flex items-center justify-center'
									onClick={() => {
										const elem = document.getElementById(
											'generated-image-ctn'
										);
										if (!elem) {
											return;
										}

										if (!document.fullscreenElement) {
											elem.requestFullscreen().catch(
												(err) => {
													alert(
														`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
													);
												}
											);
										} else {
											document.exitFullscreen();
										}
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='55'
										height='55'
										viewBox='0 0 55 55'
										fill='none'
									>
										<rect
											x='0.5'
											y='0.5'
											width='54'
											height='54'
											rx='27'
											fill='#484BC9'
											stroke='black'
										/>
										<path
											d='M18.6312 31.6391V35.5484C18.6312 36.1007 19.0789 36.5484 19.6312 36.5484H23.5404'
											stroke='white'
											stroke-width='2'
											stroke-linecap='round'
										/>
										<path
											d='M36.3688 23.3648V19.4555C36.3688 18.9033 35.9211 18.4555 35.3688 18.4555H31.4596'
											stroke='white'
											stroke-width='2'
											stroke-linecap='round'
										/>
										<path
											d='M23.3639 18.6343L19.4546 18.6343C18.9023 18.6343 18.4546 19.082 18.4546 19.6343L18.4546 23.5435'
											stroke='white'
											stroke-width='2'
											stroke-linecap='round'
										/>
										<path
											d='M31.6361 36.3696L35.5454 36.3696C36.0976 36.3696 36.5453 35.9219 36.5454 35.3696L36.5454 31.4604'
											stroke='white'
											stroke-width='2'
											stroke-linecap='round'
										/>
									</svg>
								</div>
							</div>
							{!isFullScreen && (
								<div
									className='absolute left-6 bottom-6 pt-3 pb-6 rounded-[7px] min-w-[277px]'
									style={{
										background: 'rgba(252, 252, 252, 0.85)',
										border: '1px solid rgba(0, 0, 0, 0.06)',
									}}
								>
									<div
										className={classNames(
											' px-[22px] pb-2 text-[#252525] relative',
											{
												'flex items-center':
													!timerExpanded,
											}
										)}
										style={{
											borderBottom: timerExpanded
												? '1px solid rgba(153, 153, 153, 0.50)'
												: undefined,

											paddingBottom: timerExpanded
												? undefined
												: '0px',
										}}
									>
										<div className='text-[20px] font-semibold'>
											Timer setup
										</div>
										{timerExpanded && (
											<div className=' text-[16px] font-normal max-w-[440px]'>
												Before we process your final
												video, please tell us how long
												you want the video duration to
												be
											</div>
										)}
										<div
											className={classNames(
												'absolute top-1 right-4 cursor-pointer',
												{
													'relative top-0 right-0 ml-auto':
														!timerExpanded,
												}
											)}
											onClick={() => {
												setTimeExpanded(
													(prev) => !prev
												);
											}}
										>
											{timerExpanded ? (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='38'
													height='37'
													viewBox='0 0 38 37'
													fill='none'
												>
													<path
														d='M21.1349 2.15079V15.0758C21.1349 15.6281 21.5826 16.0758 22.1349 16.0758H35.0599'
														stroke='#444444'
														stroke-width='4'
														stroke-linecap='round'
													/>
													<path
														d='M15.925 35.0016V22.0766C15.925 21.5243 15.4773 21.0766 14.925 21.0766H1.99999'
														stroke='#444444'
														stroke-width='4'
														stroke-linecap='round'
													/>
												</svg>
											) : (
												<svg
													width='34'
													height='33'
													viewBox='0 0 34 33'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M26.8868 21.0367V8.11172C26.8868 7.55944 26.4391 7.11172 25.8868 7.11172H12.9618'
														stroke='#444444'
														stroke-width='4'
														stroke-linecap='round'
													/>
													<path
														d='M7.75186 12.1117V25.0367C7.75186 25.589 8.19958 26.0367 8.75186 26.0367H21.6769'
														stroke='#444444'
														stroke-width='4'
														stroke-linecap='round'
													/>
												</svg>
											)}
										</div>
									</div>
									{timerExpanded && (
										<div className=' px-[22px] pt-[6px] '>
											<div className='flex'>
												<div>
													<div
														className='flex justify-center mb-5 rounded-[6px] p-6 w-fit'
														style={{
															background:
																'rgba(255,255,255,0.8)',
														}}
													>
														<Digit
															digit={
																getHours()[0]
															}
														/>
														<Digit
															digit={
																getHours()[1]
															}
														/>
														<div className='colon' />
														<Digit
															digit={getMins()[0]}
														/>
														<Digit
															digit={getMins()[1]}
														/>
														<div className='colon' />
														<Digit
															digit={getSecs()[0]}
														/>
														<Digit
															digit={getSecs()[1]}
														/>
													</div>
													<div
														className='cursor-pointer bg-[#484BC9] border-solid border border-[#000] rounded-[40px] relative w-full h-[55px]'
														onClick={() => {
															isRunning
																? pause()
																: start();
														}}
													>
														<svg
															className='absolute top-[20px] right-[40px]'
															width='14'
															height='16'
															viewBox='0 0 14 16'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																d='M1.99994 15.0469C1.79161 15.0469 1.59629 15.0078 1.414 14.9297C1.23171 14.8516 1.07025 14.7448 0.929626 14.6094C0.79421 14.474 0.687439 14.3151 0.609314 14.1328C0.531189 13.9505 0.492126 13.7552 0.492126 13.5469V2.45312C0.492126 2.24479 0.531189 2.04948 0.609314 1.86719C0.687439 1.6849 0.79421 1.52604 0.929626 1.39062C1.06504 1.25521 1.2239 1.14844 1.40619 1.07031C1.58848 0.992188 1.78379 0.953125 1.99213 0.953125C2.11713 0.953125 2.24213 0.96875 2.36713 1C2.49213 1.03125 2.60931 1.07812 2.71869 1.14062L12.6718 6.6875C12.9114 6.82292 13.0989 7.00781 13.2343 7.24219C13.3697 7.47135 13.4374 7.72396 13.4374 8C13.4374 8.28125 13.3697 8.53646 13.2343 8.76562C13.1041 8.99479 12.9166 9.17708 12.6718 9.3125L2.7265 14.8594C2.61713 14.9219 2.49994 14.9688 2.37494 15C2.24994 15.0312 2.12494 15.0469 1.99994 15.0469Z'
																fill='white'
																fill-opacity='0.8956'
															/>
														</svg>
													</div>
												</div>
												<div className='flex flex-col gap-2 pl-[35px]'>
													<div className='rounded-[10px] bg-[#fff] border-[#444] border-[2px] py-[12px] px-[24px] cursor-pointer'>
														Customized duration
													</div>
													<div className='flex gap-2'>
														<div
															className='flex-1 rounded-[10px] bg-[#E7E7E7] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer'
															onClick={() => {
																restart(
																	(() => {
																		const dt =
																			new Date();
																		dt.setMinutes(
																			dt.getMinutes() +
																				10
																		);
																		return dt;
																	})(),
																	false
																);
															}}
														>
															10 min
														</div>
														<div
															className='flex-1 rounded-[10px] bg-[#E7E7E7] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer'
															onClick={() => {
																restart(
																	(() => {
																		const dt =
																			new Date();
																		dt.setMinutes(
																			dt.getMinutes() +
																				30
																		);
																		return dt;
																	})(),
																	false
																);
															}}
														>
															30 min
														</div>
													</div>
													<div className='flex gap-2'>
														<div
															className='flex-1 rounded-[10px] bg-[#E7E7E7] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer'
															onClick={() => {
																restart(
																	(() => {
																		const dt =
																			new Date();
																		dt.setHours(
																			dt.getHours() +
																				1
																		);
																		return dt;
																	})(),
																	false
																);
															}}
														>
															1 hour
														</div>
														<div
															className='flex-1 rounded-[10px] bg-[#E7E7E7] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer'
															onClick={() => {
																restart(
																	(() => {
																		const dt =
																			new Date();
																		dt.setHours(
																			dt.getHours() +
																				2
																		);
																		return dt;
																	})(),
																	false
																);
															}}
														>
															2 hour
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				)}
			</Modal>
			<Section
				curSection={curSection}
				totalSection={2}
				text={sectionTextMap[curSection] || ''}
			/>
			<div className='bg-[#EEE] w-full justify-center pt-[50px] h-[804px] flex flex-col'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					{renderQuestion(
						questionForm[curSection].questions[questionNum]
					)}
				</DndContext>
				<div className='flex mt-auto'>
					{(questionNum > 0 || curSection > 1) && (
						<div
							className='text-[#444] text-[28px] font-medium flex items-center cursor-pointer select-none ml-[72px]'
							onClick={() => {
								if (questionNum === 0) {
									setCurSection(
										(prev) => (prev - 1) as ISection
									);
									setQuestionNum(
										questionForm[1].questions.length - 1
									);
								} else {
									setQuestionNum((prev) =>
										prev >= 1 ? prev - 1 : 0
									);
								}
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='32'
								viewBox='0 0 18 32'
								fill='none'
							>
								<path
									d='M16 2L2.70711 15.2929C2.31658 15.6834 2.31658 16.3166 2.70711 16.7071L16 30'
									stroke='#444444'
									stroke-width='4'
									stroke-linecap='round'
								/>
							</svg>
							<div className='w-[112px] flex justify-center'>
								Back
							</div>
						</div>
					)}
					<div
						className={classNames(
							'ml-auto  mr-[52px] w-[516px] h-[72px] bg-[#484BC9] rounded-[67.5px] cursor-pointer flex items-center justify-center',
							{
								'bg-[#C8C8C8] cursor-not-allowed':
									curSection === 1 && questionNum === 0
										? (colors.length === 0 &&
												!(
													questionForm[curSection]
														.questions[questionNum]
														.values as string[]
												).includes('no')) ||
										  questionForm[curSection].questions[
												questionNum
										  ].values.length === 0
										: questionForm[curSection].questions[
												questionNum
										  ].values.length === 0,
							}
						)}
						onClick={() => {
							if (
								curSection === 1 && questionNum === 0
									? (colors.length === 0 &&
											!(
												questionForm[curSection]
													.questions[questionNum]
													.values as string[]
											).includes('no')) ||
									  questionForm[curSection].questions[
											questionNum
									  ].values.length === 0
									: questionForm[curSection].questions[
											questionNum
									  ].values.length === 0
							) {
								return;
							}
							if (
								curSection === 2 &&
								questionNum ===
									questionForm[curSection].questions.length -
										1
							) {
								setShowModal(true);
								return;
							}
							if (
								questionNum ===
								questionForm[curSection].questions.length - 1
							) {
								setCurSection((curSection + 1) as ISection);
								setQuestionNum(0);
							} else {
								setQuestionNum((num) => num + 1);
							}
						}}
					>
						<div className="text-center text-[#fff] text-[28px] font-medium font-['Inter'] uppercase">
							{curSection === 2 &&
							questionNum ===
								questionForm[curSection].questions.length - 1
								? 'Complete'
								: 'Next'}
						</div>
					</div>
				</div>

				<div
					className='w-full relative h-[30px] mt-[40px]'
					style={{ background: 'rgba(72, 75, 201, 0.2)' }}
				>
					<div
						style={{
							width: `${
								(questionNum /
									(questionForm[curSection].questions.length -
										1)) *
								100
							}%`,
						}}
						className='absolute left-0 top-0 bottom-0 h-full bg-[#484BC9]'
					></div>
				</div>
			</div>
		</div>
	);
}
