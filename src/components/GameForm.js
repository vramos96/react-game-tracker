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
                defaultValue=""
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
                <InputLabel required>Enter your platform user identifier (id)</InputLabel>
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
                { data === null ?  
                <Typography paragraph>
                    No data available for display
                </Typography>
                :
                <Grid container style={{textAlign : "center"}}>
                    <Grid item xs={12}>
                        <Typography paragraph>
                                Displaying data for: <br/>
                                game {gameName}, <br/>
                                platform {platform}, <br/>
                                id {platformUserIdentifier}, <br/>
                                key {apiKey !== "" ? {apiKey} : "api key is null"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph>{data}</Typography>
                    </Grid>
                </Grid>
                }
            </div>
        </>
    )
}

export default GameForm
