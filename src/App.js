import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import ListBrokers from './components/ListBrokers';
import CreateBroker from './components/CreateBroker';
import EditBroker from './components/EditBroker';
import ViewBroker from './components/ViewBroker';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <Router>
                    <Header/>
                    <Switch>
                        <Route path="/admin/brokers/create" component={CreateBroker}/>
                        <Route path="/admin/brokers/edit" component={EditBroker}/>
                        <Route path="/admin/brokers/view" component={ViewBroker}/>
                        <Route path="/admin/brokers" component={ListBrokers}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App;
