const axios = require('axios')
const { Router } = require('express');
const { Op } = require('sequelize');

const route = Router();
const { Videogame, Genre } = require('../db')
const {API_KEY} = process.env;

//Get data by api and db
//Replace the objects of maps for a function template
route.get('/', async (req, res) => {
    try {
        
        const { name } = req.query;
        // If name exist, we find the data from the api and db
        if (name) {
            const videogames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
           
            const gamesByDb = videogames.map((e) => {
                return {
                    id : e.id,
                    name: e.name,
                    release_date: e.released,
                    rating: e.rating,
                    image: e.background_image,
                    platforms: e.platforms,
                    genres: e.genres.map((genre) => genre.name)

                }
            })
            const axiosApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            
            const gamesByApi = axiosApi.data.results.map((e) => {
                return {
                    id : e.id,
                    name: e.name,
                    release_date: e.released,
                    rating: e.rating,
                    image: e.background_image,
                    platforms: e.platforms.map(p=> p.platform.name),
                    genres: e.genres.map((genre) => genre.name)
                }
            })
            const allGames = await gamesByDb.concat(gamesByApi)
            if (allGames.length === 0) {
                throw new Error("The game does not exist")
            }
            res.status(200).send(allGames.slice(0, 15))
        } else {
            //If name doesn't exist, find all the data from api and db
            const videogames = await Videogame.findAll({
                include : Genre
            });
            
            let gamesByDb
            if (videogames.length > 0) {
                
                gamesByDb = videogames.map((e) => {
                    return {
                        id : e.id,
                        name: e.name,
                        release_date: e.release_date,
                        rating: e.rating,
                        image: e.image,
                        platforms: e.platforms,
                        genres: e.genres.map((genre) => genre.name)
                    }
                })
            }
            //We collect the required number of games from the api
            let url = `https://api.rawg.io/api/games?key=${API_KEY}`
            let gamesByApi = [];
            for (let i = 0; i < 5; i++) {
                const axiosApi = await axios.get(url)
                axiosApi.data.results.map((e) => {
                    gamesByApi.push({
                        id : e.id,
                        name: e.name,
                        release_date: e.released,
                        rating: e.rating,
                        image: e.background_image,
                        platforms: e.platforms.map(p=> p.platform.name),
                        genres: e.genres.map((genre) => genre.name)
                    })
                });
                console.log(axios)
                url = axiosApi.data.next

            }
            
            let allGames;
            gamesByDb ?  allGames = gamesByApi.concat(gamesByDb): allGames = gamesByApi;
            res.status(200).send(allGames);
            

        }


    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Find game in db and api with id
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(typeof id)

        if (id.length > 6) {
            const gameInDb = await Videogame.findAll({
                where: {
                    id : id
                },
                include :  Genre
                    
            });
            if(!gameInDb) throw new Error("Oh! we can't find the game")
            gameToReturn = gameInDb.map((e)=>{
                return  {
                    image: e.image,
                    name: e.name,
                    genre: e.genres.map((genre) => genre.name),
                    description: e.description,
                    releaseDate: e.releaseDate,
                    rating: e.rating,
                    platforms: e.platforms,
                  }
            });
              
            return res.status(200).send(gameToReturn[0])
        }else{
            const gameInApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            if(!gameInApi) throw new Error("Oh! we can't find the game")
            const gameById = {
                id : gameInApi.data.id,
                name : gameInApi.data.name,
                description : gameInApi.data.description_raw,
                release_date : gameInApi.data.released,
                rating : gameInApi.data.rating,
                platforms : gameInApi.data.platforms.map((p)=> p.platform.name),
                image : gameInApi.data.background_image,
                genre : gameInApi.data.genres.map((genre) => genre.name)
            }
            return res.status(200).send(gameById);
        }
        

    } catch (error) {
        res.status(400).send(error.message)
    }
})


//Create a new game into database, and make the associations with their genres
route.post('/', async (req, res) => {
    const { name, description, genres, platforms } = req.body;
    try {
        if (!name || !description || !platforms || !genres) {
            res.status(400).send("Missing fields");
        }

        const videogameCreated = await Videogame.create(req.body);

        genres.forEach(async (e) => {
            const findGenre = await Genre.findOne({
                where: {
                    name: e
                }
            })
            await videogameCreated.addGenres(findGenre);

        })


        res.status(200).send(videogameCreated);


    } catch (error) {
        res.status(400).send(error.message)
    }

})

module.exports = route