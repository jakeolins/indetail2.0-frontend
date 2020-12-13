import React, {Component} from 'react';
import {getAllExperts} from '../external/InDetailBackEnd';
import ExpertRow from './ExpertRow';

class ListExperts extends Component {
    constructor(props) {
        super(props);
        this.state={
            experts : []
        }
    }

    async componentDidMount() {
        const response = await getAllExperts();
        console.dir(response.data)
        this.setState({
            ...this.state, 
            experts: response.data
        });
    }

    expertRows() {
        const rows = []
        for(const expert of this.state.experts) {
            rows.push(
                <ExpertRow
                    expert={expert}
                    onClick={this.props.onClickExpert}
                />
            )
        }
        console.dir(rows)
        return rows;
    }

    render() {
        return (
            <div>
                <h2>List Experts</h2>
                    <table>
                        <tr>
                            <td>Name</td>
                            <td>Phone Number</td>
                            <td>Broker</td>
                        </tr>
                        {this.expertRows()}
                    </table>
            </div>
        )
    }
}




export default ListExperts;