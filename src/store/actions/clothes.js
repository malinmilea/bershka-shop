import axios from 'axios';
import * as action from './actions';

export const fetchClothesFail = (error) => {
    return {
        type: action.FETCH_CLOTHES_FAIL,
        error: error
    }
}

export const setSearchClothes = (searchResults) => {
    return {
        type: action.SET_SEARCH_RESULTS,
        searchResults: searchResults
    }
}

export const fetchClothesStart = () => {
    return {
        type: action.FETCH_CLOTHES_START,
    };
};

export const setClothes = (clothes) => {
    return {
        type: action.SET_CLOTHES,
        clothes: clothes
    }
}

export const filterResults = (price, rating) => {
    return {
        type: action.FILTER_RESULTS,
        price: price,
        rating: rating
    }
}

export const fetchSearchedClothes = (filt, searchBar) => {
    return dispatch => {
        !searchBar && dispatch(fetchClothesStart());
        axios.get('https://fakestoreapi.com/products').then(res => {
            const regex = new RegExp(`(.*${filt}.*)`, 'g')
            const result = res.data.filter(article => regex.test(article.title.toLowerCase()));
            searchBar ? dispatch(setSearchClothes(result)) : dispatch(setClothes(result));
        }).catch(err => {
            dispatch(fetchClothesFail());
        });
    }
}


export const fetchClothes = (query) => {
    return dispatch => {
        dispatch(fetchClothesStart());
        const url = query ? `https://fakestoreapi.com/products/category/${query}` : 'https://fakestoreapi.com/products';
        axios.get(url).then(response => {
            dispatch(setClothes(response.data));
        }).catch(error => {
            dispatch(fetchClothesFail());
        })
    }
}

