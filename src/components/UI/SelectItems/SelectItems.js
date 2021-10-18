import React from "react"
import { BsFilterRight } from 'react-icons/bs';
import classes from './SelectItems.module.css'

const selectItems = (props) => (
    <div className={classes.SelectItems}>
        <h1 className={classes.Title}>{props.name}</h1>
        <BsFilterRight className={classes.Filter} onClick={props.filter} />
    </div>);

export default selectItems;