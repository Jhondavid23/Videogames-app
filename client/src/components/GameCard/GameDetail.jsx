import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getGameDetail } from '../../actions';
import Loading from '../Loading/Loading';
import detailStyle from './GameCard-Style/gameDetail.module.css'
import detail from './GameCard-Style/gameDetail.module.css'
import backLogo from '../../image/flecha-izquierda.png'
import startIcon from '../../image/estrella.png'


export class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        const id = this.props.match.params.id;

        this.props.getGameDetail(id).then(() => this.setState({ loading: false }))

    }
    render() {
        const gameDetail = this.props.gameDetails;

        if (this.state.loading && gameDetail) {
            return (
                <div className={detailStyle.divLoading}>
                    <Loading />
                </div>

            )
        } else {
            return (
                <div className={detail.container}>
                    <section className={detail.firstSection}>
                        <article className={detail.article1}>
                            <div className={detail.buttonContainer}>
                                <NavLink to={'/games'} className={detail.button}><img src={backLogo} className={detail.flecha} alt={"Logoback"} /></NavLink>
                            </div>
                            <div>
                                <h1 className={detail.title}>{gameDetail.name}</h1>
                            </div>
                        </article>
                        <article className={detail.article2}>
                            <img src={gameDetail.image} alt="game" className={detail.img} />
                        </article>
                    </section>
                    <section className={detail.secondSection}>
                        <article className={detail.article3}>
                            <h5 className={detail.h5}>About {gameDetail.name}</h5>
                            <p>{gameDetail.description}</p>  
                        </article>
                        <article>
                            <div className={detail.containerRating}>
                                <span> <img src={startIcon} alt="star" className={detail.starIcon} />{gameDetail.rating}</span>
                                
                            </div>
                            <div className={detail.subTitle}>
                                <h5>Platforms support</h5>
                            </div>
                            <div className={detail.platformsContainer}>
                                {gameDetail.platforms && gameDetail.platforms.map((e, i) => <p key={i} className={detail.platform}>{e}</p>)}

                            </div>
                            <div className={detail.subTitle}>
                                <h5>Genres</h5>
                            </div>
                            <div className={detail.platformsContainer}>
                                {gameDetail.genre && gameDetail.genre.map((e, i) => <p key={i} className={detail.platform}>{e}</p>)}
                            </div>
                            <div className={detail.subTitle}>
                                 <p> Realease date {gameDetail.release_date}</p>
                            </div>
                        </article>

                    </section>

                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        gameDetails: state.gameDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getGameDetail: (id) => dispatch(getGameDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)