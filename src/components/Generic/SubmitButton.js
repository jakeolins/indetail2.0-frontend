import React from 'react';

function SubmitButton(props) {
    return (
        <button className="submit-button" onClick={props.onClick}>{props.label}</button>
    )
}

export default SubmitButton;