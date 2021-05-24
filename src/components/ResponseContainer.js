import { Grid, Typography } from "@material-ui/core"

const ResponseContainer = ({gameName, data}) => {
    return (
        <>
            <h2>
                Player Overview for {data?.platformInfo?.platformUserIdentifier ?? "Undefined"}
                ({data?.platformInfo?.platformSlug ?? "Undefined"})
            </h2>
            {
            (gameName === "Apex Legends") ?
            data.segments.map((segment, index) => {
                return segment.type === "overview" ? 
                <Grid key={index} item xs={12}>
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
            :
            (gameName === "Overwatch") ?
            data.segments.map((segment, index) => {
                return segment.type === "overview" ? 
                <Grid key={index} item xs={12}>
                    <h2>
                        Gamemode {segment?.metadata?.name ?? "Undefined"}
                    </h2>
                    <Typography paragraph>
                        Time played: {segment?.stats?.timePlayed?.displayValue ?? "Undefined"}
                    </Typography>
                    <Typography paragraph>
                        Total wins: {segment?.stats?.wins?.displayValue ?? "Undefined"} <br />
                        Total matches played: {segment?.stats?.wins?.displayValue ?? "Undefined"} <br />
                        W/L Percentage: {segment?.stats?.wlPercentage?.displayValue ?? "Undefined"}
                    </Typography>
                    <Typography paragraph>
                        Gold medals: {segment?.stats?.goldMedals?.displayValue ?? "Undefined"} <br />
                        Silver medals: {segment?.stats?.silverMedals?.displayValue ?? "Undefined"} <br />
                        Bronce medals: {segment?.stats?.bronzeMedals?.displayValue ?? "Undefined"} <br />
                        Total medals: {segment?.stats?.medals?.displayValue ?? "Undefined"}
                    </Typography>
                    <Typography paragraph>
                        Total damage done: {segment?.stats?.damageDone?.displayValue ?? "Undefined"} <br />
                        Total healing done: {segment?.stats?.healingDone?.displayValue ?? "Undefined"}
                    </Typography>
                    <Typography paragraph>
                        Total eliminations: {segment?.stats?.eliminations?.displayValue ?? "Undefined"} <br />
                        Total deaths: {segment?.stats?.deaths?.displayValue ?? "Undefined"} <br />
                        K/D: {segment?.stats?.kd?.displayValue ?? "Undefined"} <br />
                        K/G: {segment?.stats?.kg?.displayValue ?? "Undefined"}
                    </Typography>
                </Grid>
                : 
                segment.type === "hero" ? 
                <Grid key={index} item xs={12}>
                    <h3>Hero {segment?.metadata?.name ?? "Undefined"}</h3>
                    <Typography paragraph>
                        Wins : {segment?.stats?.wins?.displayValue ?? "Undefined"} <br />
                        W/L Percentage : {segment?.stats?.wlPercentage?.displayValue ?? "Undefined"}
                    </Typography>
                    <Typography paragraph>
                        Hero damage done : {segment?.stats?.heroDamageDone?.displayValue ?? "Undefined"}
                    </Typography>
                </Grid>
                :
                <Grid key={index} item xs={12}>
                    <Typography paragraph>
                        Data is not overview or hero
                    </Typography>
                </Grid>
            })
            :
            <Grid item xs={12}>
                Game is not Apex Legends or Overwatch
            </Grid>
            }
        </>
    )
}

export default ResponseContainer
