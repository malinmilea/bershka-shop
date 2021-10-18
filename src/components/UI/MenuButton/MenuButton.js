import React from "react";
import classes from './MenuButton.module.css'

const menuButton = props => (<button className={classes.Button}>{props.children}</button>)

export default menuButton;