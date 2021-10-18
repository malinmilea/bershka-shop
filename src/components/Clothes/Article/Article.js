import React, { useEffect, useRef } from "react";
import classes from './Article.module.css';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../../store/actions/article';


const Article = (props) => {
    const { favorite, updateFavorite, getFavClothes } = props;
    console.log(favorite, updateFavorite);
    // const renderCount = useRef(0);
    useEffect(() => {
        getFavClothes();
    }, [])
    // renderCount.current++
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

    // console.log(renderCount.current);
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
        getFavClothes: () => dispatch(actions.getFavoriteClothes())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Article);