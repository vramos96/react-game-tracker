import { BrowserRouter as Router, Route } from "react-router-dom"
function App() {
  return (
    <Router>
    <div className="container">
      <h3>Game Tracker</h3>
      <Route path="/" exact render={(props) => (
        <>
        This is the home directory
        </>
      )} />
    </div>
    </Router>
  );
}

export default App;
