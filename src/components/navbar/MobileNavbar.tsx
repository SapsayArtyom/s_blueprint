import { FC } from 'react'
import cls from './MobileNavbar.module.scss'
import { classNames } from '../../helpers/classNames'
import Links from './Links'
 
interface MobileNavbarProps {
    className?: string
    onClick?: () => void 
}
 
const MobileNavbar: FC<MobileNavbarProps> = ({ className, onClick }) => {
 
    return (
        <div className={classNames(cls.MobileNavbar, {}, [''])}>
            <Links onClick={onClick} />
            <p className='text-orange text-xl text-center mt-[70px]'>We are Fire</p>
        </div>
    )
}
 
export default MobileNavbar