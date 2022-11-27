import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllGames, SearchGame, setCurrentPage, prueba } from '../../actions'
import searchBar from './Navbar_Style/searchbar.module.css'


export class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      game : ""
    }
  }
  handlechange (event){
    this.setState({game : event.target.value});
    this.props.getAllGames();
  }
  onSubmit(event){
    console.log(this.state.game)
    event.preventDefault();
    this.props.SearchGame(this.state.game);
    this.props.setCurrentPage(1)
    this.setState({game: ""})
  }
  render() {
    return (
      <div >
        <form onSubmit={(e)=> this.onSubmit(e)} className={searchBar.container} >
            <div>
                <input 
                type="text"
                value={this.state.game}
                onChange={(e)=>this.handlechange(e)}
                role={'searchbox'} 
                placeholder='Search'
                autoComplete='off'
                className={searchBar.input}
                />
            </div>
            <div>
                <button type='submit' className={searchBar.button}>Search</button>
            </div>
        </form>
      </div>
    )
  }
}
export const mapDispatchToProps = (dispatch)=>{
  return{
    getAllGames : ()=> dispatch(getAllGames()),
    SearchGame : (game)=> dispatch(SearchGame(game)),
    setCurrentPage : (num)=> dispatch(setCurrentPage(num)),
    prueba : (num)=> dispatch(prueba(num))
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)