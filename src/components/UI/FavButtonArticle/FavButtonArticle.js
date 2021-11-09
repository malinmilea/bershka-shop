import React, { useEffect, useCallback, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/article';
import classes from './FavButtonArticle.module.css';

const FavButtonArticle = (props) => {
    const [favorited, setFavorited] = useState();

    useEffect(() => {
        props.getFavorites();
    }, [])
    useEffect(() => {
        console.log(favorited);
        if (favorited === undefined) {
            setFavorited(props.favoriteItems.some(fav => fav.id === props.id))
        }
    }, [props.favoriteItems]);

    const deleteArticle = useCallback(() => {
        const isFav = favorited;
        console.log(isFav);
        if (isFav) {
            props.setNewFavorites(props.favoriteItems.filter(fav => fav.id !== props.id));
        } else {
            props.setNewFavorites([...props.favoriteItems, {
                id: props.id,
                image: props.image,
                price: props.price,
                rating: props.rating,
                title: props.title,
                description: props.description,
                category: props.category
            }])
        }
        setFavorited(value => !value);
    }, [favorited])

    return (
        <div className={classes.ButtonFav}>
            {favorited ? <AiFillHeart style={{ color: 'red' }} onClick={deleteArticle} /> : <AiOutlineHeart onClick={deleteArticle} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favoriteItems: state.article.favClothes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNewFavorites: (favClothes) => dispatch(actions.favoriteClothes(favClothes)),
        getFavorites: () => dispatch(actions.getFavoriteClothes())
    }
}


export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FavButtonArticle));