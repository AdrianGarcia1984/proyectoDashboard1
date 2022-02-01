import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Layout } from './Layout';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'rc-pagination';


export const Productos = () => {
  const { user } = useUser();
  //verificar por que user primero carga vacio luego carga con el usuario lo cual hace que no se autentique correctamente
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  //console.log(usuario);
  const [productList, setProductList] = useState([]);
  const options = { headers: { authorization: "Bearer " + usuario.token } }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");

  //console.log(options);
  const listarProductos = useCallback(async (pageCurrent) => {
    try {
      console.log(pageCurrent);
      setLoading(true);
      const { data } = await axios.get(`producto/listarproducto/?page=${pageCurrent}`, options);
      setLoading(false);
      //console.log(data.productos.page);
      if (data.productos.docs.length > 0) {
        setProductList(data.productos.docs);
        setPage(data.productos.page);
        setTotalPage(data.productos.totalPages)
        //setHasProduct(false);
        //console.log(productList )

      } else {
        setLoading(false);
        setProductList([]);
        //cambiar a true cuando meta productos
        // setHasProduct(true);
      }
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('error en  listarProductos', error.message);
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    listarProductos(page);
  }, [listarProductos, page])

  const onchangePage = (page) => {
    listarProductos(page);
  }

  const actualizarProducto = (id) => {
    console.log(id);
    navigate("/accionproducto/" + id);
  }

  const borrarProducto = async (id) => {
    try {
      console.log(id);
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
          const { data } = await axios.delete('/producto/borrar/' + id, options);
          listarProductos();
          Swal.fire({
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          })
        }
      })
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log("error en borrar producto", error.message)
    }
  }


  return (
    <Layout>
      {loading ? (<Loading />) :
        <div>
          {/* empieza tabla */}
          <h4 className='fw-bold'>Productos registrados</h4>
          <div className="container-fluid">
           
            <Link className='btn bg-primary text-white' to="/accionproducto/ ">nuevo producto</Link>{" "}
            <table className="table mt-5 table-secondary table-hover align-middle table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th >Imagen</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Usuario</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {
                  productList.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td ><img className="img img-thumbnail rounded" width="120" heigth="120" src={item.img} alt="img" /></td>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.precio}</td>
                      <td>{item.stock} </td>
                      <td>{item.usuario.nombre}</td>
                      <td>
                        <i className="icon ion-md-trash  lead m-2"
                          onClick={() => borrarProducto(item._id)}
                        ></i>
                        <i className="icon ion-md-create lead m-2"
                          onClick={() => (actualizarProducto(item._id))}
                        ></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* fin tabla*/}

            <div className="my-5 d-flex justify-content-center">
              <Pagination
                className="pagination"
                current={page}
                total={totalPage}
                pageSize={1}
                onChange={onchangePage}
              />
            </div>

          </div>
        </div>
      }

    </Layout>
  );
};
