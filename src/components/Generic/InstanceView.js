import React from 'react';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

/*
props = {
    header: String,
    instance: Object,
    fields: [
        {
            label: String,
            propertyName: String,
        }
    ],
    onClickEdit: Function,
    onClickDelete: Function,
}
*/
function InstanceView(props) {

    return (
        <div className="instance-view">
            <div className="instance-view-header">
                <div className="instance-view-header-h2">
                    <h2>{props.header ? props.header: ''}</h2>
                </div>
                <div className="instance-view-header-button-group">
                    <ConditionalEditButton
                        onClickEdit={props.onClickEdit}
                    />
                    <ConditionalDeleteButton
                        onClickDelete={props.onClickDelete}
                    />
                </div>
            </div>
            <hr/>
            <ViewFields
                fields={props.fields}
                instance={props.instance}
            />
        </div>
    )
}

function ConditionalEditButton(props) {
    if (props.onClickEdit) {
        return (
            <EditButton onClick={props.onClickEdit}/>
        );
    }
    else return '';
}

function ConditionalDeleteButton(props) {
    if (props.onClickDelete) {
        return (
            <DeleteButton onClick={props.onClickDelete}/>
        );
    }
    else return '';
}

function ViewFields(props) {
    const fields = [];

    for (const field of props.fields) {
        fields.push(
            <ViewField
                field={field}
                instance={props.instance}
                key={`instance-view-field-${props.instance && props.instance._id ? props.instance._id : 0}-${field.propertyName}`}
            />
        )
    }

    return fields;
}

function ViewField(props) {
    const field = props.field;

    if (field.onClick) {
        return (
            <div className="view-field">
                <div className="view-field-label"><label>{field.label}:</label></div>
                <div className="view-field-value">
                    <button className="button-link" onClick={() => field.onClick(field.propertyName)}>
                        {props.instance[field.propertyName]}
                    </button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="view-field">
                <div className="view-field-label"><label>{field.label}:</label></div>
                <div className="view-field-value"><p>{props.instance[field.propertyName]}</p></div>
            </div>
        );
    }
}

export default InstanceView;