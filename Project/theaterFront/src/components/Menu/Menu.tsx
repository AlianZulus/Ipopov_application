
import React, {useState} from 'react';
import styles from './Menu.module.css';
import logo from '../../assets/icons/DALL·E 2024-10-22 17.35.10 - A modern and elegant theater logo, with a minimalistic design. The logo should incorporate theater elements like stage curtains, spotlights, or masks,.webp';
import {ShoppingIcon} from "../../assets/icons/ShoppingIcon";

type MenuItem = {
    id: number;
    title: string;
    sectionId: string;
};

type MenuProps = {
    scrollToSection: (sectionId: string) => void;
    openModalCartHandler: () => void;
    menu: MenuItem[];
    test: any
};

export const Menu = ({ scrollToSection, openModalCartHandler, menu, test }: MenuProps) => {
    const [iconColor, setIconColor] = useState('#EEE');
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.menuContainer}>
                {menu.map((item) => (
                    <div
                        onClick={() => scrollToSection(item.sectionId)}
                        className={styles.list}
                        key={item.id}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className={styles.list} onClick={openModalCartHandler} onMouseEnter={() => setIconColor('#309797')}
                 onMouseLeave={() => setIconColor('#EEE')}>
                <ShoppingIcon fill={iconColor}/>
                <div className={styles.basketNumber} onMouseEnter={() => setIconColor('#309797')}
                     onMouseLeave={() => setIconColor('#EEE')} style={{ backgroundColor: iconColor}}>{test}</div>
            </div>
        </div>
    );
};
