import { GET_VIDEOGAMES } from "../actions/gamesActions";

const initialState ={
    videogames:[],
}

const reducer= (state=initialState,action)=>{ // RECIBO UNA ACTION DE MI CARPETA ACTION
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {...state,videogames:action.payload}
    
        default:
            return {...state}
    }

}
export default reducer;