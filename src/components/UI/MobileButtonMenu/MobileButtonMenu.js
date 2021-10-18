import React from "react";
import classes from './MobileButtonMenu.module.css'

const mobileButtonMenu = props => (<button className={classes.Button}>{props.children}</button>)

export default mobileButtonMenu;