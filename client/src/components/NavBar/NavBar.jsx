import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar, { mapDispatchToProps } from './SearchBar';
import navbar from './Navbar_Style/navbar.module.css'
import img from '../../image/joystick.png'

export class NavBar extends Component {
  render() {
    return (

      <nav className={navbar.nav}>
        <div className={navbar.containerTitle}>
          
          <NavLink to={'/games'} onClick={() => this.props.getAllGames()} className={navbar.title}><h2>videogames</h2></NavLink>
          <img src={img} alt="logo" className={navbar.logo}/>

        </div>
        <div className={""}>
          
        </div>
        <div className={navbar.containerSearch}>
          <div className={navbar.containerCreate}>
          <NavLink to='/create' className={navbar.create}><h5>Create a game</h5></NavLink>
          </div>
          
          <SearchBar />
        </div>
      </nav>

    )
  }
}

export default connect(null, mapDispatchToProps)(NavBar)