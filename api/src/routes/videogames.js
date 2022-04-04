const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
const {
    API_KEY
  } = process.env;
const router = Router();

router.get("/",(req,res,next)=>{
    
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8&page_size=15`)//seteo que venga 15 juegos por pagina
        .then(result=>{ // la propiedad next tiene los proximos 15 juegos a este se tiene que hacer otro get;
                        //creo que cuando querramos mostrar los 15 juego se debe hacer otra peticion con la proximau url
            res.send(result.data.results.map((game)=>{
                return game.name

            }));
            
    })
    .catch(err=>{
        res.send(err)
    })

})

router.post("/",(req,res,next)=>{
    res.send("soy el post de videogames");
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de videogames");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de videogames");
})

module.exports = router;