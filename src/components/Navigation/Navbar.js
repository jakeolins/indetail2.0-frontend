import React, {
    Component
} from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <button onClick = {() => this.props.onClickNavbarButton("Expert Registration")}>Expert Registration</button>
                <button onClick = {() => this.props.onClickNavbarButton("Broker Registration")}>Broker Registration</button>
                <button onClick = {() => this.props.onClickNavbarButton("Experts")}>View Experts</button>
                <button onClick = {() => this.props.onClickNavbarButton("View Brokers")}>View Brokers</button>
            </div>
        )
    }
}

export default Navbar;