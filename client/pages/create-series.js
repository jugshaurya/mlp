// React Import
import React from "react";
// other Components
import Header from "../components/Header";
import CreateSeriesForm from "../components/createSeriesForm";

const createSeriesPage = () => {
  return (
    <div className="create-series-page">
      <Header />
      <h2>Admin Create Series Here</h2>
      <CreateSeriesForm />
    </div>
  );
};

export default createSeriesPage;
