import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import home from '../Home/home.module.css';

export class Home extends Component {

  render() {
    return (
      <div className={home.container}>
       
        <div className={home.information}>
          <section>
            <h1 className={home.h1}>Videogames SPA</h1>
          </section>
          <section className={home.section}>
          <NavLink to={'/games'} ><button className={home.button}>START</button></NavLink>
          </section>
          <section className={home.section2}>
            <article>
              <p>Single page applicatio created using react, redux, nodejs, sequelize and postgresSQL technologies</p>
            </article>
          </section>
        </div>
        <div className={home.image}>
          
        </div>
      </div>
    )
  }
}

export default Home