import { BrowserRouter as Router, Route } from "react-router-dom"
import Tracker from "./components/Tracker"
import { Grid } from "@material-ui/core"
function App() {
  return (
    <Router>
    <div className="container">
      <Route path="/" exact render={(props) => (
        <>
        <Grid >
          <Tracker />
        </Grid>
        </>
      )} />
    </div>
    </Router>
  );
}

export default App;
