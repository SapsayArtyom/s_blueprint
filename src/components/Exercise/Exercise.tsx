 
import { type FC, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Exercise, ExP } from '../../models/Programs';
import { useUpdateExerciseMutation } from '../../store/apiSlice';
import Button, { ThemeButton } from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
 
interface ExerciseProps {
    data: ExP;
    programId: string;
}

const Exercise: FC<ExerciseProps> = ({ data, programId }) => {
	const [textWeight, setTextWeight] = useState<string>('');
	const [lap, setLap] = useState<number>(0);
	const [exercise, setExercise] = useState<Exercise>(data.exercise);
	const [comment, setComment] = useState<string>('');
	const [showCommentInput, setShowCommentInput] = useState<boolean>(false);

	const [updateExercise] = useUpdateExerciseMutation();

	useEffect(() => {
		setExercise(data.exercise);
		setTextWeight(data.weight ? data.weight.toString() : '');
		setLap(data.count ? data.count : 0);
		setComment(data.comments || '');
	}, [data]);

	// Обработчик изменения веса с debounce
	const inputHandler = (val: string) => {
		setTextWeight(val);
		
		// Обновляем вес только если это валидное число
		const weight = parseFloat(val);
		if (!isNaN(weight) && data._id) {
			updateExercise({
				programId,
				exerciseId: data._id,
				weight,
			});
		}
	};
    
	// Обработчик кнопки счётчика подходов
	const btnHandler = () => {
		const newCount = lap >= data.sets.count ? 0 : lap + 1;
		setLap(newCount);
		
		if (data._id) {
			updateExercise({
				programId,
				exerciseId: data._id,
				count: newCount,
			});
		}
	};

	// Обработчик сохранения комментария
	const saveComment = () => {
		if (data._id) {
			updateExercise({
				programId,
				exerciseId: data._id,
				comments: comment,
			});
		}
		setShowCommentInput(false);
	};
    
	// useEffect(() => {
	// 	setText(data.weight || '');
	// 	setLap(+data.repeat || 0);
	// }, [dataExercises, week])
	

	return (    
		<div className='px-[25px] py-[20px] border-[#672E5A] border-solid border-b-[1px]'>
			<div className='flex justify-between w-[100%]'>
				<div className='flex flex-col flex-1 pr-[20px] max-w-[190px] border-[#672E5A] border-solid border-b-[1px]'>
					<Link to={exercise.link} target='_blank' className='text-[20px]'>{ exercise.name }</Link>
					<div className='flex'>
						<p>{ `${data.sets.count}*${data.sets.reps}` }</p>
						{data.notes ? <p className='ml-[5px] text-[#00B4B9] font-bold'>{ data.notes }</p> : null}
					</div>
					{/* Кнопка для показа/скрытия комментария */}
					<button 
						onClick={() => setShowCommentInput(!showCommentInput)}
						className='mt-[5px] text-[12px] text-[#00B4B9] text-left'
					>
						{data.comments || showCommentInput ? '💬 Комментарий' : '+ Добавить комментарий'}
					</button>
				</div>
				{ data.exercise.name !== 'Пресс' ? <div className='flex flex-col pr-[20px] justify-start items-center'>
					<div className='w-[55px]'>
						<Input
							value={textWeight || ' '}
							onChange={inputHandler}
							className='text-[#fff] bg-[#d3d3d33d] border-[1px] border-[#89878F] text-center !h-[25px]'
						/>
					</div>
					<div className='mt-[5px]'>
						<p>{ data.prevWeight }</p>
					</div>
				</div> : null
				}
				<Button
					theme={ThemeButton.CLEAR}
					className={`!h-[50px] !w-[50px] rounded-[15px] self-center font-[Arial] ${lap === data.sets.count ? '!bg-[#00B4B9]' : '!bg-[#AC4A63]' }`}
					onClick={btnHandler}
				> 
					<p>{ lap } / { data.sets.count }</p>
				</Button>
			</div>

			{/* Поле ввода комментария */}
			{showCommentInput && (
				<div className='mt-[10px]'>
					<TextArea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='Добавьте комментарий...'
						className='bg-[#d3d3d33d] border-[1px] border-[#89878F] text-[14px]'
					/>
					<div className='flex gap-[10px] mt-[5px]'>
						<Button
							theme={ThemeButton.CLEAR}
							className='!bg-[#00B4B9] !h-[30px] text-[12px]'
							onClick={saveComment}
						>
							Сохранить
						</Button>
						<Button
							theme={ThemeButton.CLEAR}
							className='!bg-[#AC4A63] !h-[30px] text-[12px]'
							onClick={() => {
								setComment(data.comments || '');
								setShowCommentInput(false);
							}}
						>
							Отмена
						</Button>
					</div>
				</div>
			)}

			{/* Отображение сохраненного комментария */}
			{!showCommentInput && data.comments && (
				<div className='mt-[10px] text-[14px] text-[#888] italic'>
					{data.comments}
				</div>
			)}
		</div>
	);
}
 
export default memo(Exercise)