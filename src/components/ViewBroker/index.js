import React, { Component} from 'react';

import { getBroker, deleteBroker } from '../../external/InDetailBackEnd';

import InstanceView from '../Generic/InstanceView';

class ViewBroker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            broker: {
                username: '',
                password: '',
                email: '',
                name: '',
                website: '',
                industry: '',
                twilioNumber: '',
            },
        }

        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    componentDidMount() {
        this.loadBroker();
    }

    async loadBroker() {
        const response = await getBroker(this.props.location.state.id);
        console.dir(response.data);

        this.setState({
            ...this.state,
            broker: response.data,
        });
    }

    onClickEdit() {
        this.props.history.push('/admin/brokers/edit', {id: this.state.broker.id});
    }

    async onClickDelete() {
        const response = await deleteBroker(this.state.broker.id);

        if (response.status === 204) {
            this.props.history.push('admin/brokers');
        }
    }

    render() {
        return (
            <div className="container shadow">
                <InstanceView 
                    header="View Broker"
                    instance={this.state.broker}
                    fields={[
                        {
                            label: 'Username',
                            propertyName: 'username',
                        },
                        {
                            label: 'Email',
                            propertyName: 'email',
                        },
                        {
                            label: 'Company Name',
                            propertyName: 'name',
                        },
                        {
                            label: 'Website',
                            propertyName: 'website',
                        },
                        {
                            label: 'Industry',
                            propertyName: 'industry',
                        },
                        {
                            label: 'Twilio Number',
                            propertyName: 'twilioNumber',
                        }
                    ]}
                    onClickEdit={this.onClickEdit}
                    onClickDelete={this.onClickDelete}
                />
            </div>
        );
    }
}

export default ViewBroker;