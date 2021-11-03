import React, { useEffect, useRef, useState } from "react";
import classes from './Article.module.css';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const Article = (props) => {
    const { toggleFavorite, isFav } = props;

    const [favorited, setFavorited] = useState(isFav);


    return (<div className={classes.ProductBox} >
        <Link to={props.url}>
            <img src={props.image} className={classes.ProductPicture} />
        </Link>
        <div className={classes.TitleHeart}>
            <p className={classes.Title}>{props.title}</p>
            <div onClick={() => {
                toggleFavorite(props.id, props.image, props.price, props.title, favorited, props.favoritesOtherPage, props.pageClothes);
                setFavorited(favorited => !favorited)
            }}>
                {favorited ? <IoHeart className={classes.Icon} style={{ color: 'red' }} />
                    : <IoHeartOutline className={classes.Icon} />}
            </div>
        </div>
        <div className={classes.QualityPrice}>
            <p className={classes.Price}>{props.price} &#36;</p>
            <p className={classes.Quality}>{props.rating} <BsStarFill className={classes.Star} /></p>
        </div>
    </div>)
}

export default React.memo(Article, (a, b) => {
    return a.favorited === b.favorited
});
