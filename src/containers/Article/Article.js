import React, { useCallback, useEffect, useState } from "react";
import classes from './Article.module.css';
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/article';
import * as basketActions from '../../store/actions/basket';
import { toast } from "react-toastify";
import NothingToSeeHere from "../../components/NothingToSeeHere/NothingToSeeHere";

const Article = (props) => {
    const [buttonStatus, setButtonStatus] = useState(false);
    const { match, onFetchingArticle, loading, articles, getBasket, error } = props;
    const { params } = match;
    const { id } = params
    useEffect(() => {
        getBasket();
        onFetchingArticle(id);
    }, [onFetchingArticle, id, getBasket]);

    const handleSize = (e) => {
        e.preventDefault();
        console.log(articles);
        if (articles.every(art => art.id !== props.article.id)) {
            props.setBasket([...articles, {
                id: props.article.id,
                price: props.article.price,
                size: e.target.size.value,
                image: props.article.image,
                title: props.article.title
            }])
        } else {
            const newArticles = [...articles];
            const indexOfArticle = newArticles.findIndex(a => a.id === props.article.id);
            const selectedArticle = { ...newArticles[indexOfArticle], size: newArticles[indexOfArticle].size + e.target.size.value };
            newArticles[indexOfArticle] = selectedArticle;
            props.setBasket(newArticles);
        }
        toast.success('Added successfully in bakset')
    }

    const ableButton = useCallback((e) => {
        e.preventDefault();
        e.target.value === '' ? setButtonStatus(false) : setButtonStatus(true);
    }, [])

    let article = <Spinner />

    if (!loading && !error) {
        article = (<div className={classes.ProductPage}>
            <div className={classes.ImageBox}>
                <img src={props.article.image} className={classes.Image} />
            </div>
            <div className={classes.InfoProduct}>
                <p className={classes.Info}>{props.article.title}</p>
                <p className={classes.Info} style={{ fontWeight: 400 }}>{props.article.price} &#36;</p>
                <p className={classes.Description}>{props.article.description}</p>
                <form className={classes.SizeForm} onSubmit={handleSize}>
                    <select className={classes.Selector} name='size' defaultValue="" onChange={ableButton}>
                        <option value="" disabled> = Select size =</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    <input type='submit' value="Add to Basket" className={classes.SubmitButton} disabled={!props.isAuth || !buttonStatus} />
                </form>
                {props.isAuth ? null : <p style={{ textAlign: 'center' }}>*Please log in to add products to your cart</p>}
            </div>
        </div>)
    }

    if (error) {
        article = <NothingToSeeHere error={true} logged={!props.isAuth} />
        toast.error('Something went wrong!', {
            position: toast.POSITION.TOP_LEFT
        })
    }

    return (<>{article}</>)
}

const mapStateToProps = state => {
    return {
        article: state.article.article,
        loading: state.article.loading,
        error: state.article.error,
        isAuth: state.auth.token !== null,
        articles: state.basket.articles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingArticle: (id) => dispatch(actions.fetchArticle(id)),
        setBasket: (article) => dispatch(basketActions.setBasketArticle(article)),
        getBasket: () => dispatch(basketActions.getBasketArticle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Article, (prevProps, nextProps) => prevProps.loading === nextProps.next && prevProps.match == nextProps.match));