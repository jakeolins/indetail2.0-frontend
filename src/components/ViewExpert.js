import React, {Component} from 'react';
import {getExpertDetail} from '../external/InDetailBackEnd';

class ViewExpert extends Component {
    constructor(props) {
        super(props);
        this.state={expert: {}}
    }

    async componentDidMount() {
        const response = await getExpertDetail(this.props.id);
        console.dir(response.data)
        this.setState({
            ...this.state, 
            expert: response.data
        });
    }

    render() {
        return (
            <div>
                <h1>About me</h1>
                {this.state.expert.firstName}
            </div>
        )
    }
}




export default ViewExpert;