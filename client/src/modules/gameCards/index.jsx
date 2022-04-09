import { useState,useEffect } from "react";
import axios from "axios";
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
            return <div key={Vgame.id} style={{border:"1px solid green",width : 80,margin: "2px"}}>
                <p>{Vgame.id}</p>
                <p>{Vgame.name}</p>
            </div> 
        })
    }
</div>

    // return  <div style={{border:"1px solid green",width : 100,margin: "2px"}}>
    //     aca se debe renderizar un game card
    //     </div>

}
