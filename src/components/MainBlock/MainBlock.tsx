/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { IDay } from '../../configs/config'
import { settings } from '../../configs/config'
import type { DayP, ExP, PhaseP, WeekP } from '../../models/Programs'
import { useGetProgramMeActiveQuery, useUpdateDayCommentsMutation } from '../../store/apiSlice'
import Exercise from '../Exercise/Exercise'
import Button, { ThemeButton } from '../ui/Button/Button'
import TextArea from '../ui/TextArea/TextArea'
import MainBlockHeader from './MainBlockHeader'
 
interface MainBlockProps {
    className?: string
}

export interface ISelectItem {
    label: string
    value: string
}
 
const MainBlock: FC<MainBlockProps> = () => {
	// Основные индексы состояния
	const [indexDay, setIndexDay] = useState<number>(0);
	const [indexWeek, setIndexWeek] = useState<number>(0);
	const [programIndex, setProgramIndex] = useState<number>(0);
	const [dayComment, setDayComment] = useState<string>('');
	
	// Данные для упражнений и комментариев (для будущей интеграции)
	const [dataExercises] = useState<any>(null);

	const { 
		data: programData, 
		isLoading, 
		error 
	} = useGetProgramMeActiveQuery();

	const [updateDayComments] = useUpdateDayCommentsMutation();

	// React Compiler автоматически оптимизирует эти вычисления
	const activePhase: PhaseP | null = programData?.phases?.[programIndex] || null;

	const weeks: ISelectItem[] = !activePhase ? [] : 
		Array.from({ length: activePhase.durationWeeks }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));

	const programs: ISelectItem[] = !programData?.phases ? [] :
		Array.from({ length: programData.phases.length }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));

	const scheduleWeek: WeekP | null = activePhase?.weeks?.[indexWeek] || null;

	const scheduleDay: DayP | null = scheduleWeek?.days?.[indexDay] || null;

	const days: ISelectItem[] = !scheduleWeek?.days ? [] :
		scheduleWeek.days.map((el, index) => ({
			label: el.title || `Day ${index + 1}`,
			value: index.toString(),
		}));

	// Синхронизация комментария дня при изменении дня
	useEffect(() => {
		setDayComment(scheduleDay?.comments || '');
	}, [scheduleDay]);

	// ============ Вспомогательные функции ============
	// React Compiler автоматически оптимизирует эти функции
	
	/**
	 * Генерирует список недель для выбора
	 * @param duration - количество недель
	 * @returns массив объектов с label и value
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const parseWeeks = (duration: number): ISelectItem[] => {
		return Array.from({ length: duration }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));
	};
	
	/**
	 * Генерирует список программ/фаз для выбора
	 * @param duration - количество программ
	 * @returns массив объектов с label и value
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const parseProgramsIndex = (duration: number): ISelectItem[] => {
		return Array.from({ length: duration }, (_, index) => ({
			label: (index + 1).toString(),
			value: index.toString(),
		}));
	};

	/**
	 * Генерирует список дней недели для выбора
	 * @returns массив объектов с label и value для каждого дня
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const parseProgramsDays = (): ISelectItem[] => {
		if (!scheduleWeek?.days) return [];
		return scheduleWeek.days.map((el, index) => ({
			label: el.title || `Day ${index + 1}`,
			value: index.toString(),
		}));
	};

	/**
	 * Парсинг данных программы (для логирования и отладки)
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const parseData = () => {
		if (!programData || !activePhase) return;
		console.log('Parsing program data:', programData);
	};

	// Сеттер для программы
	const setProgramId = (id: number) => {
		setProgramIndex(+id);
	};

	// Вспомогательная функция для определения текущего дня
	const getCurrentDay = (day: number): number => {
		if (day === 0) return 0;
		if (day <= 2) return 1;
		if (day > 2) return 2;
		return 0;
	};

	// Инициализация текущей недели и дня при монтировании
	useEffect(() => {
		const diffSeconds = (settings.startProgramm - Date.now()) / 1000;
		const diffWeeks = Math.abs(Math.ceil(diffSeconds / (60 * 60 * 24 * 7)));
		const diffDays = Math.abs(Math.ceil(diffSeconds / (60 * 60 * 24) % 7));
		
		const currentWeek = diffWeeks >= settings.durationProgramm ? 0 : diffWeeks;
		const currentDay = diffDays > 6 ? 0 : getCurrentDay(diffDays);

		setIndexWeek(currentWeek);
		setIndexDay(currentDay);
	}, []); // React Compiler оптимизирует зависимости автоматически
    
	// ID активной программы
	const programId = programData?._id || '';

	// Рендер списка упражнений
	const renderExercises = (exercises: ExP[]) => {
		return exercises.map((exercise, index) => (
			<Exercise 
				data={exercise}
				programId={programId}
				key={`exercise-${index}`}	
			/>
		));
	};

	// Рендер дня с упражнениями
	const renderDay = (exercises: ExP[]) => {
		return (
			<div className='flex flex-col h-[100%] justify-start mt-[70px]'>
				<p className='mb-[10px] text-[26px] bg-[#672E5A] py-[10px] text-center'>
					{days?.[indexDay]?.label}
				</p>
				<div className='flex flex-col'>
					{renderExercises(exercises)}
				</div>
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

	/**
	 * Вычисляет прогресс выполнения упражнений
	 * @param arr - массив дней с упражнениями
	 * @returns процент выполнения (0-100)
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getProgress = (arr: IDay[]): number => {
		let count = 0;
		let progress = 0;
		
		arr.forEach((el) => {
			const repeat = el.weeks[indexWeek].split('')[0];
			count += Number(repeat);
		});
		
		const currentExercises = dataExercises?.[days[indexDay]?.label];
		let currentCount = 0;
		
		if (currentExercises) {
			Object.values(currentExercises).forEach((el: any) => {
				currentCount += Number(el.repeat[indexWeek] || 0);
			});
			const coefficient = 100 / count;
			progress = Math.round(currentCount * coefficient);
		}
        
		return progress;
	};

	// Обработка состояний загрузки и ошибок
	if (isLoading) {
		return <div className='flex items-center justify-center h-full'>Loading...</div>;
	}

	if (error) {
		return <div className='flex items-center justify-center h-full text-red-500'>Error loading program data</div>;
	}

	return (
		<div className='flex flex-col flex-1 relative w-[100%]'>
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
			{
				scheduleDay ? renderDay(scheduleDay.exercises as ExP[]) : <div>Loading...</div>
			}
			<div className='pb-[70px] pt-[10px] px-[13px]'>
				<p className='text-[14px] mb-[5px]'>Комментарий к дню:</p>
				<TextArea 
					value={dayComment}
					placeholder='Добавьте комментарий к тренировочному дню...'
					className='bg-[#d3d3d33d] border-[1px] border-[#89878F]'
					onChange={textAreaHandler}
				/>
				<Button
					theme={ThemeButton.CLEAR}
					className='!bg-[#00B4B9] !h-[35px] mt-[10px] text-[14px]'
					onClick={saveDayComment}
				>
					Сохранить комментарий
				</Button>
			</div>
			<div className='fixed bottom-0 w-[100%] p-[13px] bg-[#0a080d]'>
				{/* <ProgressBar progress={getProgress(schedule[indexDay].exercises)} /> */}
			</div>
		</div>
	)
}

export default MainBlock;