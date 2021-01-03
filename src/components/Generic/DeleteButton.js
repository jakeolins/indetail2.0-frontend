import React from 'react';

function DeleteButton(props) {
    return (
        <button className="danger-button" onClick={props.onClick}>Delete</button>
    );
}

export default DeleteButton;