import GameForm from "../components/GameForm"
const GameContainer = ({gameName}) => {
    function getGamePlatforms(){
        var platforms = []
        if(gameName === "Apex Legends"){
            platforms = [
                {
                    id: 1,
                    name: "Origin (PC)",
                    value: "origin"
                },
                {
                    id: 2,
                    name: "Xbox",
                    value: "xbl"
                },
                {
                    id: 3,
                    name: "PSN",
                    value: "psn"
                }
            ]
        }
        if(gameName === "Overwatch"){
            platforms = [
                {
                    id: 1,
                    name: "Battlenet (PC)",
                    value: "battlenet"
                },
                {
                    id: 2,
                    name: "Xbox",
                    value: "xbl"
                },
                {
                    id: 3,
                    name: "PSN",
                    value: "psn"
                }
            ]
        }
        return platforms
    }
    return (gameName === "") ? (
        <div className="container" style={{textAlign : "center"}}>
            <h2>Select a game to continue</h2>
        </div>
    ) : (
        <div className="container" style={{textAlign : "center"}}>
            <h2>{gameName}</h2>
            <GameForm gameName={gameName} platforms={getGamePlatforms()}/>
        </div>
    )
}

export default GameContainer
