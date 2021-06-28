import { Link, NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <div className="container">
                <Link to="/" className="navbar-brand">more coupons</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/panel" className="nav-link">Panel</NavLink>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
  }
  
  export default Navigation;
  