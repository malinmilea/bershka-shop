import React, { useEffect, useRef, useCallback } from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import { BsXLg } from 'react-icons/bs';
import classes from './Login.module.css'
import { isEqual } from 'lodash';
import './CssEffect.css';
import { schemaLogin, schemaRegister } from "./ValidationSchema/ValidationSchema";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from "../UI/Spinner/Spinner";
import { toast } from 'react-toastify';

const Login = (props) => {
    const { register: registerLogin, handSubmit: handleLogin, reset: resetLoginForm, errors: ErrLogin, submited: submitedLogin, checkErrors, loginData: loginData } = useAuth(schemaLogin);

    const { register: registerRegister, handSubmit: handleRegister, reset: resetRegisterForm, errors: ErrRegister, submited: submitedRegister, checkErrors: checkErrorsRegister, loginData: registerData } = useAuth(schemaRegister);

    const dispatch = useDispatch();

    const newUser = useSelector(state => {
        return state.auth.newUser;
    });

    const isAuth = useSelector(state => {
        return state.auth.token !== null;
    });

    const show = useSelector(state => {
        return state.auth.show;
    });

    const token = useSelector(state => {
        return state.auth.token;
    });

    const localId = useSelector(state => {
        return state.auth.userId;
    });

    const error = useSelector(state => {
        return state.auth.error;
    })

    const onCreatingNewUser = () => dispatch(actions.createNewUser());
    const isAuthenticated = () => dispatch(actions.welcomeUser());
    const authentication = (dataAccount, login) => dispatch(actions.auth(dataAccount, login));
    const logIn = () => dispatch(actions.logIn());
    const logout = useCallback((token, localId) => dispatch(actions.saveBasketAndLogout(token, localId)), [token, localId]);
    const showModal = () => dispatch(actions.showModal())

    console.log(ErrRegister, ErrLogin);
    console.log(error);

    useEffect(() => {
        if (error) {
            toast.error('Something went wrong!');
        }
        return () => {
            setTimeout(isAuthenticated, 1000)
        }
    }, [error])

    useEffect(() => {
        if (submitedLogin) {
            resetLoginForm();
            isAuthenticated();
            authentication(loginData, true);
        }
        checkErrors(ErrLogin, show);
    }, [submitedLogin, ErrLogin]);

    useEffect(() => {
        if (submitedRegister) {
            resetRegisterForm();
            isAuthenticated();
            authentication(registerData, false);
        }
        checkErrorsRegister(ErrRegister, show);
    }, [submitedRegister, ErrRegister]);
    // console.log('render login');

    let loginForm = <Spinner />;

    loginForm = (<form className={classes.Form} onSubmit={
        handleLogin}>
        <input name="email" placeholder='Email' className={classes.Input} {...registerLogin('email', { required: true })} />
        <input name="password" placeholder="Password" type='password' className={classes.Input} {...registerLogin('password', { required: true })} />
        <input type='submit' value="LOG IN" className={classes.Button} />
        <p className={classes.RegisterText}>Don't have an account? <a className={classes.RegisteLink} onClick={onCreatingNewUser}>Register</a></p>
    </form>)

    if (newUser) {
        loginForm = (<form className={classes.Form} onSubmit={handleRegister}>
            <input name="emailRegister" placeholder='Email' className={classes.Input} {...registerRegister('emailRegister', { required: true })} />
            <input name="passRegister" placeholder="Password" type='password' className={classes.Input} {...registerRegister('passRegister', { required: true })} />
            <input name="repeatPassRegister" placeholder="Repeat Password" type='password' className={classes.Input}
                defaultValue=''
                {...registerRegister('repeatPassRegister', { required: true })} />
            <input type='submit' value="REGISTER" className={classes.Button} />
            <p className={classes.RegisterText}>Do you already have an account?<a className={classes.RegisteLink} onClick={logIn}>Log in</a></p>
        </form>)
    }

    if (isAuth) {
        loginForm = (
            <div className={classes.Form} style={{ height: '200px', textAlign: 'center' }}>
                <p className={classes.AuthTitle}>Hi, Radu Leat-Daniel!</p>
                <button className={classes.Button} onClick={() => logout(token, localId)}>LOG OUT</button></div>)
    }



    return (<div>
        <Backdrop show={show} closed={showModal} />
        <CSSTransition
            mountOnEnter
            unmountOnExit
            timeout={400}
            classNames='fadeLogin'
            in={show}>
            <div className={classes.LoginMenu}>
                <BsXLg className={classes.ExitButton} onClick={showModal} />
                {loginForm}
            </div>
        </CSSTransition>

    </div>)
}

// const mapStateToProps = state => {
//     return {
//         newUser: state.auth.newUser,
//         isAuth: state.auth.token !== null,
//         show: state.auth.show,
//         token: state.auth.token,
//         localId: state.auth.userId,
//         error: state.auth.error
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onCreatingNewUser: () => dispatch(actions.createNewUser()),
//         isAuthenticated: () => dispatch(actions.welcomeUser()),
//         authentication: (dataAccount, login) => dispatch(actions.auth(dataAccount, login)),
//         logIn: () => dispatch(actions.logIn()),
//         logout: (token, localId) => dispatch(actions.saveBasketAndLogout(token, localId)),
//         showModal: () => dispatch(actions.showModal())
//     }
// }

Login.whyDidYouRender = true;

export default React.memo(Login, isEqual);
