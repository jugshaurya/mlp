import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/signin">
        <a>Signin</a>
      </Link>

      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </div>
  );
};

export default Header;
