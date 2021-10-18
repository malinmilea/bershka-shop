import React from "react";
import { Link } from "react-router-dom";
import classes from './FavoriteItem.module.css';

const favoriteItem = (props) => {
    const url = `/article/${props.id}`
    return (<div className={classes.ProductBox} data-aos="fade-in">
        <Link to={url}>
            <img src={props.image} className={classes.ProductPicture} />
        </Link>
        <p className={classes.Title}>{props.title}</p>
    </div>)
};

export default favoriteItem;