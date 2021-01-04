import React, { Component} from 'react';

import { getExpert, deleteExpert } from '../../external/InDetailBackEnd';

import InstanceView from '../Generic/InstanceView';

class ViewExpert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expert: {
                username: '',
                name: '',
                email: '',
                broker: {},
                phoneNumber: '',
                venmo: '',
                sessions: [],
            },
        }

        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickBroker = this.onClickBroker.bind(this);
    }

    componentDidMount() {
        this.loadExpert();
    }

    async loadExpert() {
        const response = await getExpert(this.props.location.state.id);
        
        const expert = response.data;
        this.formatExpert(expert);

        this.setState({
            ...this.state,
            expert,
        });
    }

    formatExpert(expert) {
        expert.brokerName = expert.broker ? expert.broker.name : '';
        expert.numberOfSessions = expert.sessions.length;
    }

    onClickEdit() {
        this.props.history.push('/admin/experts/edit', {id: this.state.expert.id});
    }

    async onClickDelete() {
        const response = await deleteExpert(this.state.expert.id);

        if (response.status === 204) {
            this.props.history.push('admin/experts');
        }
    }

    onClickBroker() {
        this.props.history.push('/admin/brokers/view', {id: this.state.expert.broker.id});
    }

    render() {
        return (
            <div className="container shadow">
                <InstanceView 
                    header="View Expert"
                    instance={this.state.expert}
                    fields={[
                        {
                            label: 'Username',
                            propertyName: 'username',
                        },
                        {
                            label: 'Name',
                            propertyName: 'name',
                        },
                        {
                            label: 'Email',
                            propertyName: 'email',
                        },
                        {
                            label: 'Broker',
                            propertyName: 'brokerName',
                            onClick: this.onClickBroker,
                        },
                        {
                            label: 'Phone Number',
                            propertyName: 'phoneNumber',
                        },
                        {
                            label: 'Venmo',
                            propertyName: 'venmo',
                        },
                        {
                            label: 'Sessions',
                            propertyName: 'numberOfSessions',
                        }
                    ]}
                    onClickEdit={this.onClickEdit}
                    onClickDelete={this.onClickDelete}
                />
            </div>
        );
    }
}

export default ViewExpert;