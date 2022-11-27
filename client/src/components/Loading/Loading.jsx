import React, { Component } from 'react'
import loading from './loading.module.css'

export class Loading extends Component {
  render() {
    return (
      <div className={loading.container}>
        <span className={loading.loader}></span>
      </div>
    )
  }
}

export default Loading