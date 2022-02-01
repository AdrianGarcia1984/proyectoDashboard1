import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext, useEffect, useState, useContext } from "react";


const UserContext = createContext();
//estado inicial para el usuario
const initialState = { login: false, token: "", nombre: "", id: "" };

export const UserProvider = (props) => {
    //inicializar estados
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(false);
   
    //loginUser para iniciar sesion
    //(user para capturar datos de usuario, history para mover lo del usuario)

    const loginUser = async (user, navigate) => {
        try {
            setLoading(true);
            const { data } = await axios.post("usuario/login", user);
            setLoading(false);
            if (data.ok) {
                const userLogin = {
                    login: true,
                    id: data._id,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    contacto:data.contacto,
                    roles:data.roles,
                    token: data.token,
                    img:data.img,
                    nameImg:data.nameImg,
                    preview:data.preview

                }
               // console.log(data);
                localStorage.setItem('usuario', JSON.stringify(userLogin));
                setUser(userLogin);
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //navigate para mover al usuario por las rutas  
                //console.log(userLogin.roles[0].name);              
                (userLogin.roles[0].name==='admin') && navigate('/productos');
                (userLogin.roles[0].name==='vendedor') && navigate('/clientes');
                (userLogin.roles[0].name==='bodega') && navigate('/productos');
                (userLogin.roles[0].name==='THumano') && navigate('/usuarios');
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error en loginUser, ', error.message);
        }

    };

     //si se cierra el navegador para que se vuelva a autologuear usando useEfect
     useEffect(() => {
        const initial = JSON.parse(localStorage.getItem("usuario"))
        //console.log(initial);
        initial ? initial.login && setUser(initial) : setUser(initialState);
    }, []);

    //registerUser para registrar nuevo usuario
    //user para capturar dato de usuario, history para mover lo del usuario

    const registerUser = async (user, navigate, ok) => {
        try {
            setLoading(true);
            const { data } = await axios.post('usuario/registrar', user);
            setLoading(false);
            console.log(data);
            //lo comentado es cuando tengamos la pagina de registro y crear usuario
           // if (ok){
                if (data.ok) {
                    const userLogin = {
                        login: true,
                        id: data._id,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        email: data.email,
                        contacto:data.contacto,
                        roles:data.roles,
                        token: data.token,
                        
                    }
                    //console.log(userLogin)
                    localStorage.setItem('usuario', JSON.stringify(userLogin));
                    setUser(userLogin);
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    //navigate para mover al usuario por las rutas
                    navigate("/pedidos");
           // }else{
                // Swal.fire({
                //     icon: 'success',
                //     title: data.message,
                //     showConfirmButton: false,
                //     timer: 1500,
                // });
                // //navigate para mover al usuario por las rutas
                //     navigate("/homeuser");
            //}
               
            }

        } catch (error) {
            setLoading(false);
      
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error en registerUser', error.message);

        }
    }

    //cerrar sesion
    const exit = () => {
        setUser(initialState);
        localStorage.removeItem('user');
    }

    const value = {
        user,
        loginUser,
        registerUser,
        exit,
        loading,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser error");

    }
    return context;
}
