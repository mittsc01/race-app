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
import './app.css'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import IdleService from '../services/idle-service'
import PrivateRoute from '../utils/PrivateRoute'
import PublicOnlyRoute from '../utils/PublicOnlyRoute'



class App extends React.Component {
  state = {
    login: false
  }
  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }
  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  handleLogin = () => {
    this.forceUpdate()
  }
  handleLogout = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  
    
  }
  handleRegister = () => {
    this.props.history.push('/login')
  }
  render(){
    const contextValue = {
      races: this.state.races,
      login: this.state.login,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,

    }
    return (
      <main className='App'>
        <header id="app-header">
        <Link to="/">About</Link>
        <Link to="/races">Search Races</Link>
          {!TokenService.hasAuthToken()
          && <Link to="/login">Login</Link>
          }
          {!TokenService.hasAuthToken()
          && <Link to="/register">Register</Link>
          }
          
          {TokenService.hasAuthToken()
          && <Link to="/my-races">My Races</Link>
          }
          {TokenService.hasAuthToken()
          && <Link onClick={this.handleLogout} to="/">Logout</Link>
          }
          
        </header>
        <RaceContext.Provider value={contextValue}>
        <PrivateRoute exact path='/my-races' component={MyRaceList} />
        
        <PrivateRoute path='/my-races/add-race' component={AddRace} />
        
        <PrivateRoute path='/my-races/:id/view' component={MyRaceDetail}/>
        <PrivateRoute path='/my-races/:id/results' component={MyResults} />
        <PrivateRoute path='/my-races/:id/edit' component={EditRace} />
        
        
        <Route exact path="/" component={About}/>
        <PublicOnlyRoute path="/login" component={LoginForm} />
        <PublicOnlyRoute path="/register" component={RegistrationForm} />
        <Route exact path="/races" component={FindRace} />
        <Route exact path="/races/:id" component={RaceDetail} />
        <Route path="/races/:id/results" component={Results} />
        
        </RaceContext.Provider>
        
      </main>
    );
  }
  
}

export default App;