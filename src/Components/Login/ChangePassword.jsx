import React, { Component } from "react";
import "../Formulario/Formulario.scss";
import Input from "../Formulario/Input";
import { axiosConfig } from "../../config";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      same_password: "",
      token: props.match.params.token,
      id: props.match.params.id,
      error: false,
      message: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  changePassword = async () => {
    try {
      if (this.state.password !== this.state.same_password)
        throw new Error("Las contraseñas no son iguales");
      const res = await axiosConfig.post(
        `/change-password/${this.state.token}/${this.state.id}`,
        {
          password: this.state.password,
        }
      );
      if (res.code === 200) {
        this.setState({
          error: false,
          message: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        message: error,
      });
    }
  };

  render() {
    return (
      <div className="formulario">
        <div className="form-header">Recuperar Contraseña</div>
        <div className="form-body">
          <Input
            id="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Contraseña "
            type="password"
            value={this.state.password}
          />
          <Input
            id="same_password"
            name="same_password"
            onChange={this.handleChange}
            placeholder="Repetir Contraseña "
            type="password"
            value={this.state.password}
          />
          <button type="button" className="btn" onClick={this.changePassword}>
            Recuperar
          </button>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
