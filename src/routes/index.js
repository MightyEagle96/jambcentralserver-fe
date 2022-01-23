import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
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
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoutes;
