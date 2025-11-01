import { FC } from 'react'
import { classNames } from '../../helpers/classNames'
import { useAuth } from '../../hooks/useAuth'
import { useLogoutMutation } from '../../store/apiSlice'
import Button, { ThemeButton } from '../ui/Button/Button'
import Links from './Links'
import cls from './MobileNavbar.module.scss'
 
interface MobileNavbarProps {
    className?: string
    onClick?: () => void 
}
 
const MobileNavbar: FC<MobileNavbarProps> = ({ className, onClick }) => {
	const { user } = useAuth();
	const [logout] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			window.location.href = '/';
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
 
	return (
		<div className={classNames(cls.MobileNavbar, {}, [''])}>
			<Links onClick={onClick} />
			{user && (
				<div className='flex flex-col items-center mt-[30px] gap-3'>
					<p className='text-white text-center'>{user.name}</p>
					<Button
						theme={ThemeButton.SECONDARY}
						onClick={handleLogout}
						className='!h-[40px] !px-6'
					>
						Выйти
					</Button>
				</div>
			)}
			<p className='text-orange text-xl text-center mt-[70px]'>We are Fire</p>
		</div>
	)
}
 
export default MobileNavbar