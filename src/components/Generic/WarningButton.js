import React from 'react';

function WarningButton(props) {
    return (
        <button className="warning-button" onClick={props.onClick}>{props.label}</button>
    )
}

export default WarningButton;