import cls from './Navbar.module.scss';

import NavbarLink from './NavbarLink';
import AppLink from '../ui/AppLink/AppLink';

interface LinksProps {
    className?: string;
    onClick?: () => void;
}

const Links = ({ onClick }: LinksProps) => {
    return (
        <>
            <NavbarLink onClick={onClick}>
                <AppLink className={cls.active} to={'/'}>
                    Home
                </AppLink>
            </NavbarLink>
            <NavbarLink onClick={onClick}>
                <AppLink className={cls.active} to={'/sizes'}>
                    Sizes
                </AppLink>
            </NavbarLink>
        </>
    );
};

export default Links;
