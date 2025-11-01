import { FC, useEffect, useState } from 'react'
import Input from '../ui/Input/Input'
import DataPicker from '../dataPicker/DataPicker'
import { IDateSize } from '../../pages/SizePage/SizePage'
 
interface SizePartProps {
    className?: string
    label: string
    setData?: (val: string, obj: IDateSize) => void
    data?: Record<string, string>
}
 
const SizePart: FC<SizePartProps> = ({ className, label, data, setData }) => {

    const [dataSize, setDataSize] = useState<IDateSize>(null);
    const [value, setValue] = useState<string>('');
    const [prevValue, setPrevValue] = useState<string>(null);
    const [prevDate, setPrevDate] = useState<string>(null);

    useEffect(() => {
        if (data) {
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

    const inputHandler = (val: string) => {
        setData(val, dataSize)
    }

    const dataInputHandler = (obj: any) => {
        const {name, date} = obj;
        const a = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        setDataSize({name, date: a})
    }
    
    return (
        <>
            <div className='border-[#672E5A] border-solid border-b-[1px] p-[13px]'>
                <div className='flex justify-between items-center'>
                    <Input 
                        value={value}
                        onChange={inputHandler}
                        label={label} 
                        className='text-[#fff] bg-[#d3d3d33d] border-[1px] border-[#89878F] text-center !h-[25px]'
                    />
                    <div className='flex self-end'>
                        <DataPicker 
                            wrapperClassName={'ml-[auto]'} 
                            setDate={(date) => dataInputHandler({date, name: label})}
                        />
                    </div>
                </div>
                <div className='flex mt-[20px]'>
                    {
                        prevDate ? <>
                            <p className='text-[#a3a3a3]'>Предыдущий замер:</p>
                            <p className='px-[5px] text-[#a3a3a3]'>{prevValue}</p>
                            <p className='text-[#a3a3a3]'>{prevDate.replace(/\-/g, '/')}</p>
                        </> : null
                    }
                </div>
            </div>
        </>
    )
}
 
export default SizePart