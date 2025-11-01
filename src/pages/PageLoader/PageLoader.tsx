import { FC } from 'react'
import cls from './PageLoader.module.scss'
import { classNames } from '../../helpers/classNames'
import Loader from '../../components/ui/Loader/Loader'
 
interface PageLoaderProps {
    className?: string
}
 
const PageLoader: FC<PageLoaderProps> = ({ className }) => {
 
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    )
}
 
export default PageLoader