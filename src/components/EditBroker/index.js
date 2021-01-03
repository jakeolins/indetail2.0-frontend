import React, { Component } from 'react';
import { getBroker, editBroker } from '../../external/InDetailBackEnd';

import InstanceEdit from '../Generic/InstanceEdit';

class EditBroker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            broker: {
                username: '',
                email: '',
                name: '',
                website: '',
                industry: '',
                twilioNumber: '',
            },
            errorMessage: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    async componentDidMount() {
        const response = await getBroker(this.props.location.state.id);

        if (response.status === 200) {
            this.setState({
                ...this.state,
                broker: response.data,
            });
        }
    }

    onChange(e, propertyName) {
        this.setState({
            ...this.state,
            broker: {
                ...this.state.broker,
                [propertyName]: e.target.value,
            },
            errors: {
                ...this.state.errors,
                [propertyName]: undefined,
            }
        });
    }

    async onSubmit() {
        const valid = this.validate(); 

        if (valid) {
            const response = await editBroker(this.state.broker);
        
            if (response.status === 204) {
                this.props.history.push('/admin/brokers');
            }

            else {
                this.setState({
                    ...this.state,
                    errorMessage: response.data.error,
                });
            }
        }
    }

    validate() {
        let valid = true;
        const errors = {};

        if (!this.state.broker.username) {
            errors.username = 'Username is required.';
            valid = false;
        }

        if (!this.state.broker.email) {
            errors.email = 'Email is required.';
            valid = false;
        }
        else {
            if (this.state.broker.email.includes('@') === false) {
                errors.email = 'Please enter a valid email.';
                valid = false;
            }
        }

        if (!this.state.broker.name) {
            errors.name = 'Name is required.';
            valid = false;
        }

        if (!this.state.broker.website) {
            errors.website = 'Website is required.';
            valid = false;
        }

        if (!this.state.broker.industry) {
            errors.industry = 'Industry is required.';
            valid = false;
        }

        if (!this.state.broker.twilioNumber) {
            errors.twilioNumber = 'Twilio Number is required.';
            valid = false;
        }
        else {
            if (this.state.broker.twilioNumber.length !== 12) {
                errors.twilioNumber = 'Twilio Number must be a valid phone number with "+", country code, and area code.';
                valid = false;
            }
            if (this.state.broker.twilioNumber.slice(0, 1) !== '+') {
                errors.twilioNumber = 'Twilio Number must begin with +.';
                valid = false;
            }
        }

        if (valid === false) {
            this.setState({
                ...this.state,
                errors,
                errorMessage: 'Please fix the issues below.'
            });
        }

        return valid;
    }

    onCancel() {
        this.props.history.push('/admin/brokers');
    }

    render() {
        return (
            <div className='container shadow'>
                <InstanceEdit 
                    header="Edit Broker"
                    instance={this.state.broker}
                    errorMessage={this.state.errorMessage}
                    errors={this.state.errors}
                    fields={[
                        {
                            label: 'Username',
                            propertyName: 'username',
                            type: 'text',
                        },
                        {
                            label: 'Email',
                            propertyName: 'email',
                            type: 'text',
                        },
                        {
                            label: 'Company Name',
                            propertyName: 'name',
                            type: 'text',
                        },
                        {
                            label: 'Website',
                            propertyName: 'website',
                            type: 'text',
                        },
                        {
                            label: 'Industry',
                            propertyName: 'industry',
                            type: 'text',
                        },
                        {
                            label: 'Twilio Number',
                            propertyName: 'twilioNumber',
                            type: 'text',
                        }
                    ]}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        )
    }
}

export default EditBroker;