import Header from "../components/Header";
import requireAuthHOC from "../components/requireAuthHOC";

const User = () => {
  return (
    <>
      <Header />
      <h2> User Dashboard</h2>
    </>
  );
};

export default requireAuthHOC(User);
