import { useState, useEffect } from "react"
import { Grid, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@material-ui/core"
import axios from "axios"
const GameForm = ({gameName, platforms}) => {
    const apiKey = process.env.REACT_APP_API_KEY ?? ""
    const [canSubmitValues, setCanSubmitValues] = useState(false)
    const [platform, setPlatform] = useState("")
    const [platformUserIdentifier, setPlatformUserIdentifier] = useState("")
    const [data, setData] = useState(null)
    const [apiError, setApiError] = useState(false)
    
    useEffect( () => {
        setCanSubmitValues(false)
        setPlatform("")
        setPlatformUserIdentifier("")
        setData(null)
        setApiError(false)
    }, [gameName])

    const handleApexLegendsRequest = () => {
        const corsUrl = "https://cors-anywhere.herokuapp.com/"
        const fetchUrl = `https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}`
        axios.get(corsUrl + fetchUrl, 
        {
            headers: {
                'TRN-Api-Key': process.env.REACT_APP_API_KEY
            }
        })
        .then(function (response) {
            console.log("success!!!")
            var data = response.data.data
            //console.log(JSON.stringify(data))
            //console.log("segments")
            //console.log(JSON.stringify(data.segments))
            setApiError(false)
            setData(data ?? null)
        })
        .catch(function (error) {
            console.log("error!!!")
            //console.log(error.response.data)
            setApiError(true)
            setData(null)
        })
        .then(function () {
            setCanSubmitValues(false)
            setPlatform("")
            setPlatformUserIdentifier("")
        })
    }
    
    function handleSubmitButton(){
        if(gameName === ""){
            alert("Please select a game to continue")
            return;
        }
        if(platform === ""){
            alert("Please select a platform to continue")
            return;
        }
        if(platformUserIdentifier === ""){
            alert("Please input a user identifier to continue")
            return;
        }
        if(apiKey === ""){
            alert("API KEY is not properly set, please input a valid key as environment variable")
            return
        }
        if(gameName === "Apex Legends"){
            handleApexLegendsRequest()
        }
        if(gameName === "Overwatch"){
            alert("handle overwatch func")
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
                    <Typography paragraph>
                        No data available for display
                    </Typography>
                    :
                    <Grid container style={{textAlign : "center"}}>
                        {
                            apiError &&
                            <Grid item xs={12}>
                                <Typography paragraph>Error in API request, server responded with message:</Typography>
                                <Typography paragraph>{data}</Typography>
                            </Grid>
                        }
                        {
                            !apiError &&
                            data.segments.map((segment, index) => {
                                return segment.type === "overview" ? 
                                <Grid key={index} item xs={12}>
                                    <h2>
                                        Player Overview for {data?.platformInfo?.platformUserIdentifier ?? "Undefined"}
                                        ({data?.platformInfo?.platformSlug ?? "Undefined"})
                                    </h2>
                                    <Typography paragraph>
                                    Lifetime level: {segment?.stats?.level?.displayValue ?? "Undefined"}
                                    </Typography>
                                    <Typography paragraph>
                                    Lifetime kills: {segment?.stats?.kills?.displayValue ?? "Undefined"}
                                    </Typography>
                                    <Typography paragraph>
                                    Lifetime damage: {segment?.stats?.damage?.displayValue ?? "Undefined"}
                                    </Typography>
                                    <Typography paragraph>
                                    Lifetime revives: {segment?.stats?.revives?.displayValue ?? "Undefined"}
                                    </Typography>
                                    <Typography paragraph>
                                    Lifetime rank score: {segment?.stats?.rankScore?.metadata?.rankName ?? "Undefined"}
                                    </Typography>
                                    <Typography paragraph>
                                    <img src={segment?.stats?.rankScore?.metadata?.iconUrl ?? ""} alt="" width={50} height={50} />
                                    </Typography>
                                </Grid>
                                : 
                                segment.type === "legend" ? 
                                <Grid key={index} item xs={12}>
                                    <h3>Legend {segment?.metadata?.name ?? "Undefined"}</h3>
                                    <Typography paragraph>
                                        <img src={segment?.metadata?.imageUrl ?? ""} alt="" width={50} height={50}/>
                                    </Typography>
                                    <Typography paragraph>
                                        Kills : {segment?.stats?.kills?.displayValue ?? "Undefined"} 
                                    </Typography>
                                </Grid>
                                 :
                                 <Grid key={index} item xs={12}>
                                     <Typography paragraph>
                                         Data is not overview or legend
                                    </Typography>
                                 </Grid>
                            })
                        }
                    </Grid>
                }
            </div>
        </>
    )
}

export default GameForm
