import React, { useEffect, useRef } from "react";
import classes from './Article.module.css';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../../store/actions/article';


const Article = (props) => {
    const { favorite, updateFavorite } = props;
    console.log(props);

    const toggleFavorite = () => {
        const isFav = favorite.some(article => article.id === props.id);
        console.log(isFav, props.id);
        if (!isFav) {
            updateFavorite([...favorite, {
                id: props.id,
                image: props.image,
                price: props.price,
                title: props.title
            }])
        } else {
            updateFavorite(favorite.filter(article => article.id !== props.id))
        }
    }

    return (<div className={classes.ProductBox} >
        <Link to={props.url}>
            <img src={props.image} className={classes.ProductPicture} />
        </Link>
        <div className={classes.TitleHeart}>
            <p className={classes.Title}>{props.title}</p>
            <div onClick={toggleFavorite}>
                {favorite.some(article => article.id === props.id)
                    ? <IoHeart className={classes.Icon} style={{ color: 'red' }} />
                    : <IoHeartOutline className={classes.Icon} />}
            </div>
        </div>
        <div className={classes.QualityPrice}>
            <p className={classes.Price}>{props.price} &#36;</p>
            <p className={classes.Quality}>{props.rating} <BsStarFill className={classes.Star} /></p>
        </div>
    </div>)
}
const mapStateToProps = state => {
    return {
        favorite: state.article.favClothes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFavorite: (favArticles) => dispatch(actions.favoriteClothes(favArticles)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Article, (prevProps, nextProps) => {
    if (prevProps.favorite.some(art => art.id === nextProps.id) && nextProps.favorite.every(art => art.id !== prevProps.id)) {
        return false;
    }

    if (prevProps.favorite.every(art => art.id !== nextProps.id) && nextProps.favorite.some(art => art.id === prevProps.id)) {
        return false;
    }

    return true;
}));
