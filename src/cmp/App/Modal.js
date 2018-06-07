import {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modalRoot')

export class Modal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
    this.el.classList.add('Modal')
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    const props = this.props

    return ReactDOM.createPortal(
      props.children,
      this.el,
    )
  }
}

Modal.propTypes = {close: PropTypes.func.isRequired}
