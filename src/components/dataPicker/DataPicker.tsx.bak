import { FC, forwardRef, useEffect, useState } from 'react'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import Input from '../ui/Input/Input'
 
interface DataPickerProps {
    className?: string
    wrapperClassName?: string
    setDate?: (date: Date) => void
}
 
const DataPicker: FC<DataPickerProps> = ({ className, wrapperClassName, setDate }) => {
    const [startDate, setStartDate] = useState(new Date());
    
    useEffect(() => {
        if (startDate && setDate) {
            setDate(startDate);
        }
    }, [startDate])

    // eslint-disable-next-line react/display-name, react/prop-types
    const ExampleCustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref: React.Ref<HTMLButtonElement>) => (
        <button 
            className="example-custom-input" 
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ));

    return (
        <DatePicker
            dateFormat="dd/MM/yyyy"
            wrapperClassName={wrapperClassName}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
        />
    );
}
 
export default DataPicker
