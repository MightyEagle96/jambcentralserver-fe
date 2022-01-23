import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { history } from "../utils/History";
import PublicRoutes from "./PublicRoutes";
import Routes from "./Routes";

const MainRoutes = (props) => {
  history.listen(() => {});

  return (
    <BrowserRouter basename="/">
      <Switch>
        {Routes?.map((route, i) => {
          return <PublicRoutes key={i} {...route} />;
        })}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoutes;
