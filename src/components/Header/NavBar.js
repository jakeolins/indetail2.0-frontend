import React from 'react';

import NavbarItem from './NavbarItem';

function Navbar(props) {
    return (
        <div className="navbar">
            <NavbarItem to="/admin" label="Home"/>
            <NavbarItem to="/admin/brokers" label="Brokers"/>
            <NavbarItem to="/admin/experts" label="Experts"/>
        </div>
    )
}

export default Navbar;