import React, { Component } from 'react';

import TableView from '../Generic/TableView';

import { getAllExperts } from '../../external/InDetailBackEnd';

class ListExperts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experts: [],
        }

        this.onClickCreate = this.onClickCreate.bind(this);
        this.onClickView = this.onClickView.bind(this);
        this.onClickViewBroker = this.onClickViewBroker.bind(this);
    }

    componentDidMount() {
        this.loadExperts();
    }

    async loadExperts() {
        const response = await getAllExperts();

        const experts = response.data;

        this.formatExperts(experts);

        this.setState({
            ...this.state,
            experts: experts,
        });
    }

    formatExperts(experts) {
        for (const expert of experts) {
            expert.brokerName = expert.broker ? expert.broker.name : '';
            expert.numberOfSessions = expert.sessions.length;
        }
    }

    onClickView(rowNumber) {
        this.props.history.push('/admin/experts/view', {id: this.state.experts[rowNumber].id});
    }

    onClickViewBroker(rowNumber) {
        this.props.history.push(`/admin/brokers/view`, {id: this.state.experts[rowNumber].broker.id});
    }

    onClickCreate() {
        this.props.history.push('/admin/experts/create');
    }

    render() {
        return (
            <div className='container shadow'>
                <h1>Experts List</h1>
                <TableView 
                    title="Experts"
                    columns={[
                        {
                            label: "Username",
                            propertyName: "username",
                            onClick: this.onClickView,
                        },
                        {
                            label: "Name",
                            propertyName: "name",
                        },
                        {
                            label: "Email",
                            propertyName: "email",
                        },
                        {
                            label: "Broker",
                            propertyName: "brokerName",
                            onClick: this.onClickViewBroker,
                        },
                        {
                            label: "Phone Number",
                            propertyName: "phoneNumber",
                        },
                        {
                            label: "Venmo",
                            propertyName: "venmo",
                        },
                        {
                            label: "Sessions",
                            propertyName: "numberOfSessions",
                        },
                    ]}
                    rows={this.state.experts}
                    createButton={{
                        onClick: this.onClickCreate,
                    }}
                />
            </div>
        )
    }
}

export default ListExperts;