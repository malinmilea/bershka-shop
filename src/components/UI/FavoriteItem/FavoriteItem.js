import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from './FavoriteItem.module.css';
import LazyLoad from 'react-lazyload';
import { AiFillDelete } from 'react-icons/ai'
const FavoriteItem = (props) => {
    const url = `/article/${props.id}`;
    const [ratioH, setRatioH] = useState(true);
    const cssClass = ratioH ? [classes.ProductPicture, classes.FillWidth] : [classes.ProductPicture, classes.FillHeight];

    const handleSizes = ({ target: img }) => {
        console.log(img.offsetHeight, img.offsetWidth);
        if (img.offsetHeight < img.offsetWidth) {
            setRatioH(false);
        }
    }
    return (<div className={classes.ProductBox} data-aos="fade-in">
        <Link to={url}>
            <LazyLoad className={classes.ImageBox} once>
                <img src={props.image} className={cssClass.join(' ')} onLoad={handleSizes} />
            </LazyLoad>
        </Link>
        <div className={classes.TitleButton}>
            <p className={classes.Title}>{props.title}</p>
            <AiFillDelete className={classes.DeleteButton} onClick={() => props.delete(props.id)} />
        </div>
    </div>)
};

export default React.memo(FavoriteItem);