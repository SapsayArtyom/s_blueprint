import { FC } from 'react'
import cls from './Loader.module.scss'
import { classNames } from '../../../helpers/classNames'
 
interface LoaderProps {
    className?: string
}
 
const Loader: FC<LoaderProps> = ({ className }) => {
 
    return (
        <div className={classNames(cls['lds-ellipsis'], {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
 
export default Loader