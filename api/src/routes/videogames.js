const { Router } = require('express');
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame } = require("../db")
const router = Router();

router.get("/",async(req,res,next)=>{
    if(Object.keys(req.query).length){//si es dintinto de 0 entr sino no
        res.send("hay querys") // esto se tiene que conectar con el front la parte del searchbar
    }
    else{
        const videogamesAPI=axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8&page_size=2`);
        const videogamesDB = await Videogame.findAll();
        Promise.all([videogamesAPI,videogamesDB])
        .then((response)=>{
            const [vAPI ,vDB] = response;
            let vAPI_filt =vAPI.data.results.map((game)=> {
                return {
                    id:game.id,
                    name:game.name
                }
                
            } );
            let vDB_filt =vDB.map((game)=> {
                return {
                    id:game.id,
                    name:game.name
                }
            } );
            let allGames=[...vAPI_filt,...vDB_filt];
            
            res.send(allGames);
        })
    }
    // else {
    //     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8&page_size=15`)//seteo que venga 15 juegos por pagina
    //     .then(result=>{ // la propiedad next tiene los proximos 15 juegos a este se tiene que hacer otro get;
    //     //creo que cuando querramos mostrar los 15 juego se debe hacer otra peticion con la proximau url
    //         res.send(result.data.results.map((game)=> game.name ));
    //     }
    // )
    // .catch((error)=>{
    //     next(error);
    // })}
    
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