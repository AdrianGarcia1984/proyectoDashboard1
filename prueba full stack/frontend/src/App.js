import { useUser } from "./context/UserContext";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from './components/Login'
import { Clientes } from './components/Clientes'
import { Registrar } from "./components/Registrar";
import { Pedidos } from "./components/Pedidos";
import { Usuarios } from "./components/Usuarios";
import { Productos } from "./components/Productos";
import { ActionsProductos } from "./components/ActionsProductos";
import { ActionsUsuarios } from "./components/ActionsUsuarios";
import { ActionsPedidos } from "./components/ActionsPedidos";
import { ActionsClientes } from "./components/ActionsClientes";
import { MejoresVendedores } from "./components/MejoresVendedores";
import { MejoresClientes } from "./components/MejoresClientes";



function App() {

const {user }= useUser()

const Private = ({children})=>{
  return user.login? children :<Navigate to='/'/>
}

  return (
    <Router>

        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/clientes" element={<Private><Clientes /></Private>} />
          <Route path="/usuarios" element={<Private><Usuarios /></Private>} />
          <Route path="/pedidos" element={<Private><Pedidos /></Private>} />
          <Route path="/productos" element={<Private><Productos /></Private>} />
          <Route path="/accioncliente" element={<Private><ActionsClientes /></Private>} />
          <Route path="/accioncliente/:id" element={<Private><ActionsClientes /></Private>} />
          <Route path="/accionusuario" element={<Private><ActionsUsuarios/></Private>} />
          <Route path="/accionusuario/:id" element={<Private><ActionsUsuarios/></Private>} />
          <Route path="/accionproducto" element={<Private><ActionsProductos/></Private>} />
          <Route path="/accionproducto/:id" element={<Private><ActionsProductos/></Private>} />
          <Route path="/accionpedido" element={<Private><ActionsPedidos /></Private>} />
          <Route path="/accionpedido/:id" element={<Private><ActionsPedidos /></Private>} /> 
          <Route path="/mejorvendedor" element={<Private><MejoresVendedores /></Private>} />  
          <Route path="/mejorcliente" element={<Private><MejoresClientes /></Private>} />       

        </Routes>
  
    </Router>

  );
}

export default App;
