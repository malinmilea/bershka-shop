import * as actions from './actions';
import axios from 'axios';

export const setBasketArticle = (articles) => {
    localStorage.setItem('BasketArticles', JSON.stringify(articles));
    return {
        type: actions.SET_BASKET_ARTICLE,
        articles: articles,
    }
}

export const getBasketArticle = () => {
    const basket = JSON.parse(localStorage.getItem('BasketArticles'));
    return {
        type: actions.GET_BASKET_ARTICLE,
        articles: basket ? basket : [],
    }
}

export const getBasketFails = (error) => {
    return {
        type: actions.GET_BASKET_FAILS,
        error: error
    }
}


export const postOrder = (articles, finalPrice, token, localId) => {
    return dispatch => {
        const url = 'https://react-bershka-default-rtdb.firebaseio.com/orders.json';
        const basketUrl = 'https://react-bershka-default-rtdb.firebaseio.com/basket.json';
        const dataOrder = { articles: articles, finalPrice: finalPrice, token: token };
        axios.post(`${url}?auth=${token}`, dataOrder).then(res => {
            localStorage.removeItem('BasketArticles');
            axios.delete(`${basketUrl}?auth=${token}&token=${localId}`);
            dispatch(setBasketArticle([]));
        }).catch(err => {
            dispatch(getBasketFails())
        })
    }
}