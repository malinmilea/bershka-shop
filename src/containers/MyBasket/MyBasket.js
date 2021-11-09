import React, { useCallback, useEffect, useState } from "react";
import * as actions from '../../store/actions/basket';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import BasketItem from "../../components/UI/BasketItem/BasketItem";
import TotalPrice from "../../components/UI/BasketItem/TotalPrice/TotalPrice";
import NothingToSeeHere from "../../components/NothingToSeeHere/NothingToSeeHere";

const MyBasket = (props) => {
    const { getBasket, articles, setBasket } = props;
    const [localArticles, setLocalArticles] = useState(articles);


    useEffect(() => {
        getBasket();
    }, []);


    useEffect(() => {
        if (localArticles.length > 0) {
            setBasket(localArticles);
        }
        if (localArticles.length === 0 && articles.length === 1) {
            setBasket([]);
        }
    }, [localArticles]);


    useEffect(() => {
        setLocalArticles(articles);
    }, [articles]);



    let basketArticles = <Spinner />

    const deleteArticle = useCallback((id) => {
        setLocalArticles(localArticles => localArticles.filter(a => a.id !== id));
    }, []);

    basketArticles = <NothingToSeeHere logged={!props.isAuth} />

    if (localArticles.length > 0 && props.isAuth) {
        basketArticles = localArticles.map(article => {
            return <BasketItem
                key={article.id}
                id={article.id}
                title={article.title}
                price={article.price}
                size={article.size}
                image={article.image}
                delete={deleteArticle}
            />
        })
    }

    return (<div style={{ marginTop: '60px', marginBottom: '32px' }}>
        {basketArticles}
        {props.isAuth ? <TotalPrice /> : null}
    </div>)
}

const mapStateToProps = state => {
    return {
        articles: state.basket.articles,
        notEmpty: state.basket.articles.length >= 1,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (articles) => dispatch(actions.setBasketArticle(articles)),
        getBasket: () => dispatch(actions.getBasketArticle())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBasket);