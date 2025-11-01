import { FC } from 'react'
import cls from './Card.module.scss'
import { classNames } from '../../../helpers/classNames'
 
export interface CardProps {
    className?: string
    src: string
    title: string
    id?: string
    url?: string
    onClick?: () => void
}
 
const Card: FC<CardProps> = ({ className, src, title, url, onClick }) => {
 
    return (
        <div className={classNames(cls.Card, {}, [className, 'flex', 'flex-col', 'items-center', 'max-sm:pl-[4%]', 'max-sm:pr-[4%]'])}>
            <img className={cls.img} src={src} alt='game card' onClick={onClick}/>
            <p className='text-xl mt-[15px]'>{title}</p>
        </div>
    )
}
 
export default Card