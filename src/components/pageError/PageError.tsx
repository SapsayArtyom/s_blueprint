import { FC } from 'react'
import cls from './PageError.module.scss'
import { classNames } from '../../helpers/classNames'
import Button from '../ui/Button/Button'
 
interface PageErrorProps {
    className?: string
}
 
const PageError: FC<PageErrorProps> = ({ className }) => {

    const reloadPage = () => {
        location.reload();
    }
 
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>Oops, something`s broken</p>
            <Button onClick={reloadPage}>
                Reload
            </Button>
        </div>
    )
}
 
export default PageError