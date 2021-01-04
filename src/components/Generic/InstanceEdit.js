import React from 'react';

import SubmitButton from './SubmitButton';
import WarningButton from './WarningButton';

/*
props = {
    header: String,
    instance: Object,
    fields: [
        {
            label: String,
            propertyName: String,
            type: html input type,
        }
    ],
    onChange: Function,
    onCancel: Function,
    onSubmit: Function,
}
*/
function InstanceEdit(props) {

    return (
        <div className="instance-edit">
            <div className="instance-edit-header">
                <h2>{props.header ? props.header: ''}</h2>
            </div>
            <p className="danger">{props.errorMessage}</p>
            <hr/>
            <EditFields
                fields={props.fields}
                instance={props.instance}
                errors={props.errors ? props.errors : {}}
                onChange={props.onChange}
            />
            <div className="button-group-wrapper">
                <div className="button-group">
                    <WarningButton label="Cancel" onClick={props.onCancel}/>
                    <SubmitButton label="Submit" onClick={props.onSubmit}/>
                </div>
            </div>
        </div>
    )
}

function EditFields(props) {
    const fields = [];

    for (const field of props.fields) {
        fields.push(
            <EditField
                field={field}
                instance={props.instance}
                error={props.errors && props.errors[field.propertyName] ? props.errors[field.propertyName] : ''}
                onChange={props.onChange}
                key={`instance-edit-field-${props.instance && props.instance._id ? props.instance._id : 0}-${field.propertyName}`}
            />
        )
    }

    return fields;
}

function EditField(props) {
    const field = props.field;

    switch (field.type) {
        case 'prompt-singular': 
            return (
                <SingularInstancePrompt
                    field={field}
                    error={props.error}
                    instance={props.instance}
                    onChange={props.onChange}
                />
            )
        default: 
            return (
                <div className="edit-field">
                    <label>{field.label}:</label>
                    <p className="danger">{props.error}</p>
                    <input 
                        type={field.type} 
                        onChange={e => props.onChange(e, field.propertyName, props.instance && props.instance._id ? props.instance._id : undefined)}
                        value={props.instance[field.propertyName]}
                    ></input>
                </div>
            );
    }

}

function SingularInstancePrompt(props) {
    const field = props.field;

    return (
        <div className="edit-field">
            <label>{field.label}:</label>
            <p className="danger">{props.error}</p>
            <select 
                className="singular-instance-prompt"
                value={props.instance[field.propertyName]}
                onChange={e => props.onChange(e, field.propertyName, props.instance && props.instance._id ? props.instance._id : undefined)}
            >
                <InstancePromptOptions
                    field={props.field}
                    instance={props.instance}
                />
            </select>
        </div>
    )
}

function InstancePromptOptions(props) {
    const options = [];

    options.push(
        <option 
            value=""
            key={`${props.instance.id}-${props.field.propertyName}-option-empty`}    
        >Nothing Selected</option>
    );

    for (const instance of props.field.promptInstances) {
        options.push(
            <option 
                value={instance.id}
                key={`${props.instance.id}-${props.field.propertyName}-option-${instance.id}`}    
            >{instance.displayText}</option>
        );       
    }

    return options;
}

export default InstanceEdit;