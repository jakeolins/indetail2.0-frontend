import ListExperts from '../ListExperts';
import ViewExpert from '../ViewExpert';
import React, {Component} from 'react';
import Navbar from './Navbar';
import BrokerRegistration from '../BrokerRegistration';

class Navigation extends Component {
  constructor(props) {
      super(props);
      this.state={
        page: 'Experts',
        expertId: '',
      }
      this.handleClickExpert= this.handleClickExpert.bind(this);
      this.handleClickNavbarButton= this.handleClickNavbarButton.bind(this);
  }

  handleClickExpert(expertId) {
    this.setState({
      ...this.state,
      page: 'Expert',
      expertId: expertId,
    })
  }

  handleClickNavbarButton(page) {
      this.setState({
          ...this.state,
          page: page,
      })
  }
  
  renderPage() {
    if(this.state.page==='Experts') {
        return (
          <div className="App">
            <h1> inDetail!</h1>
              <ListExperts
              onClickExpert={this.handleClickExpert}
              />
          </div>
        ); 
    } else if(this.state.page==='Expert') {
        return (
          <div className="App">
          <h1> inDetail!</h1>
            <ViewExpert
            id={this.state.expertId}
            />
        </div>
        )
      
      } else if(this.state.page==='Broker Registration') {
          return (
            <BrokerRegistration/>
          )
        } else {
            return <h2>{this.state.page} is under construction...</h2>
        }
  }
  
  render() {
    return (
        <div>
            <h1>inDetail</h1>
            <Navbar
                onClickNavbarButton={
                    this.handleClickNavbarButton
                }
            
            />
            {
                this.renderPage()
            }
        </div>
    )
  }
}


export default Navigation;
