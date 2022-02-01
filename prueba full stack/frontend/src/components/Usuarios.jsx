import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Layout } from './Layout';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'rc-pagination';

export const Usuarios = () => {
  //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const [usuarios, setUsuarios] = useState([]);
  //const [role, setRole] = useState([]);
  const { user, loading } = useUser();
  const options = { headers: { authorization: "Bearer " + usuario.token } }
  const [edit, setEdit] = useState(false);
  const initialState = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    contacto: '',
    roles: '',
    token: '',
    img:'',
    nameImg:'',
    preview:''

  }
  const navigate = useNavigate();
  const listarUsuarios = async () => {
    try {
      const { data } = await axios.get('/usuario', options);
     console.log(data)
      setUsuarios(data.usuarios);
      //setRole(data.rolModel);
    } catch (error) {
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
  return (
    <Layout>
      {loading ? (<Loading />) :

        <div>
          <h4 className='fw-bold'>Productos registrados</h4>
          {/* empieza tabla */}
          <div className="container-fluid">
            <div className="m-3">
              <button className='btn bg-primary text-white' 
              //onClick={() => showModalUser("")}
              >Nuevo Usuario</button>
            </div>
            <table className="table mt-5 table-secondary table-hover"
              //onSubmit={actions}
                          >
              <thead>
                <tr>
                  <th>#</th>
                  <th>avatar</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
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
                      <td> {item.nombre}</td>
                      <td>{item.apellido}</td>
                      <td>{item.email}</td>
                      <td>{item.roles[0].name}</td>
                      <td>{item.contacto}</td>
                      <td>
                        <i className="icon ion-md-trash  lead m-2" 
                       // onClick={() => deleteUser(item._id)}
                        ></i>
                        <i className="icon ion-md-create lead m-2"
                         //onClick={() => ((showModalUser(item), completeDataFields(item)))}
                         ></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* fin tabla*/}          
          </div>
        </div>
      }
    </Layout>
  );
};