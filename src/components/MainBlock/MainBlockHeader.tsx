/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react'
import Dropdown from '../ui/Dropdown/Dropdown'
import { type ISelectItem } from './MainBlock'
 
interface MainBlockHeaderProps {
    className?: string
    days: ISelectItem[]
    day: string
    week: string
    weeks: ISelectItem[]
    program: string
    programs: ISelectItem[]
    setDay: (val: any) => void
    setWeek: (val: any) => void
    setProgramIndex: (val: any) => void
}

const MainBlockHeader: FC<MainBlockHeaderProps> = ({ days, day, week, weeks, program, programs, setDay, setWeek, setProgramIndex }) => {

	// const programms = useMemo(() => {
	// 	const arr = [];
	// 	for (let i = 0; i < settings.programmIds.length; i++) {
	// 		arr.push({label: (i+1).toString(), value: settings.programmIds[i].toString()});
	// 	}
	// 	return arr
	// }, [])

	return (
		<div className='flex justify-around fixed top-[114px] bg-background pt-[5px] pb-[10px] w-[100%]'>
			<Dropdown 
				value={day.toString()}
				onChange={setDay}
				label='Day'
				options={days}
			/>
			<Dropdown 
				value={week.toString()}
				onChange={setWeek}
				label='Week'
				options={weeks}
			/>
			<Dropdown 
				value={program.toString()}
				onChange={setProgramIndex}
				label='Prog'
				options={programs}
			/>
		</div>
	)
}
 
export default MainBlockHeader