import React, { useEffect } from "react";
import * as actions from '../../store/actions/article';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import FavoriteItem from "../../components/UI/FavoriteItem/FavoriteItem";
import classes from './Favorites.module.css';
import NothingtoSeeHere from '../../components/NothingToSeeHere/NothingToSeeHere';

const Favorites = (props) => {
    const { getFavClothes } = props;
    useEffect(() => {
        getFavClothes();
    }, [getFavClothes])

    let favProd = <Spinner />


    if (props.notEmpty) {
        favProd = props.favorite.map(fav => {
            return <FavoriteItem
                key={fav.id}
                id={fav.id}
                title={fav.title}
                image={fav.image}
                price={fav.price}
            />
        })
    } else {
        favProd = < NothingtoSeeHere logged={!props.isAuth} />
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
    }
}



export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Favorites));