import React, { Component } from 'react';
import "../Formulario/Formulario.scss";
import Input from '../Formulario/Input'
import axios from 'axios';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false,
            message: '',
        };
    }

    resetPassword = async () => {
        if (this.state.email === 'No se encuentra la dirección de mail') {
            this.setState({
                error: false,
                message: '',
            });
        } else {
            axios.post(`/reset-password/`, {
                email: this.state.email,
            }).then( res => {
                console.log(res.data);
                if (res.data === '') {
                    this.setState({
                        error: true,
                        message: res.message,
                    });
                } else if (res.message === "Correo de Recuperacion Mandado") {
                    this.setState({
                        error: false,
                        message: res.message
                    });
                }
            }).catch(error =>{
                console.log(error.data)
            });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }


    render() {
        return (
            <div className="formulario">
                <div className="form-header">Recuperar Contraseña</div>
                <div className="form-body">
                    <Input
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Email "
                        value={this.state.email}
                    />
                    <button type="button" className="btn" onClick={this.resetPassword}>Recuperar</button>
                </div>
            </div>
        )
    }
}


export default ResetPassword;