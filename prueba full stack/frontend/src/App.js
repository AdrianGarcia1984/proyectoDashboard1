//import Layout from "antd/lib/layout/layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from './components/Login'
import { Clientes } from './components/Clientes'
import { Registrar } from "./components/Registrar";
import { Pedidos } from "./components/Pedidos";
import { Usuarios } from "./components/Usuarios";
import { Productos } from "./components/Productos";
import { ActionsProductos } from "./components/ActionsProductos";



function App() {
  return (
    <Router>
      {/* <Sidebar> */}
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/accioncliente" element={<Productos />} />
          <Route path="/accionproducto/:id" element={<ActionsProductos/>} />
          <Route path="/accionproducto/" element={<ActionsProductos/>} />
          <Route path="/accionusuario" element={<Productos />} />

        </Routes>
        {/* </Sidebar> */}
    </Router>

  );
}

export default App;
