import axios from 'axios';
import React, { useState, PureComponent, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Layout } from './Layout';
import { Loading } from './Loading';


export const MejoresClientes = () => {
  const {user} = useUser()
    const [loading,setLoading]= useState(false)
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const [datos, setDatos]= useState([])
    const clienteGrafica = []
    const navigate = useNavigate()




    const mejorCliente = useCallback (async()=>{

        try {
            setLoading(true);
            const { data } = await axios.get('pedido/cliente/', options);
            setLoading(false);
            setDatos(data)         

        } catch (error) {
          setLoading(false)
          if (!error.response.data.ok) {
            return Swal.fire({
              icon: 'error',
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500,
            });
          }

           console.log("error en mejores vendedores", error.message)
         }        
    },[])

    useEffect(() => {
      mejorCliente()     
  }, []);

    const {clientes}= datos


clientes !== undefined && clientes.map((cliente,index) =>{
  clienteGrafica[index]=
  {
      ...cliente.cliente[0],
      total:cliente.total
  }
})


  return (
    <Layout>
    {loading ? (<Loading />) :
  <div>
      <h4 className='fw-bold'>Mejores Clientes</h4>
      <BarChart
      className='m-5'
          width={500}
          height={300}
          data={clienteGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" />
         
        </BarChart>

  </div>}
    </Layout>
    );
};
