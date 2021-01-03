import React from 'react';

function EditButton(props) {
    return (
        <button className="edit-button" onClick={props.onClick}>Edit</button>
    )
}

export default EditButton;