import React from 'react';
import { Link } from 'react-router-dom';



export const Sidebar = ({children}) => {
    return (<>  
    <div className="d-flex" id="content-wrapper">
        <div id="sidebar-container" className="bg-primary sticky">
            <div className="logo">
                <h4 className="text-light font-weight-bold mb-0">Dashboard</h4>
            </div>
            <div className="menu">
                <Link to='/pedidos'>
                <a className="d-block text-light p-3 "><i className="icon ion-md-apps lead m-2"></i>
                    Pedidos</a>
                </Link>
                
                <Link to='/usuarios'>
                <a  className="d-block text-light p-3 border-0"><i className="icon ion-md-people lead m-2"></i>
                    Usuarios</a>
                    </Link>
                    <Link to='/productos'>
                <a className="d-block text-light p-3 border-0"><i className="icon ion-md-stats lead m-2"></i>
                    Productos</a>
                    </Link>
                    <Link to='/clientes'>
                <a  className="d-block text-light p-3 border-0"><i className="icon ion-md-person lead m-2"></i>
                    clientes</a>
                    </Link>
            </div>
            <div className="logo">
                <h4 className="text-light font-weight-bold mb-0">otras opciones</h4>
            </div>
            <div className="menu">

            <Link to='/mejorvendedor'>
                <a  className="d-block text-light p-3 "><i className="icon ion-md-apps lead m-2"></i>
                    mejores vendedores</a>
                    </Link>

                    <Link to='/mejorcliente'>
                <a  className="d-block text-light p-3 border-0"><i className="icon ion-md-people lead m-2"></i>
                    mejores clientes</a>
                    </Link>


            </div>
        </div>
    {children}
    </div>
    </>
    );
};

