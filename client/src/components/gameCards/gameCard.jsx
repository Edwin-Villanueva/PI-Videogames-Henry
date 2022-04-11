export default function GameCard({id,name}){
return <div style={{border:"1px solid green",width : 80,margin: "2px"}}>
                <p>{id}</p>
                <p>{name}</p>
            </div>
}