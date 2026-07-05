import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { settings } from '../../configs/config';
import type { DayP, ExP, PhaseP, WeekP } from '../../models/Programs';
import {
	useFetchMeQuery,
	useGetProgramMeActiveQuery,
	useUpdateDayCommentsMutation,
} from '../../store/apiSlice';
import Exercise from '../Exercise/Exercise';
import Button, { ThemeButton } from '../ui/Button/Button';
import TextArea from '../ui/TextArea/TextArea';
import MainBlockHeader from './MainBlockHeader';

interface MainBlockProps {
	className?: string;
}

export interface ISelectItem {
	label: string;
	value: string;
}

const MainBlock: FC<MainBlockProps> = () => {
	const WORK_DAYS_IN_WEEK = 5;
	const MS_IN_DAY = 24 * 60 * 60 * 1000;

	// Основные индексы состояния
	const [indexDay, setIndexDay] = useState<number>(0);
	const [indexWeek, setIndexWeek] = useState<number>(0);
	const [programIndex, setProgramIndex] = useState<number>(0);
	const [dayComment, setDayComment] = useState<string>('');
	const hasInitializedCurrentPosition = useRef(false);

	const { data: programData, isLoading, error } = useGetProgramMeActiveQuery();
	const { data: authUser } = useFetchMeQuery();

	const [updateDayComments] = useUpdateDayCommentsMutation();

	// React Compiler автоматически оптимизирует эти вычисления
	const activePhase: PhaseP | null = programData?.phases?.[programIndex] || null;

	const weeks: ISelectItem[] = !activePhase
		? []
		: Array.from({ length: activePhase.durationWeeks }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));

	const programs: ISelectItem[] = !programData?.phases
		? []
		: Array.from({ length: programData.phases.length }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));

	const scheduleWeek: WeekP | null = activePhase?.weeks?.[indexWeek] || null;

	const scheduleDay: DayP | null = scheduleWeek?.days?.[indexDay] || null;

	const days: ISelectItem[] = !scheduleWeek?.days
		? []
		: scheduleWeek.days.map((el, index) => ({
			label: el.title || `Day ${index + 1}`,
			value: index.toString(),
		}));

	// Синхронизация комментария дня при изменении дня
	useEffect(() => {
		setDayComment(scheduleDay?.comments || '');
	}, [scheduleDay]);

	// ============ Вспомогательные функции ============
	// React Compiler автоматически оптимизирует эти функции

	// Сеттер для программы
	const setProgramId = (id: number) => {
		setProgramIndex(+id);
	};

	const isWorkDay = (date: Date): boolean => {
		const day = date.getDay();
		return day >= 1 && day <= WORK_DAYS_IN_WEEK;
	};

	const getStartOfDay = (timestamp: number): Date => {
		const date = new Date(timestamp);
		date.setHours(0, 0, 0, 0);
		return date;
	};

	const getElapsedWorkDays = (startTimestamp: number): number => {
		const startDate = getStartOfDay(startTimestamp);
		const currentDate = getStartOfDay(Date.now());

		if (currentDate <= startDate) {
			return 0;
		}

		let elapsedWorkDays = 0;
		const iteratorDate = new Date(startDate);

		while (iteratorDate < currentDate) {
			iteratorDate.setTime(iteratorDate.getTime() + MS_IN_DAY);
			if (isWorkDay(iteratorDate)) {
				elapsedWorkDays += 1;
			}
		}

		return elapsedWorkDays;
	};

	const getProgramDayFromWorkDay = (workDayIndex: number, daysInProgramWeek: number): number => {
		if (daysInProgramWeek <= 1) {
			return 0;
		}

		const safeWorkDayIndex = Math.min(Math.max(workDayIndex, 0), WORK_DAYS_IN_WEEK - 1);
		return Math.min(
			daysInProgramWeek - 1,
			Math.ceil(((safeWorkDayIndex + 1) * daysInProgramWeek) / WORK_DAYS_IN_WEEK) - 1,
		);
	};

	const getUserProgramStartDates = (email?: string): number[] | undefined => {
		if (!email) {
			return undefined;
		}

		const normalizedEmail = email.trim().toLowerCase();
		const directMatch =
			settings.programms[email] ??
			settings.programms[email.trim()] ??
			settings.programms[normalizedEmail];

		if (directMatch) {
			return directMatch;
		}

		const matchedKey = Object.keys(settings.programms).find(
			(key) => key.trim().toLowerCase() === normalizedEmail,
		);

		return matchedKey ? settings.programms[matchedKey] : undefined;
	};

	// Инициализация текущей недели и дня при загрузке активной программы
	useEffect(() => {
		if (hasInitializedCurrentPosition.current || !activePhase) {
			return;
		}

		const userProgramStartDates = getUserProgramStartDates(authUser?.email);
		if (!userProgramStartDates?.length) {
			return;
		}

		const startTimestamp = userProgramStartDates[programIndex] ?? userProgramStartDates[0];

		const elapsedWorkDays = getElapsedWorkDays(startTimestamp);
		const totalWeeks = Math.max(activePhase.durationWeeks || activePhase.weeks.length, 1);
		const maxWeekIndex = totalWeeks - 1;
		const today = getStartOfDay(Date.now());
		const startDay = getStartOfDay(startTimestamp);
		const isWeekend = !isWorkDay(today);
		const shouldJumpToNextWeek = today > startDay && isWeekend;

		const baseWeek = Math.floor(elapsedWorkDays / WORK_DAYS_IN_WEEK);
		const weekByCalendarState = shouldJumpToNextWeek ? baseWeek + 1 : baseWeek;
		const currentWeek = Math.min(weekByCalendarState, maxWeekIndex);
		const daysInCurrentWeek = Math.max(activePhase.weeks?.[currentWeek]?.days?.length || 1, 1);
		const workDayIndex = shouldJumpToNextWeek ? 0 : elapsedWorkDays % WORK_DAYS_IN_WEEK;
		const currentDay = getProgramDayFromWorkDay(workDayIndex, daysInCurrentWeek);

		setIndexWeek(currentWeek);
		setIndexDay(currentDay);
		hasInitializedCurrentPosition.current = true;
	}, [activePhase, authUser?.email, programIndex]);

	// ID активной программы
	const programId = programData?._id || '';

	// Рендер списка упражнений
	const renderExercises = (exercises: ExP[]) => {
		const sortedExercises = [...exercises].sort((a, b) => a.order - b.order);
		return sortedExercises.map((exercise, index) => (
			<Exercise data={exercise} programId={programId} key={`exercise-${index}`} />
		));
	};

	// Рендер дня с упражнениями
	const renderDay = (exercises: ExP[]) => {
		return (
			<div className="flex flex-col h-[100%] justify-start mt-[46px]">
				<p className="mb-[10px] text-[26px] bg-[#672E5A] py-[10px] text-center">
					{days?.[indexDay]?.label}
				</p>
				<div className="flex flex-col">{renderExercises(exercises)}</div>
			</div>
		);
	};

	// Обработчик изменения комментария дня
	const textAreaHandler = (val: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDayComment(val.target.value);
	};

	// Сохранение комментария дня
	const saveDayComment = () => {
		const dayId = scheduleDay?._id;
		if (dayId && programId) {
			updateDayComments({
				programId,
				dayId,
				comments: dayComment,
			});
		}
	};

	// Обработка состояний загрузки и ошибок
	if (isLoading) {
		return <div className="flex items-center justify-center h-full">Loading...</div>;
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full text-red-500">
				Error loading program data
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 relative w-[100%]">
			<MainBlockHeader
				day={indexDay.toString()}
				days={days}
				week={indexWeek.toString()}
				weeks={weeks}
				program={programIndex.toString()}
				programs={programs}
				setDay={setIndexDay}
				setWeek={setIndexWeek}
				setProgramIndex={setProgramId}
			/>
			{scheduleDay ? renderDay(scheduleDay.exercises as ExP[]) : <div>Loading...</div>}
			<div className="pb-[70px] pt-[10px] px-[13px]">
				<p className="text-[14px] mb-[5px]">Комментарий ко дню:</p>
				<TextArea
					value={dayComment}
					placeholder="Добавьте комментарий к тренировочному дню..."
					className="bg-[#d3d3d33d] border-[1px] border-[#89878F]"
					onChange={textAreaHandler}
				/>
				<Button
					theme={ThemeButton.CLEAR}
					className="!bg-[#00B4B9] !h-[35px] mt-[10px] text-[14px]"
					onClick={saveDayComment}
				>
					Сохранить комментарий
				</Button>
			</div>
			{/* <div className="fixed bottom-0 w-[100%] p-[13px] bg-[#0a080d]"> */}
			{/* <ProgressBar progress={getProgress(schedule[indexDay].exercises)} /> */}
			{/* </div> */}
		</div>
	);
};

export default MainBlock;
