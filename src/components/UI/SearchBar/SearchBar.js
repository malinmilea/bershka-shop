import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Logo from "../../Navigation/Toolbar/Logo/Logo";
import { BsX } from 'react-icons/bs';
import { useHistory } from "react-router";
import classes from './SearchBar.module.css';
import { Transition } from "react-transition-group";

const SearchBar = props => {
    const [clothesRequest, setClothesRequest] = useState("");
    let history = useHistory();
    console.log(history);
    const getRequestedArticles = (event) => {
        event.preventDefault();
        history.location.pathname = '/';
        history.replace(`search/${clothesRequest.toLocaleLowerCase()}`);
        props.closed();
        setClothesRequest('');
    };
    return (<>
        <Backdrop show={props.show} closed={props.closed} />
        <Transition mountOnEnter unmountOnExit in={props.show} timeout={300}>
            {state => {
                const cssClasses = [classes.SearchBar, state === 'entering' ? classes.ModalOpen : state === 'exiting' ? classes.ModalClosed : null]
                return (< div className={cssClasses.join(' ')} >
                    <div className={classes.LogoExit}>
                        <Logo />
                        <BsX className={classes.Exit} onClick={props.closed} />
                    </div>
                    <form onSubmit={(e) => getRequestedArticles(e)}>
                        <input type='text' value={clothesRequest} onChange={(e) => setClothesRequest(e.target.value)} className={classes.SearchInput} placeholder='What are you looking for?' />
                    </form>
                </div>)
            }}
        </Transition>
    </>)
}

export default React.memo(SearchBar, (prevProps, nextProps) => prevProps.show === nextProps.show);