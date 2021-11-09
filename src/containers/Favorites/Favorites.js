import React, { useEffect, useRef, useCallback, useState } from "react";
import * as actions from '../../store/actions/article';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import FavoriteItem from "../../components/UI/FavoriteItem/FavoriteItem";
import classes from './Favorites.module.css';
import NothingtoSeeHere from '../../components/NothingToSeeHere/NothingToSeeHere';

const Favorites = (props) => {
    const itemRef = useRef();
    const [favItems, setFavItems] = useState(props.favorite);
    const { getFavClothes, setFavClothes } = props;

    useEffect(() => {
        getFavClothes();
    }, []);

    useEffect(() => {
        setFavItems(props.favorite);
        itemRef.current = props.favorite.map(fav => fav.id);
    }, [props.favorite]);

    console.log(favItems);

    let favProd = <Spinner />

    const deleteFavorite = useCallback((id) => {
        const favArticles = favItems.filter(fav => itemRef.current.includes(fav.id));
        setFavClothes(favArticles.filter(article => article.id !== +id));
    }, [])


    if (props.notEmpty) {
        favProd = favItems.map(fav => {
            return <FavoriteItem
                key={fav.id}
                id={fav.id}
                title={fav.title}
                image={fav.image}
                price={fav.price}
                delete={deleteFavorite}
            />
        })
    } else {
        favProd = < NothingtoSeeHere favorite error />
    }


    return (<div className={classes.FavBox}>
        {favProd}
    </div>);
}

const mapStateToProps = state => {
    return {
        favorite: state.article.favClothes,
        notEmpty: state.article.favClothes.length >= 1,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFavClothes: () => dispatch(actions.getFavoriteClothes()),
        setFavClothes: (listArticles) => dispatch(actions.favoriteClothes(listArticles))
    }
}



export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Favorites));