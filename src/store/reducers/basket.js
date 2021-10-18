import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    articles: [],
    error: false
}

const getBasketArticle = (state, action) => {
    return updateObject(state, {
        articles: action.articles,
        error: false
    })
}

const setBasketArticle = (state, action) => {
    return updateObject(state, {
        articles: action.articles,
        error: false
    })
}

const failBasketArticle = (state) => {
    return updateObject(state, {
        error: true,
    })
}


const reducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_BASKET_ARTICLE: return setBasketArticle(state, action);
        case actions.GET_BASKET_ARTICLE: return getBasketArticle(state, action);
        case actions.FAIL_BASKET_ARTICLE: return failBasketArticle(state);
        default: return state;
    }
}

export default reducers;