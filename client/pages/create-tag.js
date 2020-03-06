// React Import
import React from "react";
// other Components
import Header from "../components/Header";
import CreateTagForm from "../components/createTagForm";

const createTagPage = () => {
  return (
    <div className="create-tag-page">
      <Header />
      <h2>Admin Create Tag Here</h2>
      <CreateTagForm />
    </div>
  );
};

export default createTagPage;
