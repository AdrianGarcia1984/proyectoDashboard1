import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import PedidoContext from '../../context/pedidos/PedidoContext'
import { useUser } from '../../context/UserContext';

export const AsignarProductos = () => {
    const { user } = useUser();
    const options = { headers: { authorization: "Bearer " + user.token } }
    const [stateProducto, setStateProducto] = useState([]);
    const [productos, setProductos]= useState([]);


    const opcionProducto = async () => {
        const { data } = await axios.get('producto/listarproducto', options);
        setStateProducto(data.productos.docs);
    }

        //context de pedidos

        const pedidoContext = useContext(PedidoContext)
        const {agregarProducto}= pedidoContext

    useEffect(()=>{
        opcionProducto()
        agregarProducto(productos);
    },[productos])

const seleccionarProducto = (producto)=>{
    setProductos(producto)
}

    return (     
            <>
            <p>2 asignar producto</p>
            <Select
            options = {stateProducto}
            isMulti={true}
            onChange={opcion=>seleccionarProducto(opcion)}
            getOptionValue={opciones=>opciones.id}
            getOptionLabel={opciones=>`${opciones.nombre} - ${opciones.stock} Disponibles`}
            placeholder='seleccionar producto'
            noOptionsMessage={()=>'no hay resultados'}
            />  
            </>

               
    );
};
