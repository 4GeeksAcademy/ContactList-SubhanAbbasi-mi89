import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        Contact List
      </Link>
    </nav>
  );
}