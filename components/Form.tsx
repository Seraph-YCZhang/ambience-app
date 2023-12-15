'use client';
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
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useTimer } from 'react-timer-hook';
import Checkbox from './Checkbox';
import ColorPicker from './ColorPicker';
import { SortableItem } from './SortableItem';
import {
	AirdropIcon,
	AudioIcon,
	AudioOff,
	CloseTimer,
	ExpandTimer,
	FullScreenIcon,
	QuitFullScreen,
	TimerIcon,
} from './icons';
import Button from './Button';
type SectionProps = {
	curSection: number;
	totalSection: number;
	text: string;
};
const Section = ({ curSection, totalSection, text }: SectionProps) => {
	return (
		<div className='w-full h-[124px] flex items-center justify-center'>
			<div className='text-center text-[#484BC9] text-[28px] font-extrabold   uppercase'>
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
                        <i>"I enjoy embracing changes and try out new things"</i>`,
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
						{
							text: 'The Lord of the Rings',
							value: 'the_lord_of_the_rings',
						},
						{
							text: `Other`,
							value: 'Other',
						},
					],
				},

				{
					question: `Do you have a favorite time of day when you feel most relaxed`,
					values: [],
					key: 'favorite_time',
					options: [
						{
							text: 'Morning',
							value: 'Morning',
						},
						{
							text: 'Noon',
							value: 'Noon',
						},
						{
							text: 'Afternoon',
							value: 'Afternoon',
						},
						{
							text: 'Night',
							value: 'Night',
						},
						{
							text: `No specific time`,
							value: 'no_specific',
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
					isTwoLine: true,
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
							text: `Thunderstorms`,
							value: 'Thunderstorms',
						},
						{
							text: `Crackling fireplace`,
							value: 'Crackling fireplace',
						},
						{
							text: `Snowfall`,
							value: 'Snowfall',
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
							text: 'Citrus',
							value: 'Citrus',
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

	const [timerExpanded, setTimeExpanded] = useState(false);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	const firstModal = useRef(true);

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
					'w-full flex justify-center flex-col items-center px-[140px]'
				)}
			>
				<div className='flex font-normal gap-[20px]  text-[20px] leading-[30px] mb-[36px]'>
					<div
						className={`text-[#252525] text-[20px] font-bold   leading-[30px] shrink-0`}
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
						className={classNames('w-full flex gap-[50px]', {
							'justify-center': !question.sortable,
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
																className='text-[#777] text-[20px] font-normal leading-10  rounded-[8px] cursor-pointer w-full'
															>
																<div className='flex items-center gap-[10px] w-full'>
																	<div className='bg-[#FFF] text-[#252525] w-[62px] h-[62px] rounded-[8px] flex items-center justify-center'>
																		{op.num}
																	</div>
																	<div className='flex bg-[#FFF] py-[16px] px-[50px] rounded-[8px] items-center flex-1  text-[20px] leading-[30px]'>
																		<div>
																			{
																				op.text
																			}
																		</div>
																		<div className='ml-auto'>
																			<svg
																				width='22'
																				height='18'
																				viewBox='0 0 22 18'
																				fill='none'
																				xmlns='http://www.w3.org/2000/svg'
																			>
																				<path
																					d='M1 1H21'
																					stroke='#444444'
																					stroke-width='2'
																					stroke-linecap='round'
																				/>
																				<path
																					d='M1 9H21'
																					stroke='#444444'
																					stroke-width='2'
																					stroke-linecap='round'
																				/>
																				<path
																					d='M1 17H21'
																					stroke='#444444'
																					stroke-width='2'
																					stroke-linecap='round'
																				/>
																			</svg>
																		</div>
																	</div>
																</div>
																{op.value ===
																	'Other' &&
																	!(
																		questionNum ===
																			0 &&
																		curSection ===
																			1
																	) &&
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
																			value={
																				questionForm[
																					curSection
																				]
																					.questions[
																					questionNum
																				]
																					.extra
																					?.other
																			}
																			onChange={(
																				e
																			) => {
																				questionForm[
																					curSection
																				].questions[
																					questionNum
																				].extra =
																					questionForm[
																						curSection
																					]
																						.questions[
																						questionNum
																					]
																						.extra ??
																					{};
																				console.log(
																					'hh',
																					e
																						.target
																						.value
																				);
																				// questionForm[
																				// 	curSection
																				// ].questions[
																				// 	questionNum
																				// ].extra.other =
																				// 	e.target.value;
																				setQuestionForm(
																					(
																						prev
																					) => ({
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
																										) => ({
																											...q,
																											extra: {
																												...(q.extra ||
																													{}),
																												other: e
																													.target
																													.value,
																											},
																										})
																									),
																							},
																					})
																				);
																			}}
																			placeholder='Type in...'
																			className='mt-[20px] px-[20px] py-[8px] rounded-[8px] border-2 border-[#D1D1D1] outline-none  text-[16px] leading-6 w-full'
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
												<>
													<div
														key={op.value}
														className='text-[#777] text-[20px] font-normal leading-10 hover:bg-[#DADBF4] rounded-[18px] px-[60px] py-[10px] cursor-pointer'
														onClick={() => {
															onChange(
																!(
																	questionForm[
																		curSection
																	].questions[
																		questionNum
																	]
																		.values as string[]
																).includes(
																	op.value
																)
															);
														}}
													>
														<div className='flex items-center '>
															<Checkbox
																className=' shrink-0'
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
													</div>
													{op.value === 'Other' &&
														!(
															questionNum === 0 &&
															curSection === 1
														) &&
														(
															questionForm[
																curSection
															].questions[
																questionNum
															].values as string[]
														).includes(
															op.value
														) && (
															<div className='w-full px-[50px]'>
																<input
																	value={
																		questionForm[
																			curSection
																		]
																			.questions[
																			questionNum
																		].extra
																			?.other
																	}
																	onChange={(
																		e
																	) => {
																		questionForm[
																			curSection
																		].questions[
																			questionNum
																		].extra =
																			questionForm[
																				curSection
																			]
																				.questions[
																				questionNum
																			]
																				.extra ??
																			{};

																		setQuestionForm(
																			(
																				prev
																			) => ({
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
																								) => ({
																									...q,
																									extra: {
																										...(q.extra ||
																											{}),
																										other: e
																											.target
																											.value,
																									},
																								})
																							),
																					},
																			})
																		);
																		console.log(
																			'de e',
																			e
																				.target
																				.value
																		);
																	}}
																	placeholder={
																		question.question.includes(
																			'sounds'
																		)
																			? 'Your relaxing sound...'
																			: 'Type in' +
																			  (question.question.includes(
																					'movies'
																			  )
																					? ' your movie'
																					: question.question.includes(
																							'activi'
																					  )
																					? ' your activity'
																					: '') +
																			  '...'
																	}
																	className='mt-[20px]  px-[20px] py-[10px] rounded-[8px] border-2 border-[#D1D1D1] outline-none text-[16px] leading-6 w-full'
																/>
															</div>
														)}
												</>
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
	const [audioOn, setAudioOn] = useState(true);

	useEffect(() => {
		if (!showModal) [setModalStep(1)];
	}, [showModal]);

	useEffect(() => {
		if (
			showModal &&
			!timerExpanded &&
			firstModal.current &&
			modalStep === 2
		) {
			setTimeout(() => {
				setTimeExpanded(true);
				firstModal.current = false;
			}, 1000);
		}
	}, [showModal, timerExpanded, modalStep]);

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
				onAfterOpen={() => {
					document.body.style.top = `-${window.scrollY}px`;
					document.body.style.position = 'fixed';
				}}
				onAfterClose={() => {
					const scrollY = document.body.style.top;
					document.body.style.position = '';
					document.body.style.top = '';
					window.scrollTo(0, parseInt(scrollY || '0') * -1);
				}}
				isOpen={showModal}
				style={{
					overlay: {
						background: 'rgba(0, 0, 0, 0.56)',
						position: 'fixed',
						zIndex: 2,
					},
					content: {
						overflow: 'visible',
						width: '898px',
						height: '760px',
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						padding: '0',
						borderRadius: '8px',
						border: 0,
						boxShadow:
							'0px 2px 21px 0px rgba(0, 0, 0, 0.15), 0px 32px 64px 0px rgba(0, 0, 0, 0.19)',
					},
				}}
			>
				{modalStep === 1 && (
					<div className='w-full h-full flex flex-col justify-center items-center pt-[60px] pb-[65px] model-step-one  rounded-lg'>
						<div
							className='absolute z-[1] top-[-26px] right-[-26px] cursor-pointer bg-[#fff] rounded-full w-[52px] h-[52px] flex items-center justify-center'
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
						<div className='text-[20px] text-[#252525] font-semibold max-w-[575px] mb-[24px] text-center'>
							Before we finalize your ambient video unit, do you
							want to add some Christmas atmosphere to your
							ambience?
						</div>
						<div className='w-[898px] min-h-[360px]'>
							<Image
								src='/santa.gif'
								width={898}
								height={360}
								style={{ width: '100%' }}
								alt='form_img'
							/>
						</div>
						<div className='flex items-center gap-6 text-[16px] text-[#252525] font-normal mt-[63px] mb-[49px]'>
							Add Christmas vibes{' '}
							<Checkbox type='toggle' defaultValue={true} />
						</div>
						<div
							className={classNames(
								'w-[560px] h-[62px] bg-[#484BC9] rounded-[67.5px] cursor-pointer flex items-center justify-center'
							)}
							onClick={() => {
								setModalStep(2);
							}}
						>
							<div className='text-center text-[#fff] text-[16px] font-medium'>
								Confirm
							</div>
						</div>
					</div>
				)}
				{modalStep === 2 && (
					<div className='w-full h-full flex flex-col rounded-lg'>
						{/* <div className='relative p-[30px] shrink-0'> */}
						<div
							className='absolute z-[1] top-[-26px] right-[-26px] cursor-pointer bg-[#fff] rounded-full w-[52px] h-[52px] flex items-center justify-center'
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
						{/* <div className='text-[#252525] text-[20px] font-semibold mb-[18px]'>
								We&lsquo;ve created the video unit for you! You
								can decide how long you want the{' '}
							</div>
							<div className='text-[#444] text-[20px] font-medium underline cursor-pointer'>
								Publish video unit to community
							</div> */}
						{/* </div> */}
						<div className='w-full h-full flex flex-col overflow-hidden rounded-[8px]'>
							<div
								className='relative flex items-center justify-center'
								id='generated-image-ctn'
							>
								<div className='relative min-h-[510px] w-full'>
									{isRunning || seconds ? (
										<video
											preload='auto'
											id='video-player-demo'
											src='/demo_video.mp4'
											loop
											// controls
											style={{
												width: '100%',
												height: '100%',
												position: 'relative',
											}}
										/>
									) : (
										<video
											id='video-player'
											src='/unit.mp4'
											autoPlay
											loop
											muted
											// controls
											style={{
												width: '100%',
												height: '100%',
												position: 'relative',
											}}
										/>
									)}
									{isFullScreen && (
										<div className='toolbar-fullscreen absolute right-0 bottom-0 flex-1 flex px-[30px] items-stretch'>
											<div
												className='border-solid border-[#C8C8C8] border-r cursor-pointer h-full flex justify-start items-center flex-1'
												onClick={() =>
													setAudioOn((prev) => !prev)
												}
											>
												{audioOn ? (
													<AudioIcon />
												) : (
													<AudioOff />
												)}
											</div>
											<div
												className='border-solid border-[#C8C8C8] border-r cursor-pointer  h-full flex justify-center items-center  px-[16px] flex-1'
												onClick={() => {
													isRunning || seconds
														? (
																document.getElementById(
																	'video-player-demo'
																) as HTMLVideoElement as any
														  )?.webkitShowPlaybackTargetPicker?.()
														: (
																document.getElementById(
																	'video-player'
																) as HTMLVideoElement as any
														  )?.webkitShowPlaybackTargetPicker?.();
												}}
											>
												<AirdropIcon />
											</div>
											<div
												className='cursor-pointer h-full flex items-center justify-end  flex-1'
												onClick={() => {
													const elem =
														document.getElementById(
															'generated-image-ctn'
														);
													if (!elem) {
														return;
													}

													if (
														!document.fullscreenElement
													) {
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
												{isFullScreen ? (
													<QuitFullScreen />
												) : (
													<FullScreenIcon />
												)}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className='bg-[#DADBF4] flex-1'>
								<div className='flex gap-[76px] h-[52px]'>
									<div className='timer-bottom relative flex items-center'>
										{timerExpanded && (
											<div className='timer-upper absolute left-0 bottom-[100%] pt-[28px] px-[20px] pb-[20px]'>
												<div className='flex'>
													<div>
														<div
															className='flex justify-center mb-5 rounded-[6px] p-6 w-fit'
															style={{
																background:
																	'#DADBF4',
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
																digit={
																	getMins()[0]
																}
															/>
															<Digit
																digit={
																	getMins()[1]
																}
															/>
															<div className='colon' />
															<Digit
																digit={
																	getSecs()[0]
																}
															/>
															<Digit
																digit={
																	getSecs()[1]
																}
															/>
														</div>
														<div
															className='cursor-pointer bg-[#484BC9] rounded-[40px] relative w-full h-[55px] flex gap-[12px] justify-center items-center'
															onClick={() => {
																if (isRunning) {
																	pause();
																	setTimeout(
																		() =>
																			(
																				document.getElementById(
																					'video-player-demo'
																				) as HTMLVideoElement
																			)?.pause()
																	);
																} else {
																	console.log(
																		'sss',
																		seconds,
																		minutes,
																		hours
																	);
																	if (
																		seconds ||
																		minutes ||
																		hours
																	) {
																		start();
																		setTimeout(
																			() =>
																				(
																					document.getElementById(
																						'video-player-demo'
																					) as HTMLVideoElement
																				)?.play()
																		);
																	}
																}
															}}
														>
															<div className='text-[#fff]'>
																{isRunning &&
																seconds
																	? 'Pause'
																	: 'Start'}
															</div>
															{isRunning &&
															seconds ? (
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	width='21'
																	height='20'
																	viewBox='0 0 21 20'
																	fill='none'
																>
																	<rect
																		x='4.5'
																		y='2'
																		width='2'
																		height='16'
																		rx='1'
																		fill='white'
																		fill-opacity='0.9'
																	/>
																	<rect
																		x='14.5'
																		y='2'
																		width='2'
																		height='16'
																		rx='1'
																		fill='white'
																		fill-opacity='0.9'
																	/>
																</svg>
															) : (
																<svg
																	className=''
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
															)}
														</div>
													</div>
													<div className='flex flex-col gap-2 pl-[35px] flex-1'>
														<div className='flex gap-2'>
															<div
																className='flex-1 rounded-[8px] hover:bg-[#fff] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer text-center'
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
																className='flex-1 rounded-[8px] hover:bg-[#fff] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer text-center'
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
																className='flex-1 rounded-[8px] hover:bg-[#fff] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer text-center'
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
																className='flex-1 rounded-[8px] hover:bg-[#fff] border-[#444] border-[2px] py-[12px] px-[20px] cursor-pointer text-center'
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
																2 hours
															</div>
														</div>
														<div className='flex gap-[12px] items-center justify-end mt-auto'>
															Reminder
															<Checkbox
																type='toggle'
																defaultValue={
																	true
																}
															/>
														</div>
													</div>
												</div>
											</div>
										)}
										<div className='mr-[12px] cursor-pointer'>
											<TimerIcon />
										</div>
										Time duration setting
										<div
											className='ml-auto cursor-pointer'
											onClick={() =>
												setTimeExpanded((prev) => !prev)
											}
										>
											{timerExpanded ? (
												<CloseTimer />
											) : (
												<ExpandTimer />
											)}
										</div>
									</div>
									<div className='toolbar relative flex-1 flex px-[30px] items-stretch'>
										<div
											className='border-solid border-[#C8C8C8] border-r cursor-pointer h-full flex justify-start items-center flex-1'
											onClick={() =>
												setAudioOn((prev) => !prev)
											}
										>
											{audioOn ? (
												<AudioIcon />
											) : (
												<AudioOff />
											)}
										</div>
										<div
											className='border-solid border-[#C8C8C8] border-r cursor-pointer  h-full flex justify-center items-center  px-[16px] flex-1'
											onClick={() => {
												(
													document.getElementById(
														'video-player'
													) as HTMLVideoElement as any
												)?.webkitShowPlaybackTargetPicker?.();
											}}
										>
											<AirdropIcon />
										</div>
										<div
											className='cursor-pointer  h-full flex items-center justify-end   flex-1'
											onClick={() => {
												const elem =
													document.getElementById(
														'generated-image-ctn'
													);
												if (!elem) {
													return;
												}

												if (
													!document.fullscreenElement
												) {
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
											{isFullScreen ? (
												<QuitFullScreen />
											) : (
												<FullScreenIcon />
											)}
										</div>
									</div>
								</div>
								<div className='flex justify-center items-center mt-10'>
									<div className='text-[20px] font-semibold leading-[28px] w-[380px] flex flex-col self-baseline'>
										<div>
											We&lsquo;ve created the video unit
											for you!{' '}
										</div>
										<div className='mt-auto'>
											You can decide how long you want
											this ambient video to be ; )
										</div>
									</div>
									<div className='mx-[49px]'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='2'
											height='108'
											viewBox='0 0 2 108'
											fill='none'
										>
											<path
												d='M1 1V107'
												stroke='#C8C8C8'
												stroke-linecap='round'
											/>
										</svg>
									</div>
									<div className='w-[324px] text-[#444]'>
										<div className=' font-medium'>
											You can also share your video unit
											with the Cozyverse community
										</div>
										<div className='flex gap-[30px] items-center mt-[28px]'>
											<div className=' underline font-normal cursor-pointer'>
												Browse Community
											</div>
											<div>
												<Button
													onClick={() => {}}
													className='w-[142px] h-[52px] text-[16px] font-medium text-[#fff]'
												>
													Publish
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Modal>
			<Section
				curSection={curSection}
				totalSection={2}
				text={sectionTextMap[curSection] || ''}
			/>
			<div className='bg-[#EEE] w-full justify-center pt-[50px] h-[710px] flex flex-col'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					{renderQuestion(
						questionForm[curSection].questions[questionNum]
					)}
				</DndContext>
				<div className='flex items-center mt-auto mb-[50px]'>
					{(questionNum > 0 || curSection > 1) && (
						<div
							className='text-[#444] text-[28px] font-medium flex items-center cursor-pointer select-none ml-[62px]'
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
						className='ml-auto text-[#444] text-[28px] font-medium cursor-pointer w-[112px] justify-center items-center'
						onClick={() => {
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
						Skip
					</div>
					<div
						className={classNames(
							'ml-10  mr-[52px] w-[560px] h-[62px] bg-[#484BC9] rounded-[67.5px] flex items-center justify-center',
							{
								'cursor-pointer ': !(curSection === 1 &&
								questionNum === 0
									? (colors.length === 0 &&
											!(
												questionForm[curSection]
													.questions[questionNum]
													.values as string[]
											).includes('no')) ||
									  questionForm[curSection].questions[
											questionNum
									  ].values.length === 0
									: (
											questionForm[curSection].questions[
												questionNum
											].values as string[]
									  ).includes('Other')
									? questionForm[curSection].questions[
											questionNum
									  ].extra?.other === undefined ||
									  questionForm[curSection].questions[
											questionNum
									  ].extra?.other === ''
									: questionForm[curSection].questions[
											questionNum
									  ].values.length === 0),
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
										: (
												questionForm[curSection]
													.questions[questionNum]
													.values as string[]
										  ).includes('Other')
										? questionForm[curSection].questions[
												questionNum
										  ].extra?.other === undefined ||
										  questionForm[curSection].questions[
												questionNum
										  ].extra?.other === ''
										: questionForm[curSection].questions[
												questionNum
										  ].values.length === 0,
							}
						)}
						onClick={() => {
							console.log(
								'dddddebug',
								questionForm[curSection].questions[questionNum]
							);
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
									: (
											questionForm[curSection].questions[
												questionNum
											].values as string[]
									  ).includes('Other')
									? questionForm[curSection].questions[
											questionNum
									  ].extra?.other === undefined ||
									  questionForm[curSection].questions[
											questionNum
									  ].extra?.other === ''
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
						<div className='text-center text-[#fff] text-[28px] font-medium   uppercase'>
							{curSection === 2 &&
							questionNum ===
								questionForm[curSection].questions.length - 1
								? 'Complete'
								: 'Next'}
						</div>
					</div>
				</div>
			</div>
			<div
				className='w-full relative h-[20px] shrink-0'
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
	);
}
