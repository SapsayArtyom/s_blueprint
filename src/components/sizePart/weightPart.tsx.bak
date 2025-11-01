import { FC, memo, useEffect, useState } from 'react'
import Input from '../ui/Input/Input'
import DataPicker from '../dataPicker/DataPicker'
import { IDateSize } from '../../pages/SizePage/SizePage'
 
interface WeightPartProps {
    className?: string
    setData?: (val: string, obj: IDateSize) => void
    data?: Record<string, string>
}
 
const WeightPart: FC<WeightPartProps> = ({ className, setData, data }) => {

    const [dataSize, setDataSize] = useState<IDateSize>(null);
    const [value, setValue] = useState<string>('');
    const [prevValue, setPrevValue] = useState<string>(null);
    const [prevDate, setPrevDate] = useState<string>(null);

    const inputHandler = (val: string) => {
        setData(val, dataSize)
    }

    useEffect(() => {
        if (data) {
            console.log('weight data ::', data);
            
            const currentDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
            if (data?.[currentDate]) setValue(data?.[currentDate]);
            const [oldDate, oldVal] = Object.entries(data).at(-1);
            if (oldDate !== currentDate) {
                setPrevValue(oldVal);
                parseDate(oldDate);
            } else {
                const [oldDate, oldVal] = Object.entries(data).at(-2);
                setPrevValue(oldVal);
                parseDate(oldDate);
            }
        }
    }, [data])

    const parseDate = (date: string) => {
        const parseDate = date.split('-');
        parseDate[1] = `${Number(parseDate[1]) + 1}`;
        setPrevDate(parseDate.join('/'));
    }
    
    const dataInputHandler = (obj: any) => {
        const {name, date} = obj;
        const a = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        setDataSize({name, date: a})
    }

    return (
        <div className='px-[13px]'>
            <div className='flex justify-between'>
                <Input
                    value={value}
                    onChange={inputHandler}
                    className='text-[#fff] bg-[#9e77773d] border-[1px] border-[#89878F] text-center !h-[25px]'
                />
                <DataPicker 
                    wrapperClassName={'ml-[auto]'}
                    setDate={(date) => dataInputHandler({date, name: 'weight'})}
                />
            </div>
            <div className='flex mt-[20px]'>
                {
                    prevDate ? <>
                        <p className='text-[#a3a3a3]'>Предыдущий вес:</p>
                        <p className='px-[5px] text-[#a3a3a3]'>{prevValue}</p>
                        <p className='text-[#a3a3a3]'>{prevDate.replace(/\-/g, '/')}</p>
                    </> : null
                }
            </div>
        </div>
    )
}
 
export default memo(WeightPart)