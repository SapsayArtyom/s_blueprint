import MainBlock from '../../components/MainBlock/MainBlock';
import { classNames } from '../../helpers/classNames';
import cls from './SchedulePage.module.scss';

interface SchedulePageProps {
    className?: string;
}

const SchedulePage = ({ className }: SchedulePageProps) => {

	return <div className={classNames(cls.SchedulePage, {}, [className])}>
		<MainBlock />
	</div>;
};

export default SchedulePage;
