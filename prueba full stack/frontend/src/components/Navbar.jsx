import React from 'react';
import { useUser} from '../context/UserContext';


export const Navbar = ({ children }) => {

    //const usuario = JSON.parse(localStorage.getItem("usuario"))
    const { user , exit} = useUser();
    //console.log(usuario);
    return (<>
        <div className='w-100 content'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <img src="../assets/img/img.jpg" className="img-fluid rounded-circle avatar mr-2"/> */}
                                <a className="nav-link active" aria-current="page" href="/" onClick={() => exit()}>cerrar sesion</a>
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
