import axios from 'axios';
import * as action from './actions';

export const fetchClothesFail = (error) => {
    return {
        type: action.FETCH_CLOTHES_FAIL,
        error: error
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

export const fetchSearchedClothes = (filt) => {
    return dispatch => {
        dispatch(fetchClothesStart());
        axios.get('https://fakestoreapi.com/products').then(res => {
            const regex = new RegExp(`(.*${filt}.*)`, 'g')
            const result = res.data.filter(article => regex.test(article.title.toLowerCase()));
            dispatch(setClothes(result))
            console.log(res.data);
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
            console.log(response.data)
            dispatch(setClothes(response.data));
        }).catch(error => {
            dispatch(fetchClothesFail());
        })
    }
}
