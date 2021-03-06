import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterComponent from "./components/Footer/FooterComponent";
import Navbar from "./components/NavigationBar/Navbar";
import AllCentersPage from "./pages/AllCentersPage";
import ViewCenterPage from "./pages/Center/ViewCenterPage";
import CreateCenterPage from "./pages/CreateCenter/CreateCenterPage";
import HomePage from "./pages/Home/HomePage";
import QuestionsView from "./pages/utme/QuestionsView";
import UtmeSubjectsView from "./pages/utme/UtmeSubjectsView";
import CandidatesView from "./pages/Candidates/CandidatesView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <>
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
            <Route
              exact
              path="/utmeSubjects"
              component={UtmeSubjectsView}
            ></Route>
            <Route
              exact
              path="/questions/:id"
              component={QuestionsView}
            ></Route>
            <Route exact path="/candidates" component={CandidatesView}></Route>
            <FooterComponent></FooterComponent>
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
