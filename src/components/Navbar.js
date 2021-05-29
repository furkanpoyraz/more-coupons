import {
    Link,
    NavLink
  } from "react-router-dom";
  
import 'bootstrap/js/src/collapse';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">more coupons</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/panel" activeClassName="active" className="nav-link">Panel</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Navbar;
  