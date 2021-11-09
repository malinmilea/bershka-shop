import * as actions from './actions';
import axios from 'axios';


export const createNewUser = () => {
    return {
        type: actions.CREATE_NEW_USER,
    };
};


export const welcomeUser = () => {
    return {
        type: actions.WELCOME_USER,
    };
};

export const showModal = () => {
    return {
        type: actions.SHOW_MODAL
    }
}


export const logIn = () => {
    return {
        type: actions.LOG_IN
    }
}

export const authFail = () => {
    return {
        type: actions.AUTH_FAIL
    }
}

export const saveBasketAndLogout = (token, localId) => {
    return dispatch => {
        const basket = JSON.parse(localStorage.getItem('BasketArticles'));
        const url = 'https://react-bershka-default-rtdb.firebaseio.com/basket.json';
        if (basket) {
            axios.delete(`${url}?auth=${token}&token=${localId}`).then(res => {
                axios.post(`${url}?auth=${token}`, { basket: basket, token: localId }).then(res => dispatch(logout()));
            })
        } else {
            dispatch(logout());
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('BasketArticles');
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};



export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const auth = (accountData, login) => {
    return dispatch => {
        const authData = {
            email: login ? accountData.email : accountData.emailRegister,
            password: login ? accountData.password : accountData.passRegister,
            returnSecureToken: true
        };
        const apiKey = 'AIzaSyD6NfciDDWldD0mNZpWYaynmRbix1cK054'
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        if (login) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }
        const basketUrl = `https://react-bershka-default-rtdb.firebaseio.com/basket.json`;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                axios.get(`${basketUrl}?auth=${response.data.idToken}`).then(res => {
                    if (res.data) {
                        const userId = Object.keys(res.data).filter(a => res.data[a].token === response.data.localId);
                        if (userId) {
                            const basket = res.data[userId]?.basket;
                            if (basket) {
                                localStorage.setItem('BasketArticles', JSON.stringify(basket));
                            }
                        }
                    }
                })
            })
            .catch(err => {
                dispatch(authFail());
                // setTimeout(dispatch(welcomeUser()), 1000)
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }
}