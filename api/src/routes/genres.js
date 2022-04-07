const { Router } = require('express');
const router = Router();
const { Genre } = require("../db")

router.get("/",(req,res,next)=>{
    // try { usando async await 
    //  const genre = await Genre.findAll()
    // res.send(genre);
    // } catch (error) {
    //     next(error);
    // }
    Genre.findAll() //usando promesas
    .then((genre)=>{
        res.send(genre)
    })
    .catch((error)=>{
        next(error);
    })
})

router.post("/",async(req,res,next)=>{
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