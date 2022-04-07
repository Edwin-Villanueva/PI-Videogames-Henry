const { Router } = require('express');
const router = Router();
const { Videogame } = require("../db")


router.get("/:idVideogame",async(req,res,next)=>{
    try {
        const { idVideogame } =req.params;
        const vgame = await Videogame.findByPk(idVideogame);
        res.send(vgame);
    } catch (error) {
        next(error);
    }

})

router.post("/",async(req,res,next)=>{
    
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