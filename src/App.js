import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import AllCentersPage from "./pages/AllCentersPage";
import ViewCenterPage from "./pages/ViewCenterPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/allCenters" component={AllCentersPage}></Route>
        <Route exact path="/viewCenter/:id" component={ViewCenterPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
