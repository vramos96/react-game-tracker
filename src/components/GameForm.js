import { useState, useEffect } from "react"
import { Grid, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@material-ui/core"
const GameForm = ({gameName, platforms}) => {
    const apiKey = process.env.REACT_APP_API_KEY ?? ""
    const [canSubmitValues, setCanSubmitValues] = useState(false)
    const [platform, setPlatform] = useState("")
    const [platformUserIdentifier, setPlatformUserIdentifier] = useState("")
    const [data, setData] = useState(null)
    useEffect( () => {
        console.log("do something on gameName change", gameName)
        setCanSubmitValues(false)
        setPlatform("")
        setPlatformUserIdentifier("")
        setData(null)
    }, [gameName])
    function handleSubmitButton(){
        if(gameName === ""){
            alert("game is null")
            return;
        }
        if(platform === ""){
            alert("platform is null")
            return;
        }
        if(platformUserIdentifier === ""){
            alert("platformuser is null")
            return;
        }
        /*
        if(apiKey === ""){
            alert("api key is null")
            return
        }
        */
        setData("aaa")
    }
    return (
        <>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputLabel required>Select a platform</InputLabel>
                <Select
                fullWidth
                name="platform"
                value={platform}
                onChange={(e) => {
                    var input = e.target.value
                    setCanSubmitValues( (platform !== "" && input !== "") ? true : false)
                    setPlatform(input)
                }}
                >
                {platforms.map((platform) => <MenuItem key={platform.id} value={platform.value}>{platform.name}</MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <InputLabel required>Enter your platform user identifier</InputLabel>
                <TextField
                fullWidth
                value={platformUserIdentifier}
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                onChange={(e) => {
                    var input = e.target.value
                    setCanSubmitValues( (platform !== "" && input !== "") ? true : false)
                    setPlatformUserIdentifier(input)
                }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button disabled={!canSubmitValues} variant="contained" onClick={handleSubmitButton}>Submit</Button>
            </Grid>
            </Grid>
            <div className="container">
                <Typography paragraph>Game: {gameName}</Typography>
                <Typography paragraph>Platform: {platform}</Typography>
                <Typography paragraph>Platform user id: {platformUserIdentifier}</Typography>
                <Typography paragraph>Can submit value: {canSubmitValues ? "true" : "false"}</Typography>
                <Typography paragraph>API KEY: {apiKey ?? "api key is null"}</Typography>
                <Typography paragraph>Data: {data ?? "data is null"}</Typography>
            </div>
        </>
    )
}

export default GameForm
