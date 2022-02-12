import axios from 'axios';
import { useUser } from '../context/UserContext';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { formData } from '../helpers/FormData';
import { Layout } from './Layout';
import { Loading } from './Loading';

export const ActionsUsuarios = () => {
    const { user } = useUser();
    //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const navigate = useNavigate();
    const { id } = useParams();
    const usuarioInicial = {
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        contacto: '',
        roles: '',
        token: '',
        img: '',
        nameImg: '',
        preview: ''
    }
    const [stateUsuario, setStateUsuario] = useState(usuarioInicial);
    const [uploadState, setUploadState] = useState(0);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState([]);

    const option = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            let percent = parseInt((loaded * 100) / total);
            setUploadState(percent);
        }
    }


    useEffect(() => {
        const listarUsuarioId = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('usuario/listar/' + id, options, option);

                setLoading(false)
                setStateUsuario({ ...stateUsuario, nombre: data.usuario.nombre, apellido: data.usuario.apellido, contacto: data.usuario.contacto, email: data.usuario.email, roles: data.usuario.roles[0].name, preview: data.img })


            } catch (error) {
                setLoading(false);
                navigate('/usuarios')
                if (!error.response.data.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });    
                }
                console.log("error en listarUsuarioId", error.message)
            }
        };
        opcionRoles()
        id ? listarUsuarioId() : setStateUsuario(usuarioInicial)
        // eslint-disable-next-line
    }, [id]);


    const opcionRoles = async () => {
        const { data } = await axios.get('/usuario', options);
        setRole(data.rolModel);

    }

    const action = (e) => {
        e.preventDefault()
        id ?
            actualizarUsuario(formData(stateUsuario)) :
            guardarUsuario(formData(stateUsuario));
    }

    const guardarUsuario = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/usuario/registrar', datos, options);
            setLoading(false);
            data.ok && Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: 'el usuario ha sido guardado',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/usuarios')
        } catch (error) {
            setLoading(false);
                navigate('/usuarios')
                if (!error.response.data.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });    
                }
            console.log("error en guardar usuario", error.message)
        }

    }

    const actualizarUsuario = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.put('usuario/actualizar/' + id, datos, options);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/usuarios')
        } catch (error) {
            setLoading(false);
            navigate('/usuarios')
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });

            }
            console.log("error en actualizar usuarios", error.message)
        }

    }

    const validarFormato = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imagen = e.target.files[0];
            if (!/\.(jpeg|jpg|png|svg|SVG|PNG|JPG|JPEG)$/i.test(imagen.name)) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'el archivo no es un tipo de archivo valido',
                })
                e.target.value = '';
                setStateUsuario({ ...stateUsuario, img: "", preview: "" })
            } else {
                setStateUsuario({ ...stateUsuario, img: imagen, preview: URL.createObjectURL(imagen) })              
            }
        }
    }

    const ChangeInput = (e) => {
        setStateUsuario({
            ...stateUsuario, [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <Layout>
                <>
                    {
                        loading ? (<Loading />) : <>
                            {id ? <h4 className='fw-bold'>Administrador de Usuarios/Editar Usuario</h4> : <h4 className='fw-bold'>Administrador de Usuarios/crear Usuario</h4>}
                            <div className="container mt-5 mb-5" >
                                <div className='row'>
                                    <div className='col-lg-2'></div>
                                    <div className="col md-6">
                                        <div className="card bg-grey">
                                            {id ? <h2 className='fw-bold text-center text-primary'>Editar Usuario</h2> : <h2 className='fw-bold text-center text-primary'>Crear Usuario</h2>}
                                            {/* previsualizar la imagen */}
                                            {
                                                stateUsuario.preview !== '' && (<img src={stateUsuario.preview} className="card-img-top" alt="prev"></img>)
                                            }
                                            <div className="card-body">
                                                <form onSubmit={action}>
                                                    <div className="mb-3">
                                                        <label className="form-label"> nombre</label>
                                                        <input type="text" className="form-control" required value={stateUsuario.nombre} name="nombre" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">apellido</label>
                                                        <input type="text" className="form-control" value={stateUsuario.apellido} name="apellido" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> email</label>
                                                        <input type="text" className="form-control" required value={stateUsuario.email} name="email" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> contacto</label>
                                                        <input type="text" className="form-control" value={stateUsuario.contacto} name="contacto" onChange={(e) => ChangeInput(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label"> roles</label>
                                                        <select name="roles" className='form-control'
                                                         value={stateUsuario.roles}
                                                            onChange={(e) => ChangeInput(e)}>
                                                            {role.map((elemento) => (<option key={elemento._id} value={elemento.name}>{elemento.name}
                                                            </option>))}
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                    <label className="form-label"> avatar</label>
                                                        <input type="file" className="form-control" onChange={(e) => validarFormato(e)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <a className="btn btn-primary m-2" type="submit" onClick={e => (action(e))}>guardar
                                                        </a>
                                                        <Link className="btn btn-danger m-2" to='/usuarios'>cancelar
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
