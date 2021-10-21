import React from "react";
import { NavLink } from 'react-router-dom';

const navigationItem = props => {
    console.log(props);
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

export default navigationItem;