import { type FC } from 'react';
import { classNames } from '../../helpers/classNames';
import cls from './NotFoundPage.module.scss';
 
interface NotFoundPageProps {
    className?: string
}
 
const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
 
	return (
		<div className={classNames(cls.NotFoundPage, {}, [className, 'h-[100%]'])}>
            Page not found
		</div>
	);
};
 
export default NotFoundPage;