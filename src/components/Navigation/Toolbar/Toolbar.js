import React from "react";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import NavigationItems from "./NavigationItems/NavigationItems";
import classes from './Toolbar.module.css'


const toolbar = (props) => {
    return (<header >
        <nav className={classes.Navbar}>
            <MobileNavigation opened={props.open} search={props.search} />
            <NavigationItems search={props.search}></NavigationItems>
        </nav>
    </header>
    )
}

export default React.memo(toolbar, () => true);