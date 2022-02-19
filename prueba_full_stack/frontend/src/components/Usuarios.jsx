import React, { useEffect, useState, } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Layout } from './Layout';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Usuarios = () => {
  //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const [usuarios, setUsuarios] = useState([]);
  const { user} = useUser();
  const [loading, setLoading]=useState(false)
  const options = { headers: { authorization: "Bearer " + user.token } }
  const navigate = useNavigate();


  const listarUsuarios = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/usuario', options);
      setLoading(false)
      setUsuarios(data.usuarios);
   } catch (error) {
     setLoading(false)
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('error en listarUsuarios', error.message);
    }
  }

  useEffect(() => {
    listarUsuarios()
    // eslint-disable-next-line
  }, []);

const borrarUsuario = async (id)=>{
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
      setLoading(false)
      if (result.isConfirmed) {
        const { data } = await axios.delete('/usuario/borrar/' + id, options);
         listarUsuarios();
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

const actualizarUsuario = async (id)=>{
  try {
    navigate("/accionusuario/" + id);
    
  } catch (error) {
    if (!error.response.data.ok) {
      return Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log("error en actualizar producto", error.message)  
  }
}
  return (
    <Layout>
      {loading ? (<Loading />) :
        <div>
          <h4 className='fw-bold'>Administrador de Usuarios/Usuarios Registrados</h4>
          <>
         {(usuario.roles[0].name === "admin"|| usuario.roles[0].name === "THumano") ?
        
      (    <div className="container-fluid">
          <NavLink className='btn bg-primary text-white' to="/accionusuario/ ">Nuevo Usuario</NavLink>{" "}
            <table className="table mt-5 table-secondary table-hover table-striped shadow-lg rounded  "
              //onSubmit={actions}
                          >
              <thead >
                <tr>
                  <th scope="col">#</th>
                  <th>avatar</th>
                  <th>Nombre y Apellido</th>                  
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Contacto</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td ><img className="img img-thumbnail rounded" width="120" heigth="120" src={item.img} alt="img" /></td>
                      <td> {item.nombre+' '+item.apellido}</td>
                      <td>{item.email}</td>
                      <td>{item.roles[0].name}</td>
                      <td>{item.contacto}</td>
                      <td>
                        <i className="icon ion-md-trash  lead m-2" 
                       onClick={() => borrarUsuario(item._id)}
                        ></i>
                        <i className="icon ion-md-create lead m-2"
                         onClick={() => actualizarUsuario(item._id)}
                         ></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* fin tabla*/}          
          </div>):          
          <div> 
            <h2>usted no tiene acceso a este modulo</h2>
          </div>}</>
        </div>
      }
    </Layout>
  );
};