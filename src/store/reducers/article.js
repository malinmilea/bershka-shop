import { updateObject } from "../utility";
import * as actions from '../actions/actions';

const initialState = {
    article: [],
    error: false,
    loading: false,
    favClothes: [],
}

const fetchArticleFail = (state) => {
    return updateObject(state, {
        error: true,
        loading: false
    })
};

const fetchArticleSuccess = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: false,
        article: action.article
    })
};

const fetchArticleStart = (state) => {
    return updateObject(state, {
        error: false,
        loading: true,
    })
};


const favoriteClothes = (state, action) => {
    return updateObject(state, {
        favClothes: action.favClothes
    })
}

const getFavoriteClothes = (state, action) => {
    return updateObject(state, {
        favClothes: action.favClothes
    })
}

const setArticle = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: false,
        article: action.article
    })
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ARTICLE_START: return fetchArticleStart(state);
        case actions.FETCH_ARTICLE_SUCCESS: return fetchArticleSuccess(state, action);
        case actions.FETCH_ARTICLE_FAILS: return fetchArticleFail(state, action);
        case actions.SET_ARTICLE: return setArticle(state, action);
        case actions.FAVORITE_CLOTHES: return favoriteClothes(state, action);
        case actions.GET_FAVORITE_CLOTHES: return getFavoriteClothes(state, action);
        default:
            return state;
    }
}

export default reducer;