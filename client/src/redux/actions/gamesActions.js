import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";

export function getVideogames(){
    return function (dispatch){
        return axios.get("http://localhost:3001/videogames")
        .then(response=>{
            dispatch({
                type:GET_VIDEOGAMES,
                payload:response.data
            })
        })
    }
}