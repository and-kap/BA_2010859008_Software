import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand me-3">
                        <i className="bi bi-buildings-fill me-1"></i>
                        Company Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-2" aria-current="page"
                                         to='/departments'>Departments</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-2" aria-current="page"
                                         to='/employees'>Employees</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;