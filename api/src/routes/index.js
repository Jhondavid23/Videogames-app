const { Router } = require('express');
const videogame = require('./videogame.js')
const genres = require('./genre')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogame);
router.use('/genres', genres)


module.exports = router;
