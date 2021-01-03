import React from 'react';

import NavBar from './NavBar';

function Header(props) {
    return (
        <div className="container shadow">
            <div className="header-title">
                <h1>InDetail</h1>
            </div>
            <NavBar />
        </div>
    )
}

export default Header;