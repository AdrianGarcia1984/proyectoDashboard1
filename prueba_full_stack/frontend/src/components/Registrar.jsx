import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';


export const Registrar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contacto: "",
        password: "",
        img: '',
        nameImg: '',
        preview:''
    });
    //extraer del usercontext
    const { loading, registerUser } = useUser();

    //funcion register
    const register = (e) => {
        e.preventDefault();
        const ok = true
        registerUser(userData, navigate, ok);
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
                setUserData({ ...userData, img: "", preview: "" })
            } else {
                setUserData({ ...userData, img: imagen, preview: URL.createObjectURL(imagen) })
            }
        }
    }

    return (

        <>
            {loading ? <Loading /> :
            <div id='content'>

                <section className="container mt-5 mb-5 mx-auto col-4-md-5 d-flex">
                    <div className="card mx-auto card-login">
                        <div className="card-body">
                            <h4 className="card-title mb-4">crear una cuenta</h4>
                            <form className="form-card" onSubmit={register}>
                                {/* input foto avatar */}

                                <div className="mb-3">
                                    <label className="form-label">foto de perfil</label>
                                    <input type="file" className="form-control" onChange={(e) => validarFormato(e)} />

                                </div>
                                {/* input nombre */}
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input className="form-control" placeholder="tu nombre" type="text" required autoFocus onChange={e => setUserData({ ...userData, nombre: e.target.value })} value={userData.nombre} />
                                </div>
                                {/* imput apellido */}
                                <div className="mb-3">
                                    <label className="form-label">apellido</label>
                                    <input className="form-control" placeholder="tu apellido" type="text" required onChange={e => setUserData({ ...userData, apellido: e.target.value })} value={userData.apellido} />
                                </div>
                                {/* imput contacto */}
                                <div className="mb-3">
                                    <label className="form-label">contacto</label>
                                    <input className="form-control" placeholder="tu contacto" type="number" required onChange={e => setUserData({ ...userData, contacto: e.target.value })} value={userData.contacto} />
                                </div>
                                {/* imput email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" placeholder="tu email" type="email" required onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                                </div>
                                {/* imput password */}
                                <div className="mb-3">
                                    <label className="form-label">password</label>
                                    <input className="form-control" placeholder="Password" type="password" required onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                                </div>
                                {/* <!-- form-group// --> */}
                                <div className="mb-3">
                                    <p className="small text-center text-muted">Al ingresar al sitio, estas deacuerdo con las politicas de privacidad de la empresa.</p>
                                </div>
                                {/* boton registrar */}
                                <div className="mb-4">
                                    <button type="submit" className="btn btn-dark w-100 "> registrarse </button>
                                </div>
                                {/* <!-- form-group// --> */}
                            </form>

                            <br />
                            <p className="text-center mb-2">ya estas registrado <a href="/">ingresar</a></p>
                        </div>
                    </div>
                </section>
                </div>
            }</>
    )
}