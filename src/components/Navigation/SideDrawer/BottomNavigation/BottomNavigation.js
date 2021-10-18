import React from "react";
import { BiHome } from 'react-icons/bi';
import { IoPersonOutline } from 'react-icons/io5';
import MobileButtonMenu from "../../../UI/MobileButtonMenu/MobileButtonMenu";
import NavigationItem from "../../Toolbar/NavigationItems/NavigationItem/NavigationItem";
import classes from './BottomNavigation.module.css';
import { connect } from "react-redux";
import * as authActions from '../../../../store/actions/auth';

const bottomNavigation = props => {
    return (props.show ? <div className={classes.BottomNav}>
        <ul className={classes.HomeAccount}>
            <div className={classes.BottomNavBox} onClick={props.closed}>
                <NavigationItem >
                    <BiHome className={classes.Icons} />
                    <MobileButtonMenu>HOME</MobileButtonMenu>
                </NavigationItem>
            </div>
            <div className={classes.BottomNavBox} onClick={() => {
                props.closed();
                props.showLogin();
            }}>
                <div>
                    <IoPersonOutline className={classes.Icons} />
                    <MobileButtonMenu>ACCOUNT</MobileButtonMenu>
                </div>
            </div>
        </ul>
    </div> : null);
}

const mapDispatchToProps = dispatch => {
    return {
        showLogin: () => dispatch(authActions.showModal())
    }
}

export default connect(null, mapDispatchToProps)(bottomNavigation);