const { Router } = require('express');
const { Op } = require ("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame } = require("../db")
const router = Router();

router.get("/",async(req,res,next)=>{
    let videogamesAPI;
    let videogamesDB;
    const  { name } = req.query;
    // const queryParamsSize=Object.keys(req.query).length;
    try {
        if( name ){//si paso 2 parametros con la misma variable me genera un array de valores
            videogamesAPI=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=100`);
            videogamesDB = await Videogame.findAll({
                where:{
                    name:{
                        [Op.iLike]: '%' + name + '%' //expresion regular que filtra coincidencias con name de seuqalize
                    }
                },
                order:[
                        ['name','ASC']
                ] //ORDERNAR POR NOMBRE ASCENDENTEMENTE
            });
        }
        else{
            videogamesAPI=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`);
            videogamesDB = await Videogame.findAll();
        }
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
                
                if( name ){//segundo filtrado de nombre a buscar en caso que se haya proporcionado
                    vAPI_filt=vAPI_filt.filter((game)=>{
                        return game.name.toLowerCase().includes(name);
    
                    })
                }

                let allGames=[...vDB_filt,...vAPI_filt.slice(0,14)];//filtro 14 dela api asi veo si se muestra de mi bd
                let gamesOrd=allGames.sort(function (a, b) { //ordeno de menor a mayor para testear
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {//luego tengo que filtrar desde el front
                      return 1;                             //enviando filtrados al back o filtrarlo alli
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                      return -1;
                    }
                    return 0;
                  }) ;
                if( name !== undefined ){
                    if( gamesOrd.length === 0 ){
                        res.send("Si no existe ningún videojuego mostrar un mensaje adecuado");
                    }
                    else{
                        res.send(gamesOrd.slice(0,15));
                    }
                
                }
                else{
                   res.send(gamesOrd); 
                }
                
            })
            .catch((error)=>{
                next(error);
            })
    } catch (error) {
        next(error);
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