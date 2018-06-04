import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Form} from 'cmp/App/Form'
import {translate, keys} from 'utils/translate'
import {api} from 'api'
import {constants} from 'utils/constants'

export class LoginPage extends Component {
  state = {
    errorMessage: '',
    isLoginLoading: false,
  }

  onLogin = fields => {
    this.setState({
      errorMessage: '',
      isLoginLoading: true,
    })

    api.login(fields.username.value, fields.password.value)
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
      <div className="LoginPage">
        <Form
          fields={[
            {
              name: 'username',
              type: 'text',
              value: 'Test user',
              label: translate(keys.USER_NAME),
              rules: ['required'],
              onChange: x => console.log(x.target.value),
            },
            {
              name: 'password',
              type: 'password',
              value: 'pass',
              label: translate(keys.PASSWORD),
              rules: ['required'],
              onChange: x => console.log(x.target.value),
            }
          ]}
          submitText={translate(keys.LOGIN)}
          onSubmit={this.onLogin}
        />
      </div>
    )
  }
}

LoginPage.propTypes = {
  push: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
}
