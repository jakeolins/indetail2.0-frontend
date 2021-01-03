import React, { Component } from 'react';

import TableView from '../Generic/TableView';

import { getAllBrokers } from '../../external/InDetailBackEnd';

class ListBrokers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brokers: [],
        }

        this.onClickCreate = this.onClickCreate.bind(this);
        this.onClickView = this.onClickView.bind(this);
    }

    componentDidMount() {
        this.loadBrokers();
    }

    async loadBrokers() {
        const response = await getAllBrokers();

        this.setState({
            ...this.state,
            brokers: response.data,
        });
    }

    onClickView(rowNumber) {
        this.props.history.push('/admin/brokers/view', {id: this.state.brokers[rowNumber].id});
    }

    onClickCreate() {
        this.props.history.push('/admin/brokers/create');
    }

    render() {
        return (
            <div className='container shadow'>
                <h1>Brokers List</h1>
                <TableView 
                    title="Brokers"
                    columns={[
                        {
                            label: "Name",
                            propertyName: "username",
                            onClick: this.onClickView,
                        },
                        {
                            label: "Website",
                            propertyName: "website"
                        },
                        {
                            label: "Twilio Number",
                            propertyName: "twilioNumber"
                        },
                        {
                            label: "Welcome Message",
                            propertyName: "welcomeLearnerMessage"
                        },
                    ]}
                    rows={this.state.brokers}
                    createButton={{
                        onClick: this.onClickCreate,
                    }}
                />
            </div>
        )
    }
}

export default ListBrokers;