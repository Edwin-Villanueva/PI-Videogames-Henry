const { Router } = require('express');
const router = Router();

router.get("/",(req,res,next)=>{
    res.send("soy el get de videogame");
})

router.post("/",(req,res,next)=>{
    res.send("soy el post de videogame");
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de videogame");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de videogame");
})

module.exports = router;