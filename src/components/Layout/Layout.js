import React, { useCallback, useState } from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.module.css';
import PromoText from '../UI/PromoText/PromoText';
import SearchBar from '../UI/SearchBar/SearchBar';
import Login from '../Login/Login';

const Layout = (props) => {
    const [visibilityMobileMenu, setVisibilityMobileMenu] = useState(false);
    const [visibilitySearch, setVisibilitySearch] = useState(false);

    const closeMobileMenu = () => {
        setVisibilityMobileMenu(false);
    }

    const closeSearchBar = () => {
        setVisibilitySearch(false);
    };

    const toggleMobileMenu = useCallback(() => {
        setVisibilityMobileMenu(!visibilityMobileMenu)
    }, [visibilityMobileMenu]);

    const toggleSearchModal = useCallback(() => {
        setVisibilitySearch(!visibilitySearch);
    }, [visibilitySearch])
    console.log('layout', props);

    return (<>
        <SideDrawer show={visibilityMobileMenu} closed={closeMobileMenu}></SideDrawer>
        <SearchBar show={visibilitySearch} closed={closeSearchBar} />
        <Toolbar open={toggleMobileMenu} search={toggleSearchModal} />
        <Login />
        <PromoText />
    </>)
}

export default Layout;