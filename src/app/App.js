import React from 'react';
import LoginForm from '../login-form'
import MyRaceList from '../MyRaceList'
import RegistrationForm from '../RegistrationForm'
import {Route,Link} from 'react-router-dom'
import RaceContext from '../RaceContext'
import MyRaceDetail from '../my-race-detail'
import MyResults from '../MyResults'
import FindRace from '../find-race'
import RaceDetail from '../race-detail'
import EditRace from '../edit-race'
import AddRace from '../add-race'
import About from '../about'
import Results from '../results'
import moment from 'moment'
import './app.css'


class App extends React.Component {
  state = {
    login : true,
    races : [
      {
      "name":"Friday Night Unsanctioned Trail Series I",
      id: 1,
      "createdBy": "keeper of the cones",
      "date": new Date('August 1, 2020'),
      "time": "7:00PM",
      "city": "Decorah",
      "state": "IA",
      "results": [{name: 'Scott', place: 1}, {name: 'Mario', place: 2}]
      },
      {
      "name":"Friday Night Unsanctioned Trail Series II",
      id: 2,
      "createdBy": "keeper of the cones",
      "date": "1992-08-09",
      "time": "19:00",
      "city": "Decorah",
      "state": "IA",
      "results": [{name: 'Mario', place: 1}, {name: 'Scott', place: 2}]
    },
    {
      "name":"Friday Night Unsanctioned Trail Series 53",
      id: 3,
      "createdBy": "keeper of the cones",
      "date": new Date('August 8, 2021'),
      "time": "7:00PM",
      "city": "Decorah",
      "state": "IA",
      "results": [{name: 'Mario', place: 1}, {name: 'Scott', place: 2}]
    }
  ]
  }

  handleLogin = () => {
    this.setState({login:true})
  }
  handleLogOut = () => {
    this.setState({login:false})
  }
  render(){
    const contextValue = {
      races: this.state.races,
      login: this.state.login,
      handleLogin: this.handleLogin,
      handleLogOut: this.handleLogOut,

    }
    return (
      <main className='App'>
        <header id="app-header">
          {!this.state.login 
          && <Link to="/login">Login</Link>
          }
          {!this.state.login 
          && <Link to="/register">Register</Link>
          }
          
          
          {this.state.login 
          && <Link to="/races">Search Races</Link>
          }
          {this.state.login 
          && <Link to="/my-races">My Races</Link>
          }
          {this.state.login 
          && <Link onClick={()=>this.setState({login:false})} to="/">Logout</Link>
          }
          
        </header>
        <RaceContext.Provider value={contextValue}>
          
        <Route exact path='/my-races' component={MyRaceList} />
        <Route path='/my-races/add-race' component={AddRace} />
        
        <Route path='/my-races/:id/view' component={MyRaceDetail} />
        <Route path='/my-races/:id/results' component={MyResults} />
        <Route path='/my-races/:id/edit' component={EditRace} />
        
        
        <Route exact path="/" component={About}/>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegistrationForm} />
        <Route exact path="/races" component={FindRace} />
        <Route exact path="/races/:id" component={RaceDetail} />
        <Route path="/races/:id/results" component={Results} />
        
        </RaceContext.Provider>
        
      </main>
    );
  }
  
}

export default App;