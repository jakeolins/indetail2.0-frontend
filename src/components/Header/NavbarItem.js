import React from 'react';
import { Link } from 'react-router-dom';

function NavbarItem(props) {
    return (
        <div className="navbar-item">
            <Link to={props.to}>{props.label}</Link>
        </div>
    )
}

export default NavbarItem;