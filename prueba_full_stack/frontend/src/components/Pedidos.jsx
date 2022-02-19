import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Layout } from './Layout';
import { Loading } from './Loading';
import { Pedido } from './Pedido';


export const Pedidos = () => {
  //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
  const { user } = useUser();
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const [pedidos, setPedidos] = useState([]);
  const options = { headers: { authorization: "Bearer " + user.token } }
  const [loading, setLoading]= useState(false)

  const listarPedidos = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/pedido', options);
      setLoading(false)
      setPedidos(data.pedidos);
         } catch (error) {
      if (!error.response.data.ok) {
        setLoading(false)
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false)
      console.log('error en listar Pedidos', error.message);
    }
  }

  useEffect(() => {
    listarPedidos()
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {loading ? (<Loading />) :
        <div>
          <h4 className='fw-bold'>Administrador de Pedidos</h4>
          {/* empieza tabla */}
          <>
         {(usuario.roles[0].name === "admin"|| usuario.roles[0].name === "vendedor") ?
          <div className="container-fluid">
            <Link className='btn bg-primary text-white' to="/accionpedido ">Crear pedido</Link>
            <br />
            <div >
              {pedidos.map((pedido) => (
                <>
                 <Pedido  key={pedido._id} pedido={pedido}/>
                </>
              ))}
            </div >
          </div>:<div> 
            <h2>usted no tiene acceso a este modulo</h2>
          </div>
          }</>
        </div>
      }
    </Layout>
  );
};
