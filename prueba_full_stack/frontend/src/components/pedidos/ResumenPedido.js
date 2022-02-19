import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext'
import { ProductoResumen } from './ProductoResumen';

export const ResumenPedido = () => {

    //context de pedidos

    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext

    return (
    <>
        <p>3 resumen del pedido</p>
        {productos.length > 0 && (
            <>
                {productos.map(producto => (
                    <ProductoResumen
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </>
        )}
    </>)
};
