import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { formData } from '../helpers/FormData';
import { Layout } from './Layout';
import { Loading } from './Loading';

export const ActionsProductos = (props) => {

    const { user } = useUser();
    //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const options = { headers: { authorization: "Bearer " + user.token } }
    const navigate = useNavigate();
    const { id } = useParams();   
    const productoInicial = {
        id:'',
        nombre: "",
        descripcion: "",
        img: "",
        preview: "",
        usuario: "",
        precio: "",
        stock: "",
    }
    const [stateProducto, setStateProducto] = useState(productoInicial);
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
        const listarProductoId = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('producto/listarproductoid/' + id, options,option);
                setLoading(false)
                setStateProducto({ ...stateProducto, nombre: data.producto.nombre, descripcion: data.producto.descripcion, precio: data.producto.precio, stock: data.producto.stock, usuario: data.producto.usuario.nombre, preview: data.img })

            } catch (error) {
                setLoading(false);
                navigate('/productos')
                if (!error.response.data.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
    
                }
                console.log("error en listarProductoId", error.message)
            }
        };
        id ? listarProductoId() : setStateProducto(productoInicial)
        // eslint-disable-next-line
    }, [id]);

    const action = (e) => {
        e.preventDefault()
        stateProducto.usuario = user.id
        id ?
            actualizarProducto(formData(stateProducto)) :
            guardarProducto(formData(stateProducto));
    }

    const guardarProducto = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/producto/crearproducto', datos, options, option);
            setLoading(false);
            data.ok && Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: 'el archivo ha sido guardado',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/productos')
        } catch (error) {
            setLoading(false);
                navigate('/productos')
                if (!error.response.data.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });    
                }
            console.log("error en post savePost", error.message)
        }

    }

    const actualizarProducto = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.put('producto/actualizar/' + id, datos, options, option);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/productos')
        } catch (error) {
            setLoading(false);
            navigate('/productos')
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log("error en updatePost", error.message)
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
                setStateProducto({ ...stateProducto, img: "", preview: "" })
            } else {
                setStateProducto({ ...stateProducto, img: imagen, preview: URL.createObjectURL(imagen) })
            }
        }
    }

    const ChangeInput = (e) => {
        setStateProducto({
            ...stateProducto, [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <Layout>
                <>
                    {
                        loading ? (<Loading />) : <>                            
                            <div className="container d-flex mt-5 mb-5" >
                                <div className="col md-6">
                                    <div className="card bg-grey">
                                {id ? <h2 className='fw-bold text-center text-primary'>editar producto</h2> : <h2 className='fw-bold text-center text-primary'>crear producto</h2>}
                                        {/* previsualizar la imagen */}
                                        {
                                            stateProducto.preview !== '' && (<img src={stateProducto.preview} className="card-img-top" alt="prev"></img>)
                                        }
                                        <div className="card-body">
                                            <form onSubmit={action}>
                                                <div className="mb-3">
                                                    <label className="form-label"> nombre</label>
                                                    <input type="text" className="form-control" required value={stateProducto.nombre} name="nombre" onChange={(e) => ChangeInput(e)} />

                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">descripcion</label>
                                                    <input type="text" className="form-control" value={stateProducto.descripcion} name="descripcion" onChange={(e) => ChangeInput(e)} />

                                                </div>
                                                <>
                                                    {
                                                        id ?
                                                            <div className="mb-3">
                                                                <label for="disabledTextInput" className="form-label" >usuario</label>
                                                                <input id="disabledTextInput" type="text" className="form-control" value={stateProducto.usuario} name="usuario" onChange={(e) => ChangeInput(e)} />

                                                            </div>
                                                            :
                                                            <div className="mb-3">
                                                                <label for="disabledTextInput" className="form-label disabled" >usuario</label>
                                                                <input id="disabledTextInput" type="text" className="form-control disabled" value={user.nombre} name="usuario" onChange={(e) => ChangeInput(e)} />

                                                            </div>
                                                    }
                                                </>
                                                <div className="mb-3">
                                                    <label className="form-label">precio</label>
                                                    <input type="text" className="form-control" value={stateProducto.precio} name="precio" onChange={(e) => ChangeInput(e)} />

                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">stock</label>
                                                    <input type="text" className="form-control" value={stateProducto.stock} name="stock" onChange={(e) => ChangeInput(e)} />

                                                </div>
                                                <div className="mb-3">
                                                    <input type="file" className="form-control" onChange={(e) => validarFormato(e)} />

                                                </div>
                                                <div className="mb-3">
                                                        <a className="btn btn-primary m-2" type="submit" onClick={e=>(action(e))}>guardar
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
                            </div>
                        </>
                    }

                </>
            </Layout>

        </>
    )
}
