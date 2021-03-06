import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    newUser: false,
    userId: null,
    show: false,
    error: false
}

const createNewUser = (state) => {
    return updateObject(state, {
        newUser: true,
        error: false
    })
}

const welcomeUser = (state) => {
    return updateObject(state, {
        newUser: false,
        error: false
    })
}

const logIn = (state) => {
    return updateObject(state, initialState);
}


const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: false
    })
};

const authFail = (state) => {
    return updateObject(state, {
        error: true,
    })
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
        newUser: false,
    });
}

const showModal = (state) => {
    return updateObject(state, {
        show: !state.show,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CREATE_NEW_USER: return createNewUser(state);
        case actions.WELCOME_USER: return welcomeUser(state);
        case actions.LOG_IN: return logIn(state);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_LOGOUT: return authLogout(state, action);
        case actions.SHOW_MODAL: return showModal(state);
        case actions.AUTH_FAIL: return authFail(state);
        default:
            return state;
    }
}

export default reducer;