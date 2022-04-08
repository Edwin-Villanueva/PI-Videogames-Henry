const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");


router.get("/:idVideogame",async(req,res,next)=>{
    try {
        const { idVideogame } =req.params;
        if(typeof idVideogame === "string" && idVideogame.length >10){//para saber si es un UUID
            const vgame = await Videogame.findByPk(idVideogame,{
                include:Genre
            });
            res.send(vgame);
        }
        else{
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
            .then((gamesApi)=>{
                res.send({
                    id:gamesApi.data.id,
                    name:gamesApi.data.name,
                    description:gamesApi.data.description,
                    platforms: gamesApi.data.platforms,
                    rengers:gamesApi.data.genres
                });
            })
            .catch((error)=>{next(error)})

        }
    } catch (error) {
        next(error);
    }

})

router.post("/",async(req,res,next)=>{//esto no lo pide las rutas pero en el fromnt si como formulario
    
    try {
        const { name,description,rating,platforms } = req.body;
        const newGame= await Videogame.create({
            name,
            description,
            rating,
            platforms
        })
        res.status(201).send(newGame);
    } catch (error) {
        next(error);    
    }
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de videogame");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de videogame");
})

module.exports = router;