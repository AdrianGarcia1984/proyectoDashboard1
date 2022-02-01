import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { Loading } from './Loading';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('adrian@gmail.com');
    const [password, setPassword] = useState('1234');
    //extraer del usercontext
    const { loading, loginUser } = useUser();

    const login = (e) => {
        e.preventDefault();
        const user = { email, password };
        //console.log(user);
        loginUser(user, navigate);
    }

    return (<>
        {loading ? <Loading /> :
                           <section className="container m-5 mb-5 mx-auto col-4-md-5 d-flex bg-gray">
                           <div className="card mx-auto card-login">
                               <div className="card-body">
                                   <h4 className="card-title mb-4">ingresar</h4>
                                   <form className="form-card" onSubmit={login}>
                                       <div className="mb-3">
                                           {/* imput email */}
                                           <label className="form-label">Email</label>
                                           <input className="form-control" placeholder="Your email" type="email" required autoFocus onChange={e => setEmail(e.target.value)} value={email} />
                                       </div>
                                       {/* <!-- form-group// --> */}
                                       <div className="mb-3">
                                           <label className="form-label">password</label>
                                           <input className="form-control" placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} value={password} />
                                       </div>
                                       {/* <!-- form-group// --> */}
                                       <div className="mb-3">
                                           <p className="small text-center text-muted">Al ingresar al sitio, estas deacuerdo con las politicas de privacidad de la empresa.</p>
                                       </div>
                                       {/* <!-- form-group  .// --> */}
                                       <div className="mb-4">
                                           <button type="submit" className="btn btn-dark w-100 "> Ingresar </button>
                                       </div>
                                       {/* <!-- form-group// --> */}
                                   </form>
       
                                   <br />
                                   <p className="text-center mb-2">no tienes cuenta? <a href="/registrar">crear cuenta</a></p>
                               </div>
                           </div>
                       </section>
        }
    </>
    );
};
