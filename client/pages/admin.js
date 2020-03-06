import Header from "../components/Header";
import Link from "next/link";
import requireAuthHOC from "../components/requireAuthHOC";

const Admin = () => {
  return (
    <>
      <Header />
      <h2> Admin Dashboard</h2>
      <Link href="/create-series">
        <a style={{ margin: "10px" }}>Create Series</a>
      </Link>
      <Link href="/create-tag">
        <a style={{ margin: "10px" }}>Create Tags</a>
      </Link>
    </>
  );
};

export default requireAuthHOC(Admin);
