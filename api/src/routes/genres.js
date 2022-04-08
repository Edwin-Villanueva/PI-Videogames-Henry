const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { Genre } = require("../db")
const { API_KEY } = process.env;
router.get("/",async(req,res,next)=>{
    // try { usando async await 
    //  const genre = await Genre.findAll()
    // res.send(genre);
    // } catch (error) {
    //     next(error);
    // }
    Genre.findAll({order:[['id','ASC']]})//busco ordenado por id
    .then((genre)=>{
        
        if(genre.length === 0 ){ //si no hay generos
            axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)//busco en la api externa
            .then((response)=>{

                response.data.results.forEach(async(game) => {//y voy agregando 1 por 1 a la bd
                  let id=parseInt(game.id);
                  let name=game.name;
                  await Genre.create({
                    id,
                    name,
                })
            });
                
            res.send(
                Genre.findAll({order:[['id','ASC']]}).
                then(genere=>{
                    res.send(genere);
                })

            )//al finalizar retorno el contenido de la 
            })
            .catch((error)=>{next(error)})
            
        }
        else{
            res.send(genre)
        }
    })
    .catch((error)=>{
        next(error);
    })

    
})

router.post("/",async(req,res,next)=>{ // esto no lo piden es solo para probar
    try {
        const { name } = req.body;
        const newGenre= await Genre.create({
            name
        })
        res.status(201).send(newGenre);
    } catch (error) {
        next(error);    
    }
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de genres");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de genres");
})

module.exports = router;