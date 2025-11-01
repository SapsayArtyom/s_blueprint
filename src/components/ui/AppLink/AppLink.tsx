/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react'
import { type LinkProps, NavLink } from 'react-router-dom'
import { classNames } from '../../../helpers/classNames'
import cls from './AppLink.module.scss'
 
interface AppLinkProps extends LinkProps {
    className?: string
    src?: string
    ref?: any
}
 
const AppLink: FC<AppLinkProps> = (props) => {

	const {to, className, children, src, ref, ...otherProps} = props;
 
	return (
		<NavLink
			ref={ref} 
			to={to} 
			className={(isActive) =>{ 
				return classNames(cls.AppLink, {[cls.active]: isActive.isActive }, [])
			}} 
			{...otherProps}
		>
			{children}
		</NavLink>
	)
}
 
export default AppLink