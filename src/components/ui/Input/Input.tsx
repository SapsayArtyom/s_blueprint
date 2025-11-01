import { FC, InputHTMLAttributes, useRef, useState } from 'react'
import cls from './Input.module.scss'
import { classNames } from '../../../helpers/classNames'
 
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
 
const Input: FC<InputProps> = ({ 
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {        
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.Input, {}, [wrapperStyle])}>
            <div onClick={handleClick} className={'flex flex-col text-base w-[100%]'}>
                {label ? <label className='text-base mb-[10px]'>{label}</label> : null}
                <input
                    ref={inputRef}
                    aria-label={name}
                    data-testid={name}
                    tabIndex={0}
                    type={type}
                    name={name}
                    onChange={onChangeHandler}
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
 
export default Input