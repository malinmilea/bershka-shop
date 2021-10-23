import React, { useEffect } from "react";
import * as actions from '../../store/actions/basket';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import BasketItem from "../../components/UI/BasketItem/BasketItem";
import TotalPrice from "../../components/UI/BasketItem/TotalPrice/TotalPrice";
import NothingToSeeHere from "../../components/NothingToSeeHere/NothingToSeeHere";

const MyBasket = (props) => {
    const { getBasket } = props;
    useEffect(() => {
        getBasket()
    }, [getBasket])

    let basketArticles = <Spinner />
    console.log(props.articles, 'mybasket');

    const deleteArticle = (id) => {
        const newArticles = [...props.articles];
        props.setBasket(newArticles.filter(a => a.id !== id))
    }
    basketArticles = <NothingToSeeHere logged={!props.isAuth} />

    if (props.notEmpty && props.isAuth) {
        basketArticles = props.articles.map(article => {
            return <BasketItem
                key={article.id}
                id={article.id}
                articles={props.articles}
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
        getBasket: () => dispatch(actions.getBasketArticle()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBasket);