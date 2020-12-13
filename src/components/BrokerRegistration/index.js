import React, {Component} from 'react';
import {createBroker} from '../../external/InDetailBackEnd';

class BrokerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            twilioNumber: ""
        }
        this.handleChangeInput=this.handleChangeInput.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChangeInput(event) {
        event.preventDefault()
        console.dir(event)
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,

        })

    }
    
    //call the API with what's in the state
    async handleSubmit() {
        const response = await createBroker(this.state)
    }


    render() {
        return (
            <div>
                <div>
                    <label>name:</label>
                    <input type="text" 
                        onChange={this.handleChangeInput} 
                        id="name" 
                        value={this.state.name}>
                    </input>
                </div>
                <div>
                    <label>twilio number:</label>
                    <input type="text" onChange={this.handleChangeInput} id="twilioNumber" value={this.state.twilioNumber}></input>
                </div>  
                <div>
                    <button onClick={this.handleSubmit}>submit</button>    
                </div>          
            </div>
            
        )
    }
}




export default BrokerRegistration;