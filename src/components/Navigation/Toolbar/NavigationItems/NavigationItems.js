import React, { useEffect } from "react";
import { BiHeart } from 'react-icons/bi';
import { BsPerson, BsBag, BsSearch } from 'react-icons/bs'
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';
import Logo from "../Logo/Logo";
import MenuButton from "../../../UI/MenuButton/MenuButton";
import { connect } from "react-redux";
import * as authActions from '../../../../store/actions/auth'

const navigationItems = props => {
    console.log('navigationItems');
    return (
        <ul className={classes.NavigationItems}>
            <ul className={classes.LogoGender}>
                <NavigationItem>
                    <Logo />
                </NavigationItem>
                <ul className={classes.GenderSelector}>
                    <NavigationItem link='women'>
                        <MenuButton>WOMEN</MenuButton>
                    </NavigationItem>
                    <NavigationItem link='men'>
                        <MenuButton>MEN</MenuButton>
                    </NavigationItem>
                </ul>
            </ul>
            <ul className={classes.OperationalMenu}>
                <ul className={classes.SearchSection} onClick={props.search}>
                    <BsSearch className={classes.SearchIcon} />
                    <input className={classes.SearchToolbar} placeholder="Search" value='' readOnly />
                </ul>
                <ul className={classes.IconsBar}>
                    <div >
                        <BsPerson className={classes.Icon} onClick={props.showLogin} />
                    </div>
                    <NavigationItem link='favorites'>
                        <BiHeart className={classes.Icon} />
                    </NavigationItem>
                    <NavigationItem link='basket'>
                        <BsBag className={classes.Icon} />
                    </NavigationItem>
                </ul>
            </ul>
        </ul>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        showLogin: () => dispatch(authActions.showModal())
    }
}

export default connect(null, mapDispatchToProps)(navigationItems);