const { Router } = require('express');
// Importar todos los routers;
const genresRoute = require("./genres");
const videogameRoute = require("./videogame.js");
const videogamesRoute = require("./videogames.js");


const router = Router();
router.use('/genres',genresRoute);
router.use('/videogame',videogameRoute);
router.use('/videogames',videogamesRoute);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
