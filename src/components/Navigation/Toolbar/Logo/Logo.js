import React from "react";
import { ReactComponent as BershkaLogo } from '../../../../assets/logo.svg';
import classes from './Logo.module.css'

const logo = props => (
    <div className={classes.Logo}>
        <BershkaLogo className={classes.Bershka} />
    </div>
)

export default logo;