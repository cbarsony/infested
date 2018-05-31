import React, {Component} from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'

import {Field, Warning} from 'cmp/Form'
import {translate, keys} from 'utils/translate'
import {api} from 'utils/api'
import {constants} from 'utils/constants'

const cn = makeBem('LoginPage')

const usernameInputId = cn.el('username').toString()
const passwordInputId = cn.el('password').toString()

export class LoginPage extends Component {
  state = {
    errorMessage: '',
    isLoginLoading: false,
  }

  onLogin = e => {
    e.preventDefault()

    this.setState({
      errorMessage: '',
      isLoginLoading: true,
    })

    api.login(e.target[usernameInputId].value, e.target[passwordInputId].value)
      .then(userData => {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('username', userData.username)
        this.props.loginSuccess()
        this.props.push(constants.paths.MAP_PAGE)
      })
      .catch(errorMessage => this.setState({
        isLoginLoading: false,
        errorMessage,
      }))
  }

  render() {
    const state = this.state

    if(state.isLoginLoading) return <div>{translate(keys.LOADING)}</div>

    return (
      <form
        className={cn}
        onSubmit={this.onLogin}
      >
        <Field
          label={translate(keys.USER_NAME)}
          htmlFor={usernameInputId}
        >
          <input
            id={usernameInputId}
            type="text"
            defaultValue="Test user"
          />
        </Field>
        <Field
          label={translate(keys.PASSWORD)}
          htmlFor={passwordInputId}
        >
          <input
            id={passwordInputId}
            type="password"
            defaultValue="pass"
          />
        </Field>
        <Warning message={state.errorMessage}/>
        <button>{translate(keys.LOGIN)}</button>
      </form>
    )
  }
}

LoginPage.propTypes = {
  push: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
}
