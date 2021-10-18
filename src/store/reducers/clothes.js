import { filter } from 'dom-helpers';
import * as actions from '../actions/actions';
import { updateObject } from '../utility'

const initialState = {
    clothes: [],
    loading: false,
    error: false,
    filter: {
        price: null,
        rating: null
    }
}

const fetchClothesStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}


const fetchClothesFails = (state) => {
    return updateObject(state, {
        loading: false,
        error: true
    })
}

const setClothes = (state, action) => {
    return updateObject(state, {
        clothes: action.clothes,
        error: false,
        loading: false
    })
}

const filterResults = (state, action) => {
    return updateObject(state, {
        filter: {
            price: action.price,
            rating: action.rating
        }
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_CLOTHES_START: return fetchClothesStart(state);
        case actions.FETCH_CLOTHES_FAIL: return fetchClothesFails(state, action);
        case actions.SET_CLOTHES: return setClothes(state, action);
        case actions.FILTER_RESULTS: return filterResults(state, action);
        default:
            return state;
    }
}

export default reducer;