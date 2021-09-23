import React, { Component } from 'react';
import { axiosConfig } from '../../config';
import "../Formulario/Formulario.scss";
import { Link } from 'react-router-dom';
import Input from '../Formulario/Input'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleLogin : props.handleLogin,
        };
        this.data = {
            username: '',
            password: '',
        }
    }

    login = async event => {
        try {
            const res = await axiosConfig.post(`/login`, this.data );
            if(res.data.status === "OK"){
                this.state.handleLogin(true, res.data.token);
            } else {
                //! ERROR
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.data[name] = value;
    }

    render() {
        console.log("Render Login");
        return (
            <div className="formulario">
                <div className="form-header">
                    Iniciar sesión
                </div>
                <div className="form-body">
                    <Input
                        id="username"
                        name="username"
                        onChange={this.handleChange}
                        value = {this.state.username}
                        placeholder="Usuario *"
                    />
                    <Input
                        id="password"
                        name="password"
                        onChange={this.handleChange}
                        value = {this.state.password}
                        placeholder="Contraseña *"
                        type="password"
                    />
                    <button className="btn" onClick={this.login}>Ingresar</button>
                </div>  

                <p><input type="checkbox"/>  Recordarme</p>
                <Link to="/login/recuperarcontrasenia">¿Olvidaste tu contraseña? </Link>
   
              </div>
        )
    }
}

export default Login;