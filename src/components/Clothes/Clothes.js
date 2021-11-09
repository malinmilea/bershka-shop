import React, { useCallback, useEffect, useState, useRef } from "react";
import classes from './Clothes.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Article from "./Article/Article";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/clothes';
import * as artActions from '../../store/actions/article';
import NothingToSeeHere from "../NothingToSeeHere/NothingToSeeHere";
import { toast } from "react-toastify";


const Clothes = (props) => {
    const { onFetchingClothes, onFetchingAllClothes, section, filtered, filters, getFavClothes, favorite, updateFavorite } = props;
    const listOfItems = useRef();

    useEffect(() => {
        getFavClothes();
    }, []);


    useEffect(() => {
        filtered ? onFetchingAllClothes(section) : onFetchingClothes(section);
    }, [filtered, section, filters]);

    const isFavorite = props.clothes.map(art => [art.id, favorite.some(article => article.id === art.id)]);



    useEffect(() => {
        const atrticlesIds = props.clothes.map(clt => clt.id);
        const favorieIds = props.favorite.map(fav => fav.id);
        const sectionIds = favorieIds.filter(id => atrticlesIds.includes(id));
        listOfItems.current = sectionIds;
    }, [props.clothes, props.favorite]);


    const toggleFavorite = useCallback((id, image, price, title, isFav, otherFav, sectionClothes) => {
        let favoriteItems = [];
        const updatedFavorite = sectionClothes.filter(item => listOfItems.current.includes(item.id));
        favoriteItems = updatedFavorite.concat(otherFav);
        if (!isFav) {
            updateFavorite([...favoriteItems, {
                id: id,
                image: image,
                price: price,
                title: title
            }])
        } else {
            updateFavorite(favoriteItems.filter(article => article.id !== id));
        }
    }, []);

    let clothes = <Spinner />
    if (!props.loading && !props.error) {
        const favoritesOtherPage = props.favorite.filter(fav => {
            const clothesId = props.clothes.map(clt => clt.id);
            return !clothesId.includes(fav.id);
        })
        clothes = (<div className={classes.ClothesBox}>
            {props.clothes.map(article => {
                const url = `/article/${article.id}`
                const item = <Article
                    url={url}
                    key={article.id}
                    id={article.id}
                    image={article.image}
                    price={article.price}
                    rating={article.rating.rate}
                    title={article.title}
                    toggleFavorite={toggleFavorite}
                    favoritesOtherPage={favoritesOtherPage}
                    isFav={isFavorite ? isFavorite[isFavorite.findIndex((el) => el[0] === article.id)][1] : false}
                    pageClothes={props.clothes}
                />
                if (filters.price) {
                    const filteredItems = (article.price >= +filters.price && article.rating.rate <= +filters.rating) ? item : null;
                    return filteredItems;
                } else {
                    return item;
                }
            })
            }
        </div >)
    }
    if (props.error) {
        clothes = <NothingToSeeHere error={true} logged={!props.isAuth} />
        toast.error('Something went wrong!', {
            position: toast.POSITION.TOP_LEFT
        });
    }

    return (<>
        {clothes}
    </>)
}

const mapStateToProps = state => {
    return {
        clothes: state.clothes.clothes,
        loading: state.clothes.loading,
        error: state.clothes.error,
        isAuth: state.auth.token !== null,
        filters: state.clothes.filter,
        favorite: state.article.favClothes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingClothes: (query) => dispatch(actions.fetchClothes(query)),
        onFetchingAllClothes: (filter) => dispatch(actions.fetchSearchedClothes(filter)),
        filterClothes: (price, rating) => dispatch(actions.filterResults(price, rating)),
        getFavClothes: () => dispatch(artActions.getFavoriteClothes()),
        updateFavorite: (favorites) => dispatch(artActions.favoriteClothes(favorites))
    }
}

Clothes.whyDidYouRender = true;

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Clothes));