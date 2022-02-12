import React from 'react';
import { useUser } from '../context/UserContext';
import { NavLink } from 'react-router-dom';


export const Navbar = ({ children }) => {

    const { user, exit } = useUser();
    ;
    return (<>
        <div className='w-100 content'>
            <nav className="navbar navbar-expand-sm navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => exit()}>
                                <NavLink className="nav-link"
                                    to="/"
                                >cerrar sesion</NavLink>
                            </li>
                        </ul>
                        <h4>bienvenido: {user.nombre}</h4>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    </>);
};
