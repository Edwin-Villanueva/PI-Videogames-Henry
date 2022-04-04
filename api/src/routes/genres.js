const { Router } = require('express');
const router = Router();

router.get("/",(req,res,next)=>{
    res.send("soy el get de genres");
})

router.post("/",(req,res,next)=>{
    res.send("soy el post de genres");
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de genres");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de genres");
})

module.exports = router;