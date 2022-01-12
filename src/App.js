import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import AllCentersPage from "./pages/AllCentersPage";
import ViewCenterPage from "./pages/ViewCenterPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/NavigationBar/Navbar";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <div>
          <Navbar></Navbar>

          <Route exact path="/allCenters" component={AllCentersPage}></Route>
          <Route
            exact
            path="/viewCenter/:id"
            component={ViewCenterPage}
          ></Route>
        </div>
      </Switch>
    </div>
  );
}

export default App;
