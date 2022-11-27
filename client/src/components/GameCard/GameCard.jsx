import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import xbox from '../../image/xbox.png'
import nintendo from '../../image/nintendo.png'
import pc from '../../image/Windows_logo_2012-Black.svg.png';
import play from '../../image/300px-PlayStation_logo.svg.png';
import gameCard from './GameCard-Style/GameCard.module.css'

export class GameCard extends Component {

  render() {
    //Iterating platforms, convert to icons
    const game = this.props.game;
    const setIcons = new Set()
    game.platforms && game.platforms.map(p => {
      if (p.includes('Xbox')) return setIcons.add(xbox)
      if (p.includes('PC')) return setIcons.add(pc)
      if (p.includes('Play')) return setIcons.add(play)
      if (p.includes('Nintendo')) return setIcons.add(nintendo)
      return null;
    })
    const arrayIcons = [...setIcons]

    return (
      <div className={gameCard.card} >
        <figure className={gameCard.containerImg}>
          <NavLink to={`/games/${game.id}`} ><img src={game.image} alt="background" className={gameCard.img} /></NavLink>

        </figure>
        <article className='text'>
          <section className={gameCard.section}>
            <div>
              {arrayIcons[0] && arrayIcons.map((e, i) => <img src={e} alt={`icons${i}`} key={i} className={gameCard.icon} />)}
            </div>

            <NavLink to={`/games/${game.id}`} className={gameCard.title}><h3>{game.name}</h3></NavLink>
          </section>
          <section className='button-text'>
            <h6>Rating: {game.rating}</h6>
            <div className={gameCard.containerGenres}>
              {game && game.genres.map((e, i) => <p key={i} className={gameCard.genres}>{e}</p>)}
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default GameCard