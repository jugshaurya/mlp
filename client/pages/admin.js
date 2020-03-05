import Header from "../components/Header";
import requireAuthHOC from "../components/requireAuthHOC";

const Admin = () => {
  return (
    <>
      <Header />
      <h2> Admin Dashboard</h2>
    </>
  );
};

export default requireAuthHOC(Admin);
