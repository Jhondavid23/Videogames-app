
import {GET_ALL_GAMES_FROM_API, 
    GET_ALL_GAMES, GET_GAME_DETAIL, 
    CHANGE_PAG, SEARCH_GAME,
    SORT_BY_GENRE, SORT_BY_ADD, 
    SORT_BY_NAME, SORT_BY_RATING,
    GET_ALL_GENRES, CREATE_GAME,
    RESET_ALL} from '../actions'


const initialState = {
    games : [],
    allgames : [],
    genres : [],
    favorites : [],
    gameDetails : {},
    currentPage : 1
};

export default function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_ALL_GAMES_FROM_API:
            return {
                ...state,
                games : action.payload,
                allgames : action.payload
            }
        case GET_ALL_GAMES:
            return {
                ...state,
                games : state.allgames
            }
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetails : action.payload
            }
        case GET_ALL_GENRES:
            return{ 
                ...state,
                genres: action.payload
            }
        case CHANGE_PAG:
            return{
                ...state,
                currentPage : action.payload
            }
        case SEARCH_GAME:
            return{
                ...state,
                games : state.games.filter(game=> game.name.toLowerCase().includes(action.payload))
            }
        case SORT_BY_GENRE:
            return{
                ...state,
                games : state.games.filter(game => game.genres.includes(action.payload))
            }
        case SORT_BY_ADD:
            let filter = action.payload === "Created" ? state.games.filter((game) => game.id.toString().length > 15) : state.games.filter((game) => game.id.toString().length < 15);
            return{
                ...state,
                games : filter
            }
        case SORT_BY_NAME:
            let filterByName = action.payload === "AZ" ? state.games.sort((a,b)=>{
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                else return 0
            }) : state.games.sort((a,b)=>{
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                else return 0})
                
            return {
                ...state,
                games : filterByName
            }
        case SORT_BY_RATING:
            let filterByRating = action.payload === "Min-max" ? state.games.sort((a,b)=>{
                if(a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;
                 return 0
            }) : state.games.sort((a,b)=>{
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                 return 0})
                
            return{
                ...state,
                games : filterByRating
            }
        case CREATE_GAME:
            return {
                ...state,
                games : []
            }
        case RESET_ALL:
            return {
                ...state,
                games : [],
                allgames : []
            }
        case "FILTER":
            return{
                ...state,
                games : state.games.filter((games)=> games.rating >= action.payload)
            }
        default:
            return state
    }
}