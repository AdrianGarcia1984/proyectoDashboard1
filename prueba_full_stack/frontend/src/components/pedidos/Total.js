import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

export const Total = () => {


    //context de pedidos

    const pedidoContext = useContext(PedidoContext)
    const { total } = pedidoContext

  return <div className='text-sm flex'>
      <h3>total a pagar:</h3>
      <p>{total}</p>

  </div>;
};
