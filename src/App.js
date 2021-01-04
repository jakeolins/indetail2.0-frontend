import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';

import ListBrokers from './components/ListBrokers';
import CreateBroker from './components/CreateBroker';
import EditBroker from './components/EditBroker';
import ViewBroker from './components/ViewBroker';

import ListExperts from './components/ListExperts';
import ViewExpert from './components/ViewExpert';
import EditExpert from './components/EditExpert';
import CreateExpert from './components/CreateExpert';

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

                        <Route path="/admin/experts/view" component={ViewExpert}/>
                        <Route path="/admin/experts/edit" component={EditExpert}/>
                        <Route path="/admin/experts/create" component={CreateExpert}/>
                        <Route path="/admin/experts" component={ListExperts}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App;
