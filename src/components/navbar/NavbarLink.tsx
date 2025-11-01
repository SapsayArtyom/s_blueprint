import { FC, ReactNode } from 'react'
import cls from './NavbarLink.module.scss'
import { classNames } from '../../helpers/classNames'
 
interface NavbarLinkProps {
    className?: string
    children: ReactNode
    src?: string
    onClick?: () => void
}
 
const NavbarLink: FC<NavbarLinkProps> = ({ className, children, src, onClick }) => {
    return (
        <div className={classNames(cls.NavbarLink, {}, [className])} onClick={() => onClick && onClick()}>
            {children}
        </div>
    )
}
 
export default NavbarLink