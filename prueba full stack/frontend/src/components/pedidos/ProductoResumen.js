import React, { useContext, useState, useEffect } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

export const ProductoResumen = ({ producto }) => {

    const [cantidad, setCantidad]=useState( 0)
    //context de pedidos

    const pedidoContext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidoContext

const actualizarCantidad = ()=>{
    const nuevoProducto = {...producto, cantidad: Number(cantidad)}
    cantidadProductos(nuevoProducto)
}

useEffect(() => {
  actualizarCantidad();
  actualizarTotal()
}, [cantidad]);


    return <>
        <div>
            <div>
                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col-md">
                            <p className='text-sm'> {producto.nombre}</p>
                            <p>$ {producto.precio}</p>

                        </div>
                        <div className="col-md">
                            <input className="form-control form-control-sm"
                                placeholder='cantidad'
                                type="number" onChange={(e)=>setCantidad(e.target.value)}
                                value={cantidad}
                            />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </>;
};
