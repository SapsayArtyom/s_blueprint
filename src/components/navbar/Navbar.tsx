import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { classNames } from '../../helpers/classNames'
import cls from './Navbar.module.scss'

import logo from '../../assets/images/logo.png'
import { useAuth } from '../../hooks/useAuth'
import Hamburger from './Hamburger'
import Links from './Links'
import MobileNavbar from './MobileNavbar'
 
interface NavbarProps {
    className?: string
}
 
const Navbar: FC<NavbarProps> = ({ className }) => {	
	const [isOpen, setOpen] = useState<boolean>(false);
	const { user, loading } = useAuth();
	
	const openHandler = useCallback(() => {
		setOpen(!isOpen)
	}, [isOpen]) 
    
	return (
		<div className={classNames(cls.Navbar, {}, [className, 'bg-background', 'justify-center', 'items-center', 'flex', 'w-[100%]', 'flex-col'])}>
			<div className='flex max-w-[1450px] justify-between w-[100%] items-center pt-[25px] pb-[25px]'>
				<div className='flex items-center ml-[30px] select-none'>
					<p className='text-white font-bold text-2xl'>Sport Blueprint</p>
					<img className={cls.logo} src={logo} alt='logo' />
				</div>
				<div>
					{!loading ? user ? <div className='flex items-center text-white'>
						<p className='text-center'>{user.name}</p>
					</div> : null : null}
				</div>
				<div className='md:flex hidden'>
					<Links onClick={() => openHandler()} />
				</div>
				<Hamburger isOpen={isOpen} onClick={() => openHandler()} />
			</div>
			{
				isOpen ? <MobileNavbar onClick={() => openHandler()} /> : null
			}
		</div>

	)
}
 
export default Navbar