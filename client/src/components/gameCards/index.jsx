import { useEffect } from "react";
import GameCard from "./gameCard";
import {connect} from "react-redux"
import { getVideogames } from "../../redux/actions/gamesActions";
function GameCards({videogames,getVideogames}){
    function getGamesFunction(){
        getVideogames()
    }

    useEffect(()=>{
        getGamesFunction();
    },[ ])
    return <div style={{display:"flex",alignContent:"space-around"}}> {
        videogames.map((Vgame)=>{
            return <GameCard key={Vgame.id} id={Vgame.id} name={Vgame.name}/>
            
        })
    }
    </div>
}
const mapStateToProps = state=>{
    return {
        videogames:state.videogames,
    }
}

const mapDispatchToProps= dispatch=>{
    return {
        getVideogames: game=>{
            dispatch(getVideogames(game))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameCards)

