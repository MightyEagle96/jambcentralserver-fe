import AllCentersPage from "../pages/AllCentersPage";
import CandidatesView from "../pages/Candidates/CandidatesView";
import ViewCenterPage from "../pages/Center/ViewCenterPage";
import CreateCenterPage from "../pages/CreateCenter/CreateCenterPage";
import HomePage from "../pages/Home/HomePage";
import QuestionsView from "../pages/utme/QuestionsView";
import UtmeSubjectsView from "../pages/utme/UtmeSubjectsView";

const Routes = [
  { path: "/", exact: true, component: HomePage },
  { path: "/all-centers", exact: true, component: AllCentersPage },
  { path: "/create-center", exact: true, component: CreateCenterPage },
  { path: "/view-center/:id", exact: true, component: ViewCenterPage },
  { path: "/utme-subjects", exact: true, component: UtmeSubjectsView },
  { path: "/questions/:id", exact: true, component: QuestionsView },
  { path: "/candidates", exact: true, component: CandidatesView },
];

export default Routes;
