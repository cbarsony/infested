import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import makeBem from 'bem-cx'

import {LoginPage} from 'cmp/LoginPage'
import {MapPage} from 'cmp/MapPage'
import {TablePage} from 'cmp/TablePage'
import {constants} from 'utils/constants'
import {translate, keys} from 'utils/translate'
import {api} from 'utils/api'

import {Navbar} from './Navbar'

const cn = makeBem('App')

export class App extends Component {
  state = {
    isAuthenticated: false,
    isUser: false,
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    if(token) {
      api.authenticate(token)
        .then(() => this.setState({
          isAuthenticated: true,
          isUser: true,
        }))
        .catch(() => {
          localStorage.removeItem('token')
          this.setState({
            isAuthenticated: true,
            isUser: false,
          })
        })
    }
    else {
      this.setState({
        isAuthenticated: true,
        isUser: false,
      })
    }
  }

  onLogin = () => this.setState({
    isAuthenticated: true,
    isUser: true,
  })

  onLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.setState({
      isAuthenticated: true,
      isUser: false,
    })
  }

  render() {
    const state = this.state

    if(!state.isAuthenticated) return <div>{translate(keys.AUTHENTICATING_PLEASE_WAIT)}</div>

    return (
      <Router>
        <div className={cn}>
          <Route
            path={constants.paths.ROOT}
            render={({location}) => {
              if (location.pathname !== constants.paths.LOGIN_PAGE && !state.isUser) {
                return <Redirect to={constants.paths.LOGIN_PAGE}/>
              }
              else {
                return null
              }
            }}
          />
          <Navbar
            isUser={state.isUser}
            logout={this.onLogout}
          />
          <Switch>
            <Route
              exact
              path={constants.paths.ROOT}
              render={() => <Redirect to={constants.paths.MAP_PAGE}/>}
            />
            <Route
              path={constants.paths.LOGIN_PAGE}
              render={({history}) => state.isUser ?
                <Redirect to={constants.paths.MAP_PAGE}/> :
                <LoginPage
                  history={history}
                  loginSuccess={this.onLogin}
                />
              }
            />
            <Route
              path={constants.paths.MAP_PAGE}
              component={MapPage}
            />
            <Route
              path={constants.paths.TABLE_PAGE + '/:id'}
              component={TablePage}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
