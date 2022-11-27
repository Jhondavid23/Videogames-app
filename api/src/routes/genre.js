const { Router } = require('express');
const axios = require('axios')
const route = Router();
const { Genre } = require('../db')
const {API_KEY} = process.env;
//Revisar si ya está en la base de datos
//Si no está crear cada uno de los generos
route.get('/', async (req, res) => {
    try {
        const findGenres = await Genre.findAll();
        if (findGenres.length > 0) {
             res.status(200).send(findGenres)
        }else{
            const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        
        const filterList = apiGenres.data.results.map((genre)=>{
            return {
                id : genre.id,
                name : genre.name,
            }
        });
   
        filterList.forEach(async element => { Genre.create(element);    
        });
        res.status(200).send(filterList);
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = route