import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Layout } from './Layout';
import { Loading } from './Loading';
import { AsignarCliente } from './pedidos/AsignarCliente';
import { AsignarProductos } from './pedidos/AsignarProductos';
import { ResumenPedido } from './pedidos/ResumenPedido';
import { Total } from './pedidos/Total';
//context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

export const ActionsPedidos = () => {

    const pedidoContext = useContext(PedidoContext);
    const { user } = useUser();
    //verificar por que user primero carga vacio luego carga con el cliente lo cual hace que no se autentique correctamente
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const navigate = useNavigate();
    const { id } = useParams();
    const pedidoInicial = {
        id: '',
        producto: '',
        usuario: '',
        cliente: '',
        total: '',
        estado: '',
        cantidad: '',
        factura: ''
    }
    const [statePedido, setStatePedido] = useState(pedidoInicial);
    const [uploadState, setUploadState] = useState(0);
    const [loading, setLoading] = useState(false);
    const { cliente, productos, total } = pedidoContext

    const option = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            let percent = parseInt((loaded * 100) / total);
            setUploadState(percent);
        }
    }

    useEffect(() => {
        const listarPedidoId = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('pedido/pedido/' + id, options, option);
                setLoading(false)
                setStatePedido({ ...statePedido, producto: data.pedido.producto, total: data.pedido.total, factura: data.pedido.factura, usuario: data.pedido.usuario, cliente: data.pedido.cliente, cantidad: data.pedido.cantidad, total: data.pedido.total, estado: data.pedido.estado, })
            } catch (error) {
                setLoading(false);
                if (!error.response.data.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
                console.log("error en listarpedidoId", error.message)
            }
        };
        id ? listarPedidoId() : setStatePedido(pedidoInicial)
        // eslint-disable-next-line
    }, [id]);

    //funciona no tocar 
    const guardarPedido = async (datos) => {
        try {
            const pedidos = productos.map(({ ...producto }) => producto)
            datos = ({ ...datos, cliente: cliente._id, producto: pedidos[0], cantidad: pedidos[0].cantidad, total: total, estado: "pendiente", usuario: usuario.id })
            setLoading(true);
            const { data } = await axios.post('pedido/crear', datos, options , option);
            setLoading(false);
            data.ok && Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: 'el pedido ha sido generado con exito',
                showConfirmButton: false,
                timer: 1500,
            });
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
            console.log("error en guardar cliente ", error.message)
        }

    }

    const actualizarPedido = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.put('cliente/actualizar/' + id, datos, options , option);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
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

    const action = (e) => {
        e.preventDefault()
        id ?
            actualizarPedido((statePedido)) :
            guardarPedido((statePedido));
    }

    const validarBoton = () => {
        return  (productos.length === 0 || total === 0 || cliente.length === 0 ? " disabled " : "")
    }
    
    return (
        <>
            <Layout>
                <>
                    {
                        loading ? (<Loading />) : <>
                            <h4 className='fw-bold'>Administrador de Pedidos/crear Pedidos</h4>
                            <div className="container mt-5 mb-5" >
                                <div className='row'>
                                    <div className='col-lg-2'></div>
                                    <div className="col md-6">
                                        <div className="card bg-grey">
                                            <h2 className='fw-bold text-center text-primary'>Crear Pedidos</h2>
                                            <div className="card-body">
                                                <form onSubmit={action}>
                                                    {!id && <div className="mb-3">
                                                        <div className="row g-2">
                                                            <AsignarCliente></AsignarCliente>
                                                            <AsignarProductos></AsignarProductos>
                                                            <ResumenPedido></ResumenPedido>
                                                            <Total></Total>
                                                        </div>
                                                    </div>}
                                                    <div className="mb-3">
                                                        <a className={`btn btn-primary m-2  ${validarBoton()}`} type="submit" onClick={e => (action(e))} >guardar
                                                        </a>
                                                        <Link className="btn btn-danger m-2" to='/pedidos'>cancelar
                                                        </Link>
                                                    </div>
                                                </form>
                                                {
                                                    loading && (<div className="progress">
                                                        <div className="progress-bar bg-primary"
                                                            role="progressbar"
                                                            style={{ width: `${uploadState}%` }}>
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-2'></div>
                                </div>
                            </div>
                        </>
                    }
                </>
            </Layout>
        </>
    )
}
