import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import  {PedidoState}  from './context/pedidos/PedidoState';
import 'rc-pagination/assets/index.css';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:4000/"
//axios.defaults.baseURL=" https://backend-adr.herokuapp.com/"

ReactDOM.render(
  <UserProvider>
    <PedidoState>
    <App />
    </PedidoState>
  </UserProvider>,
  document.getElementById('root')
);


