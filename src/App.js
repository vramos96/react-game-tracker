import { BrowserRouter as Router, Route } from "react-router-dom"
import { Grid } from "@material-ui/core"
import Tracker from "./components/Tracker"
import Footer from "./components/Footer"
function App() {
  return (
    <Router>
    <div className="container">
      <Route path="/" exact render={(props) => (
        <>
        <Grid >
          <Tracker />
          <Footer />
        </Grid>
        </>
      )} />
    </div>
    </Router>
  );
}

export default App;
