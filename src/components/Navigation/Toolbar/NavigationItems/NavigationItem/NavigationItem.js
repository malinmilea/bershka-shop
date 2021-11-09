import React from "react";
import { NavLink } from 'react-router-dom';

const navigationItem = props => {
    return (<li>
        <NavLink
            exact
            // activeClassName={classes.active}
            to={props.link ? `/${props.link}` : '/'}>
            {props.children}
        </NavLink>
    </li>
    )
}

export default React.memo(navigationItem, (prevProps, nextProps) => {
    return prevProps.link === nextProps.link;
});