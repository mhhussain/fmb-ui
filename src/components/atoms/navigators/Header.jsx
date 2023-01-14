import { Link } from "react-router-dom";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "@/screens/login/loginSlice";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="sticky-top">
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="container-fluid">
          <NavLink eventKey="1" as={Link} to="/">
            Home
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/tasbeeh">
            Tasbeeh
          </NavLink>
          <NavLink eventKey="3" as={Link} to="/calendar">
            Calendar
          </NavLink>
          <NavLink  onClick={() => {
            dispatch(logOut());
          }}>
            Logout
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
