import React from 'react';



export const Sidebar = ({children}) => {
    return (<>  
    <div className="d-flex" id="content-wrapper">
        <div id="sidebar-container" className="bg-primary">
            <div className="logo">
                <h4 className="text-light font-weight-bold mb-0">Dashboard</h4>
            </div>
            <div className="menu">
                <a href="/pedidos" className="d-block text-light p-3 "><i className="icon ion-md-apps lead m-2"></i>
                    Pedidos</a>

                <a href="/usuarios" className="d-block text-light p-3 border-0"><i className="icon ion-md-people lead m-2"></i>
                    Usuarios</a>

                <a href="/productos" className="d-block text-light p-3 border-0"><i className="icon ion-md-stats lead m-2"></i>
                    Productos</a>
                <a href="/clientes" className="d-block text-light p-3 border-0"><i className="icon ion-md-person lead m-2"></i>
                    clientes</a>
                <a href="#" className="d-block text-light p-3 border-0"> <i className="icon ion-md-settings lead m-2"></i>
                    Configuración</a>
            </div>
        </div>
    {children}
    </div>
    </>
    );
};

