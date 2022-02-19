import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from './Layout';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import axios from 'axios';
import Swal from 'sweetalert2';


export const Clientes = () => {
    //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const [clientes, setClientes] = useState([]);
    const { user } = useUser();
    const options = { headers: { authorization: "Bearer " + user.token } }
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const listarClientes = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/cliente', options);
            setClientes(data.clientes);
            setLoading(false)
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
            console.log('error en listarClientes', error.message);
        }
    }

    useEffect(() => {
        listarClientes()
        // eslint-disable-next-line
    }, []);

    const actualizarCliente = (id) => {
        try {
            navigate("/accioncliente/" + id);
        } catch (error) {
            navigate('/clientes')
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log("error en actualizar cliente", error.message)
        }
    }

    const borrarCliente = async (id) => {
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
                    const { data } = await axios.delete('/cliente/borrar/' + id, options);
                    setLoading(false)
                    listarClientes();
                    Swal.fire({
                        text: data.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            })
        } catch (error) {
            setLoading(false)
            navigate('/clientes')
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log("error en borrar producto", error.message)
        }
    }

    return (
        <Layout>
            {loading ? (<Loading />) :
                <div>

                    <h4 className='fw-bold'>Administrador de Clientes</h4>
                    <>
                        {(usuario.roles[0].name === "admin" || usuario.roles[0].name === "THumano" || usuario.roles[0].name === "vendedor") ?
                            <div className='container-fluid'>
                                <Link className='btn bg-primary text-white' to="/accioncliente/ ">nuevo cliente</Link>{" "}
                                <table className='table mt-5 table-secondary table-hover align-middle shadow-lg rounded table-striped '>
                                    <thead>
                                        <tr>
                                            <th scope="col" >#</th>
                                            <th>Nombre y Apellido</th>
                                            <th>Correo</th>
                                            <th>Contacto</th>
                                            <th>Empresa</th>
                                            <th>Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes.map((item, i) => (
                                            <tr key={item._id}>
                                                <td>{i + 1}</td>
                                                <td>{item.nombre + ' ' + item.apellido}</td>
                                                <td>{item.correo}</td>
                                                <td>{item.contacto}</td>
                                                <td>{item.empresa}</td>
                                                <td><i className="icon ion-md-trash  lead m-2"
                                                    onClick={() => borrarCliente(item._id)}
                                                ></i>
                                                    <i className="icon ion-md-create lead m-2"
                                                        onClick={() => actualizarCliente(item._id)}
                                                    ></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> :
                            <div>
                                <h2>usted no tiene acceso a este modulo</h2>
                            </div>}</>
                </div>
            }
        </Layout>
    );
};