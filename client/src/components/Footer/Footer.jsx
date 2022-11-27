import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../image/joystick.png'
import footer from './footer.module.css'

export class Footer extends Component {
  render() {
    return (
      <div className={footer.container}>
        <div className={footer.containerText}>
          <NavLink to={'/create'} className={footer.navlink}><h3>Create a game</h3></NavLink>
          <p>© 2022 by Juan Diaz</p>
        </div>
        <div className={footer.containerImg}>
          <img src={logo} alt="logo" className={footer.img}/>
        </div>
      </div>
    )
  }
}

export default Footer