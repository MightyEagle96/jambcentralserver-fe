import React from "react";
import { Helmet } from "react-helmet";

const PageHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Central Server Monitor - JAMB CBT" />
    </Helmet>
  );
};

export default PageHelmet;
