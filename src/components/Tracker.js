import { MenuItem, Select, InputLabel, Grid} from "@material-ui/core"
import { useState } from "react"
import GameContainer from "../components/GameContainer"

const Tracker = () => {
    const appName = process.env.REACT_APP_NAME ?? "GAME TRACKER"
    const [game, setGame] = useState("")
    return (
        <>
            <h1 style={{textAlign: 'center', color: 'red'}}>{appName}</h1>
            <Grid item xs={12}>
                <InputLabel>Select a game</InputLabel>
                <Select
                fullWidth
                name="game"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                >
                <MenuItem value={"Apex Legends"}>Apex Legends</MenuItem>
                <MenuItem value={"Overwatch"}>Overwatch</MenuItem>
                </Select>
            </Grid>
            <GameContainer gameName={game} />
        </>
    )
}

export default Tracker
