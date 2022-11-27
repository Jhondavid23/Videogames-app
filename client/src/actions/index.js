import axios from 'axios'


export const GET_ALL_GAMES_FROM_API = "GET_ALL_GAMES_FROM_API";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const GET_FAVORITE = "GET_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const CHANGE_PAG = "CHANGE_PAG";
export const SEARCH_GAME = "SEARCH_GAME";
export const SORT_BY_GENRE = "SORT_BY_GENRE";
export const SORT_BY_ADD = "SORT_BY_ADD";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const CREATE_GAME = "CREATE_GAME";
export const RESET_ALL = "RESET_ALL";

export function getAllGamesFromApi(){
    return function(dispatch){
        return axios.get("http://localhost:3001/videogames")
        .then(response => dispatch({type : GET_ALL_GAMES_FROM_API, payload : response.data}))
        .catch(err => { throw new Error (err)})
    }
}

export function getAllGames(){
    return function(dispatch){
        return dispatch({type : GET_ALL_GAMES})
    }
}

export function getGameDetail(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames/${id}`)
        .then(response => dispatch({type : GET_GAME_DETAIL, payload : response.data}))
        .catch(err => { throw new Error (err)})
    }
}

export function getAllGenres(){
    return function(dispatch){
        return axios.get("http://localhost:3001/genres")
        .then(response => dispatch({type: GET_ALL_GENRES, payload : response.data}))
        .catch(err => { throw new Error (err)})
    }
}

export function createGame(game){
    return function(dispatch){
        return axios.post("http://localhost:3001/videogames", game)
        .then(response => dispatch({type:CREATE_GAME, payload: game}))
        .catch(err => { throw new Error (err)})

    }
}

export function setCurrentPage(num){
    return function(dispatch){
        return dispatch({
            type : CHANGE_PAG, payload:num
        })
    }
}

export function SearchGame(game){
    return function(dispatch){
        return dispatch({type : SEARCH_GAME, payload : game })
    }
}   

export function FilterByGenre (genre){
    return function(dispatch){
        return dispatch({type: SORT_BY_GENRE, payload : genre})
    }
}

export function FilterByAdd(str){
    return function(dispatch){
        return dispatch({type: SORT_BY_ADD, payload : str});
    }
}

export function FilterbyName(sort){
    return function (dispatch){
        return dispatch({type: SORT_BY_NAME, payload: sort })
    }
}

export function FilterByrating(rating){
    return function(dispatch){
        return dispatch({type : SORT_BY_RATING, payload : rating})
    }
}

export function ResetVideogame(){
    return function(dispatch){
        return dispatch({type : RESET_ALL, payload : [] })
    }
}

export function prueba (rating){
    return function(dispatch){
        console.log(rating)
        return dispatch({type: "FILTER", payload : rating})
    }
}