import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { formData } from '../helpers/FormData';
import { Layout } from './Layout';
import { Loading } from './Loading';

export const ActionsClientes = () => {
    const { user } = useUser();
    //verificar por que user primero carga vacio luego carga con el cliente lo cual hace que no se autentique correctamente
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const navigate = useNavigate();
    const { id } = useParams();
    const clienteInicial = {
        id: '',
        nombre: '',
        apellido: '',
        correo: '',
        contacto: '',
        empresa: '',        
    }

    const [stateCliente, setStateCliente] = useState(clienteInicial);
    const [uploadState, setUploadState] = useState(0);
    const [loading, setLoading] = useState(false);


    const option = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            let percent = parseInt((loaded * 100) / total);
            setUploadState(percent);
        }
    }

    useEffect(() => {
        const listarClienteId = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('cliente/clienteid/' + id, options, option);
                setStateCliente({ ...stateCliente, nombre: data.cliente.nombre, apellido: data.cliente.apellido, contacto: data.cliente.contacto, correo: data.cliente.correo, empresa: data.cliente.empresa, })
                setLoading(false)

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
                console.log("error en listarClienteId", error.message)
            }
        };

        id ? listarClienteId() : setStateCliente(clienteInicial)
        // eslint-disable-next-line
    }, [id]);   

    const guardarCliente = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/cliente/registrar', datos, options , option);
            setLoading(false);
            data.ok && Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: 'el cliente ha sido guardado',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/clientes')
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
            console.log("error en guardar cliente", error.message)
        }
    }

    const actualizarCliente = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.put('cliente/actualizar/' + id, datos, options, option);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/clientes')
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
            console.log("error en actualizar clientes", error.message)
        }

    }
    const action = (e) => {
        e.preventDefault()
        id ?
            actualizarCliente((stateCliente)) :
            guardarCliente((stateCliente));
    }


    const ChangeInput = (e) => {
        setStateCliente({
            ...stateCliente, [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <Layout>
                <>
                    {
                        loading ? (<Loading />) : <>
                        {id ? <h4 className='fw-bold'>Administrador de Clientes/Editar Clientes</h4> : <h4 className='fw-bold'>Administrador de Clientes/crear Clientes</h4>}
                            <div className="container mt-5 mb-5" >
                                <div className='row'>
                                    <div className='col-lg-2'></div>
                                    <div className="col md-6">
                                        <div className="card bg-grey">
                                            {id ? <h2 className='fw-bold text-center text-primary'>Editar Clientes</h2> : <h2 className='fw-bold text-center text-primary'>Crear Clientes</h2>}
                                            
                                            <div className="card-body">
                                                <form onSubmit={action}>
                                                    <div className="mb-3">
                                                        <label className="form-label"> nombre</label>
                                                        <input type="text" className="form-control" required value={stateCliente.nombre} name="nombre" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">apellido</label>
                                                        <input type="text" className="form-control" value={stateCliente.apellido} name="apellido" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> correo</label>
                                                        <input type="text" className="form-control" required value={stateCliente.correo} name="correo" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> contacto</label>
                                                        <input type="text" className="form-control" required value={stateCliente.contacto} name="contacto" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> empresa</label>
                                                        <input type="text" className="form-control" required value={stateCliente.empresa} name="empresa" onChange={(e) => ChangeInput(e)} />
                                                    </div>                                                   
                                                    <div className="mb-3">
                                                        <a className="btn btn-primary m-2" type="submit" onClick={e=>(action(e))}>guardar
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
