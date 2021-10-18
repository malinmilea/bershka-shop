import React from "react";
import Logo from "../Toolbar/Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItem from "../Toolbar/NavigationItems/NavigationItem/NavigationItem";
import { BsX } from 'react-icons/bs';
import classes from './SideDrawer.module.css';
import MobileButtonMenu from "../../UI/MobileButtonMenu/MobileButtonMenu";
import BottomNavigation from "./BottomNavigation/BottomNavigation";
import PromoImage from "../../UI/PromoImage/PromoImage";
import './CssEffect.css'
import { CSSTransition } from "react-transition-group";


const sideDrawer = (props) => {
    return (<>
        <Backdrop show={props.show} closed={props.closed} />
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={400}
            classNames="fade">
            <div className={classes.SlideDrawer} >
                <div className={classes.LogoExit}>
                    <BsX onClick={props.closed} className={classes.ExitIcon} />
                    <div className={classes.LogoContainer} >
                        <Logo />
                    </div>
                </div>
                <ul className={classes.GenderSelector}>
                    <NavigationItem link='men'><div onClick={props.closed}><MobileButtonMenu>MEN</MobileButtonMenu></div></NavigationItem>
                    <NavigationItem link='women'><div onClick={props.closed}><MobileButtonMenu>WOMEN</MobileButtonMenu></div></NavigationItem>
                </ul>
                <PromoImage />
            </div>
        </CSSTransition>

        <BottomNavigation show={props.show} closed={props.closed} />
    </>)
}

export default React.memo(sideDrawer, (prevProps, nextProps) => prevProps.show === nextProps.show);