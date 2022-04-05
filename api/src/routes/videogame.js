const { Router } = require('express');
const router = Router();
const { Videogame } = require("../db")


router.get("/",(req,res,next)=>{
    return Videogame.findAll()
    .then((games)=>{
        res.send(games);

    })
})

router.post("/",async(req,res,next)=>{
    const {name,description,rating,platforms} = req.body;
    const newGame= await Videogame.create({
        name,
        description,
        rating,
        platforms
    })
    res.send(newGame)
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de videogame");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de videogame");
})

module.exports = router;