import React, { useRef, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Logo from "../../Navigation/Toolbar/Logo/Logo";
import { BsX } from 'react-icons/bs';
import { useHistory } from "react-router";
import classes from './SearchBar.module.css';
import { Transition } from "react-transition-group";
import useDebounce from "../../../hooks/useDebounce";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/clothes';

const SearchBar = props => {
    const [clothesRequest, setClothesRequest] = useState("");
    let history = useHistory();
    const inputRef = useRef();

    useDebounce(() => {
        props.setBasket(inputRef.current?.value);
        if (inputRef.current?.value.length === 0) {
            props.setBasket('no result for this');
        }
    }, 1000, [clothesRequest]);

    console.log(inputRef.current?.value, clothesRequest, props.clothes);
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
                    <form onSubmit={(e) => {
                        getRequestedArticles(e);
                    }}>
                        <input type='text'
                            value={clothesRequest}
                            onChange={(e) => setClothesRequest(e.target.value.toLocaleLowerCase())}
                            ref={inputRef}
                            className={classes.SearchInput} placeholder='What are you looking for?' />
                    </form>
                    {(props.clothes && inputRef.current?.value.length > 0) ?
                        <div className={classes.ResultsSearch}>
                            {props.clothes.map((article, index) => <div key={article.id}>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={`/article/${article.id}`}
                                    onClick={() => {
                                        props.closed();
                                        setClothesRequest('');
                                    }}
                                >
                                    <p className={classes.Result}>
                                        {article.title}
                                    </p></Link>
                                {(index !== props.clothes.length - 1) ? <hr className={classes.Separator} /> : null}
                            </div>
                            )}
                        </div> : null}
                </div>)
            }}
        </Transition>
    </>)
}

const mapStateToProps = state => {
    return {
        clothes: state.clothes.searchResults,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (search) => dispatch(actions.fetchSearchedClothes(search, true)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchBar));