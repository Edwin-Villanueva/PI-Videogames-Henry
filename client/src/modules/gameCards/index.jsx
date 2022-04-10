import { useState,useEffect } from "react";
import axios from "axios";
import GameCard from "./gameCard";
export default function GameCards(){
    const [VideoGames , setVideogames] = useState([]);
    const getVideogames=()=>{
        return axios.get("http://localhost:3001/videogames")
        .then((vgame)=>{
           console.log(vgame.data);
            setVideogames(vgame.data);

        })
    }

    useEffect(()=>{
        getVideogames();
    }, [])
    return <div style={{display:"flex",alignContent:"space-around"}}> {
        VideoGames.map((Vgame)=>{
            return <GameCard key={Vgame.id} id={Vgame.id} name={Vgame.name}/>
            
        })
    }
    </div>

    // return  <div style={{border:"1px solid green",width : 100,margin: "2px"}}>
    //     aca se debe renderizar un game card
    //     </div>

}
