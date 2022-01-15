import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import AllCentersPage from "./pages/AllCentersPage";
import ViewCenterPage from "./pages/Center/ViewCenterPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/NavigationBar/Navbar";
import CreateCenterPage from "./pages/CreateCenterPage";
import FooterComponent from "./components/Footer/FooterComponent";

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
            path="/createCenter"
            component={CreateCenterPage}
          ></Route>

          <Route
            exact
            path="/viewCenter/:id"
            component={ViewCenterPage}
          ></Route>
          <FooterComponent></FooterComponent>
        </div>
      </Switch>
    </div>
  );
}

export default App;
