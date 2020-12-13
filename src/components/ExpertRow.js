import React, {Component} from 'react';

class ExpertRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.expert.firstName}</td>
                <td>{this.props.expert.phoneNumber}</td>
                <td>{this.props.expert.broker.id}</td>
                <td><button onClick = {() => this.props.onClick(this.props.expert.id)}>View</button></td>
            </tr>
        )
    }
}




export default ExpertRow;