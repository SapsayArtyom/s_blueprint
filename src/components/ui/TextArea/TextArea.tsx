import { FC, InputHTMLAttributes, useRef } from 'react'
import cls from './TextArea.module.scss'
import { classNames } from '../../../helpers/classNames'
 
interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    containerStyle?: string;
    errors?: boolean;
    disabled?: boolean;
    inputStyle?: string;
    name?: string;
    onChange?: (props?: any) => void;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    type?: string;
    value?: string;
    wrapperStyle?: string;
    icon?: string;
    label?: string;
}
 
const TextArea: FC<TextAreaProps> = ({ 
    className,
    containerStyle,
    errors,
    disabled,
    icon,
    inputStyle,
    name,
    onChange,
    placeholder,
    readOnly,
    required,
    type,
    value,
    wrapperStyle,
    label
}) => {

    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef && inputRef.current) inputRef.current.focus();
    };
 
    return (
        <div className={classNames(cls.TextArea, {}, [wrapperStyle])}>
            <div onClick={handleClick} className={'flex flex-col text-base w-[100%]'}>
                {label ? <label className='text-base mb-[10px]'>{label}</label> : null}
                <textarea
                    ref={inputRef}
                    aria-label={name}
                    data-testid={name}
                    tabIndex={0}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    className={classNames(cls.input, {}, [className])}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            </div>
        </div>
    )
}
 
export default TextArea