import React, { useCallback, useEffect } from "react";
import classes from './Clothes.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Article from "./Article/Article";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/clothes';
import * as artActions from '../../store/actions/article';
import NothingToSeeHere from "../NothingToSeeHere/NothingToSeeHere";
import { toast } from "react-toastify";


const Clothes = (props) => {
    const { onFetchingClothes, onFetchingAllClothes, section, filtered, filters, getFavClothes } = props;
    console.log(props, 'clothes');


    useEffect(() => {
        getFavClothes();
    }, [])


    useEffect(() => {
        filtered ? onFetchingAllClothes(section) : onFetchingClothes(section);
    }, [onFetchingClothes, onFetchingAllClothes, filtered, section, filters])

    let clothes = <Spinner />
    if (!props.loading && !props.error) {
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
        filters: state.clothes.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingClothes: (query) => dispatch(actions.fetchClothes(query)),
        onFetchingAllClothes: (filter) => dispatch(actions.fetchSearchedClothes(filter)),
        filterClothes: (price, rating) => dispatch(actions.filterResults(price, rating)),
        getFavClothes: () => dispatch(artActions.getFavoriteClothes())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Clothes);