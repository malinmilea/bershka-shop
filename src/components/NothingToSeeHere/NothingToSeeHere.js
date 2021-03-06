import React from "react";
import nothingHere from '../../assets/nothingHere.png';
import noResults from '../../assets/noResults.png';
import classes from './NothingToSeeHere.module.css';

const nothingToSeeHere = (props) => (<div className={classes.Container}>
    <img src={props.error ? noResults : nothingHere} className={classes.Image} />
    {!props.favorite ? <p className={classes.Text}>{props.logged ? "You must be logged in to make an order." : ""} {props.error ? 'Something went wrong!' : 'Empty Basket'} </p> : <p className={classes.Text}>The list of favorite products is empty</p>}
</div>)

export default nothingToSeeHere;