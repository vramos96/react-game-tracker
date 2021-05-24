import { useState, useEffect, useMemo } from "react"
import { Grid, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@material-ui/core"
import axios from "axios"
import ResponseContainer from "./ResponseContainer"
const GameForm = ({gameName, platforms}) => {
    const apiKey = process.env.REACT_APP_API_KEY ?? ""
    const [canSubmitValues, setCanSubmitValues] = useState(false)
    const [platform, setPlatform] = useState("")
    const [platformUserIdentifier, setPlatformUserIdentifier] = useState("")
    const [data, setData] = useState(null)
    const [apiError, setApiError] = useState(false)
    const responseContainer = useMemo(() => (data !== null) ? <ResponseContainer gameName={gameName} data={data} /> : null, [gameName, data])
    //const responseContainer = <ResponseContainer gameName={gameName} data={data} />
    useEffect( () => {
        setCanSubmitValues(false)
        setPlatform("")
        setPlatformUserIdentifier("")
        setData(null)
        setApiError(false)
    }, [gameName])

    const handleTrackerRequest = () => {
        if (! (gameName === "Apex Legends" || gameName === "Overwatch") ){ 
            alert("Could not make API request since game it's not Apex Legends or Overwatch")
            return 
        }
        //Game will be apex legends or overwatch from here on now
        const encodedPlatformUserIdentifier = encodeURIComponent(platformUserIdentifier)
        const corsUrl = "https://cors-anywhere.herokuapp.com/"
        const fetchUrl = (gameName === "Apex Legends") ? 
        `https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${encodedPlatformUserIdentifier}` :
        `https://public-api.tracker.gg/v2/overwatch/standard/profile/${platform}/${encodedPlatformUserIdentifier}`
        //If env is development prepend cors-anywhere plugin
        axios.get(corsUrl + fetchUrl, 
        {
            headers: {
                'TRN-Api-Key': process.env.REACT_APP_API_KEY
            }
        })
        .then(function (response) {
            console.log("success!!!")
            var data = response.data.data ?? null
            //console.log(JSON.stringify(data))
            //console.log("segments")
            //console.log(JSON.stringify(data.segments))
            setApiError(false)
            setData(data)
        })
        .catch(function (error) {
            console.log("error!!!")
            var data = error?.response?.data?.errors[0]?.message ?? null
            //console.log(data)
            setApiError(true)
            setData(data)
        })
        .then(function () {
            //Reset query values
            setCanSubmitValues(false)
            setPlatform("")
            setPlatformUserIdentifier("")
        })
    }
    
    function handleSubmitButton(){
        if(gameName === ""){
            alert("Please select a game to continue")
            return
        }
        if(platform === ""){
            alert("Please select a platform to continue")
            return
        }
        if(platformUserIdentifier === ""){
            alert("Please input a user identifier to continue")
            return
        }
        if(apiKey === ""){
            alert("API KEY is not properly set, admin input a valid key as environment variable")
            return
        }
        if(gameName === "Apex Legends" || gameName === "Overwatch"){
            handleTrackerRequest()
            return
        }
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
                { 
                    data === null ?  
                    <h2>
                        No data available for display
                    </h2>
                    :
                    <Grid container style={{textAlign : "center"}}>
                        {
                            apiError &&
                            <Grid item xs={12}>
                                <h2>
                                    Error in API request, server responded with message:
                                </h2>
                                <Typography paragraph>{data}</Typography>
                            </Grid>
                        }
                        {
                            !apiError &&
                            responseContainer
                        }
                    </Grid>
                }
            </div>
        </>
    )
}

export default GameForm
