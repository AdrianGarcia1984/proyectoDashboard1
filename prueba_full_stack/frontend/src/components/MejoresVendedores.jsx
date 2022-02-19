import axios from 'axios';
import React, { useState, PureComponent, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Swal from 'sweetalert2';
import { Layout } from './Layout';
import { Loading } from './Loading';
import { useUser } from '../context/UserContext';

export const MejoresVendedores = () => {
  const {user} = useUser()
    const [loading,setLoading]= useState(false)
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const [datos, setDatos]= useState([])
    const vendedorGrafica = []


    useEffect(() => {
      mejorVendedor()     
  }, []);

    const mejorVendedor = useCallback (async()=>{
        try {
            setLoading(true);
            const { data } = await axios.get('pedido/vendedor/', options);
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

   
    const {vendedores}= datos

vendedores !== undefined && vendedores.map((vendedor,index) =>{
  vendedorGrafica[index]=
  {
      ...vendedor.vendedor[0],
      total:vendedor.total
  }
})
      

  return (
    <Layout>
    {loading ? (<Loading />) :
  <div>
      <h4 className='fw-bold'>Mejores Vendedores</h4>
      <BarChart
      className='m-5'
          width={500}
          height={300}
          data={vendedorGrafica}
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
