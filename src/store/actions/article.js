import * as action from './actions';
import axios from 'axios';

export const fetchArticleFail = (error) => {
    return {
        type: action.FETCH_ARTICLE_FAILS,
        error: error
    }
}

export const fetchArticleStart = () => {
    return {
        type: action.FETCH_ARTICLE_START,
    };
};

export const setArticle = (article) => {
    return {
        type: action.SET_ARTICLE,
        article: article
    }
}

export const favoriteClothes = (favClothes) => {
    localStorage.setItem('favoriteArticles', JSON.stringify(favClothes));
    return {
        type: action.FAVORITE_CLOTHES,
        favClothes: favClothes
    }
}

export const getFavoriteClothes = () => {
    const favClothes = JSON.parse(localStorage.getItem('favoriteArticles'));
    return {
        type: action.GET_FAVORITE_CLOTHES,
        favClothes: favClothes ? favClothes : []
    }
}

export const fetchArticle = (id) => {
    return dispatch => {
        dispatch(fetchArticleStart());
        const url = `https://fakestoreapi.com/products/${id}`;
        axios.get(url).then(response => {
            dispatch(setArticle(response.data))
        }).catch(error => {
            dispatch(fetchArticleFail())
        })
    }
}