import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from '../GameCard/GameCard';
import Filter from '../Filters/Filter';
import { getAllGamesFromApi, setCurrentPage, getAllGames, FilterByGenre, FilterByAdd, FilterbyName, FilterByrating} from '../../actions';
import Pagination from '../Pagination/Pagination';
import containerStyle from './GameCard-Style/containerStyle.module.css'
import Loading from '../Loading/Loading';
import noresults from '../../image/no-results (1).png'

export class ContainerCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            gamePerPage: 15,
            filter: ""
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        if (this.props.games[0]) {
            this.props.getAllGames()
            setTimeout(() => this.setState({ loading: false }), 1000)
        } else {
            this.props.getAllGamesFromApi().then(() => this.setState({ loading: false }))
        }

    }

    //Fiter
    handleSubmitByGenre(e) {
        e.preventDefault();
        if (e.target.value === "All" || e.target.value === "name") {
            this.props.getAllGames();
        } else {
            this.props.getAllGames();
            this.props.FilterByGenre(e.target.value);
            this.props.setCurrentPage(1);
        };
    };

    handleSubmitByAdd(e) {
        e.preventDefault();
        if (e.target.value === "Existing" || e.target.value === "All" ) {
            this.props.getAllGames();
        } else {
            // this.props.getAllGames()
            this.props.FilterByAdd(e.target.value);


        };
    };

    handleSubmitByName(e) {
        e.preventDefault();
        if(e.target.value === "name") this.props.getAllGames()
        this.props.FilterbyName(e.target.value);
        this.setState({ filter: e.target.value });
        this.props.setCurrentPage(1);

    }

    hanldleSubmitByRating(e){
        e.preventDefault();
        if(e.target.value === "name") this.props.getAllGames()
        this.props.FilterByrating(e.target.value);
        this.setState({ filter: e.target.value });
        this.props.setCurrentPage(1);
    }


    render() {
        //Options of genres
        let genresOptions = [];
        this.props.allgames.forEach(game => {
            game.genres.forEach((e) => {
                if (!genresOptions.includes(e)) {
                    genresOptions.push(e)
                }
                return null
            })
        });

        //Pagination 
        const indexOfLastPost = this.props.currentPage * this.state.gamePerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.gamePerPage;
        const currentPost = this.props.games.slice(indexOfFirstPost, indexOfLastPost);

        //Numbers of pages to show
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.games.length / this.state.gamePerPage); i++) {
            pageNumbers.push(i)

        }

        if (this.state.loading) {
            return (
                <Loading/>
            )
        } else if(!this.props.games[0]){
            return(
                <div className={containerStyle.nogames}>
                   
                        <Filter
                        handleSubmitByGenre={(e) => this.handleSubmitByGenre(e)}
                        handleSubmitByAdd={(e) => this.handleSubmitByAdd(e)}
                        handleSubmitByName={(e) => { this.handleSubmitByName(e) }}
                        genresOptions={genresOptions} 
                        hanldleSubmitByRating={(e)=>this.hanldleSubmitByRating(e)}
                        />
                    
                    <img src={noresults} alt="noresults" className={containerStyle.imgNoresult} />
                    <h3>No games to show</h3>
                </div>
            )
        }else {
            return (

                <div className={''}>
                    <div>
                        <Filter
                            handleSubmitByGenre={(e) => this.handleSubmitByGenre(e)}
                            handleSubmitByAdd={(e) => this.handleSubmitByAdd(e)}
                            handleSubmitByName={(e) => { this.handleSubmitByName(e) }}
                            genresOptions={genresOptions} 
                            hanldleSubmitByRating={(e)=>this.hanldleSubmitByRating(e)} />
                    </div>
                    <div className={containerStyle.container}>
                        {currentPost && currentPost.map(game => <div key={game.id}><GameCard game={game} /></div>)}
                    </div>
                    <div className={containerStyle.pagination}>
                        <Pagination paginate={this.props.setCurrentPage} pagenumbers={pageNumbers} />
                    </div>
                </div>
            )
        }


    }
}

export const mapStateToProps = (state) => {
    return {
        games: state.games,
        allgames: state.allgames,
        currentPage: state.currentPage,

    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllGamesFromApi: () => dispatch(getAllGamesFromApi()),
        setCurrentPage: (id) => dispatch(setCurrentPage(id)),
        getAllGames: () => dispatch(getAllGames()),
        FilterByGenre: (genre) => dispatch(FilterByGenre(genre)),
        FilterByAdd: (str) => dispatch(FilterByAdd(str)),
        FilterbyName: (val) => dispatch(FilterbyName(val)),
        FilterByrating : (rating) => dispatch(FilterByrating(rating))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerCard);

