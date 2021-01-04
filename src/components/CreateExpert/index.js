import React, { Component } from 'react';
import { createExpert, getAllBrokers } from '../../external/InDetailBackEnd';

import InstanceEdit from '../Generic/InstanceEdit';

class CreateExpert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expert: {
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                broker: '',
                phoneNumber: '',
                venmo: '',
            },
            brokers: [],
            errorMessage: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.loadBrokers();
    }

    async loadBrokers() {
        const response = await getAllBrokers();

        if (response.status === 200) {
            this.setState({
                ...this.state,
                brokers: response.data,
            });
        }
    }

    onChange(e, propertyName) {
        this.setState({
            ...this.state,
            expert: {
                ...this.state.expert,
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
            const response = await createExpert(this.state.expert);
        
            if (response.status === 200) {
                this.props.history.push('/admin/experts');
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
        const expert = this.state.expert;

        if (!expert.username) {
            valid = false;
            errors.username = 'Username is required.';
        }

        if (!expert.email) {
            valid = false;
            errors.email = 'Email is required.';
        }
        else {
            if (expert.email.includes('@') === false) {
                valid = false;
                errors.email = 'Please provide a valid email.';
            }
        }

        if (!expert.firstName) {
            valid = false;
            errors.firstName = 'First Name is required.';
        }

        if (!expert.lastName) {
            valid = false;
            errors.lastName = 'Last Name is required.';
        }

        if (!expert.phoneNumber) {
            valid = false;
            errors.phoneNumber = 'Phone Number is required.';
        }
        else {
            if (expert.phoneNumber[0] !== '+') {
                valid = false;
                errors.phoneNumber = 'Phone number must start with a + sign.';
            }
            if (expert.phoneNumber.length !== 12) {
                valid = false;
                errors.phoneNumber = 'Phone number should include "+", country code, and area code.';
            }
        }

        if (!expert.venmo) {
            valid = false;
            errors.venmo = 'Venmo is required.';
        }
        else {
            if (expert.venmo.includes('@') === false) {
                valid = false;
                errors.venmo = 'Venmo handle must start with "@".';
            }
        }

        if (!expert.broker) {
            valid = false;
            errors.broker = 'Broker is required.';
        }

        if (!valid) {
            this.setState({
                ...this.state,
                errors,
            });
        }

        return valid;
    }

    onCancel() {
        this.props.history.push('/admin/experts');
    }

    render() {
        return (
            <div className='container shadow'>
                <InstanceEdit 
                    header="Create Expert"
                    instance={this.state.expert}
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
                            label: 'Password',
                            propertyName: 'password',
                            type: 'text',
                        },
                        {
                            label: 'First Name',
                            propertyName: 'firstName',
                            type: 'text',
                        },
                        {
                            label: 'Last Name',
                            propertyName: 'lastName',
                            type: 'text',
                        },
                        {
                            label: 'Phone Number',
                            propertyName: 'phoneNumber',
                            type: 'text',
                        },
                        {
                            label: 'Venmo',
                            propertyName: 'venmo',
                            type: 'text',
                        },
                        {
                            label: 'Broker',
                            propertyName: 'broker',
                            type: 'prompt-singular',
                            promptInstances: this.state.brokers,
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

export default CreateExpert;