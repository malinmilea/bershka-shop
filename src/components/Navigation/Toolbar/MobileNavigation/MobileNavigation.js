import DrawerToggle from "../../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../Logo/Logo";
import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import { BsSearch, BsBag } from 'react-icons/bs'
import { BiHeart } from 'react-icons/bi';
import classes from './MobileNavigation.module.css'


const mobileNavigation = (props) => {
    return (<ul className={classes.MobileNav}>
        <ul className={classes.LogoBurger}>
            <DrawerToggle clicked={props.opened} />
            <NavigationItem >
                <Logo />
            </NavigationItem>
        </ul>
        <ul className={classes.IconsBar}>
            <div>
                <BsSearch className={classes.Icon} onClick={props.search} />
            </div>
            <NavigationItem link='favorites'>
                <BiHeart className={classes.Icon} />
            </NavigationItem>
            <NavigationItem link="basket">
                <BsBag className={classes.Icon} />
            </NavigationItem>
        </ul>
    </ul>)
}

export default mobileNavigation;