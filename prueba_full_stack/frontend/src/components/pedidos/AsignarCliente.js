import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import PedidoContext from '../../context/pedidos/PedidoContext'
import { useUser } from '../../context/UserContext';



export const AsignarCliente = () => {
    const { user } = useUser();
    const options = { headers: { authorization: "Bearer " + user.token } }
    const [stateCliente, setStateCliente] = useState([]);
    const [cliente, setCliente]= useState([]);

    //context de pedidos

    const pedidoContext = useContext(PedidoContext)
    const {agregarCliente}= pedidoContext    

    const opcionCliente = async () => {
        const { data } = await axios.get('/cliente', options);
        setStateCliente(data.clientes);
    }


    useEffect(()=>{
        opcionCliente()
        agregarCliente(cliente);
    },[cliente])

const seleccionarCliente = (cliente)=>{
    setCliente(cliente)
}

    return (     
            <>
            <p>1 asignar cliente</p>
            <Select
            options = {stateCliente}
            //isMulti={true}
            onChange={opcion=>seleccionarCliente(opcion)}
            getOptionValue={opciones=>opciones.id}
            getOptionLabel={opciones=>opciones.nombre}
            placeholder='seleccionar cliente'
            noOptionsMessage={()=>'no hay resultados'}
            />  
            </>

               
    );
};
