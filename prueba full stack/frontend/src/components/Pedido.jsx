import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';


export const Pedido = ({ pedido }) => {
  const {user} = useUser()
  const navigate = useNavigate();
  const { cliente, cantidad, total, estado } = pedido;
  const [loading, setLoading] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const options = { headers: { authorization: "Bearer " + user.token } }
  const [estadoPedido, setEstadoPedido] = useState(estado)
  const [border, setBorder] = useState('')




  const clasePedido = () => {
    if (estadoPedido === 'pendiente') {
      setBorder('border-warning')
    } else if (estadoPedido === 'confirmado') {
      setBorder('border-success')
    } else {
      setBorder('border-danger')
    }
  }
  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido)
    }
    clasePedido()
  }, [estadoPedido])


  const actualizarPedido = async (datos) => {
    try {
      setLoading(true);
      const { data } = await axios.put('pedido/editar/' + pedido._id, datos, options);
      setLoading(false);
      if (!data.ok === true) {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: data.message,
          showConfirmButton: false,
          timer: 3000,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'guardado',
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
      })
      window.location.reload(true)
      navigate('/pedidos')
    } catch (error) {
      setLoading(false);
      navigate('/pedidos')
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("error en actualizar clientes", error.message)
    }
  }

  const cambiarEstadoPedido = (e) => {
    try {
      actualizarPedido({ estado: e })
    } catch (error) {
      console.log(error);
    }
  }

  const borrarPedido = async () => {
    try {
      setLoading(true)
      Swal.fire({
        title: 'estas seguro?',
        text: "esta operacion no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'borrar'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const { data } = await axios.delete('/pedido/eliminar/' + pedido._id, options);
          Swal.fire({
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          })
          setLoading(false)
          window.location.reload(true)
          navigate('/pedidos')
        }
      })
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
      console.log("error en borrar producto", error.message)
    }

  }

  return (<>
    {
      loading ? (<Loading />) :
        <div className={`${border} border-5 border-top row m-3 bg-grey`}>
          <div className='col'>
            <p>cliente: {`${cliente.nombre} ${cliente.apellido}`}</p>
            <p>empresa: {`${cliente.empresa}`}</p>
            {cliente.correo && <p>email: {`${cliente.correo}`}</p>}
            <h4 className='font-ligth'>estado pedido: </h4>
            <select className='form-control mb-2' value={estadoPedido} onChange={e => cambiarEstadoPedido(e.target.value)}>
              <option value="pendiente">pendiente</option>
              <option value="cancelado">cancelado</option>
              <option value="confirmado">confirmado</option>
            </select>
          </div>
          <div className='col'>
            <h4 className='font-ligth'>resumen del pedido</h4>
            {pedido.producto.map((articulo) => (
              <div key={articulo._id}>
                <p className='text-sm'>Producto: {articulo.nombre}</p>
                <p className='text-sm'>Cantidad: {cantidad}</p>
              </div>
            ))}
            <p className='font-ligth'> total a pagar: {total}</p>
            {usuario.roles[0].name === "admin" &&
              <button className='text-sm-center mb-2 inline-block text-white btn btn-danger uppercase fs-6' onClick={e => borrarPedido()} type="submit"><i className="icon ion-md-trash lead m-2"></i>eliminar</button>
            }
          </div>
        </div>
    }</>
  );
};
