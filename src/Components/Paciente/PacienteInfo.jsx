import React, { Component } from 'react';
import { axiosConfig } from '../../config';
import "../Formulario/Formulario.scss";
import moment from '../../Utils/Moment';

class PacienteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apellido: "",
            direccion: "",
            documento: "",
            doc_tipo: '',
            doc_numero: '',
            email: "",
            fecha_nacimiento: "",
            id_obra_social: "",
            id_paciente: "",
            id_usuario: "",
            nombre: "",
            numero_afiliado: "",
            obra_social: "",
            tel_tipo: '',
            tel_numero: '',
            username: ""
        }
    }

    getPacienteById = async () => {
        try {
            const id = this.props.match.params.id;
            const res = await axiosConfig.get(`/pacientes/${id}`);
            const pacienteInfo = res.data;
            console.log(pacienteInfo);
            this.setState({
                username: pacienteInfo.username,
                id_paciente: pacienteInfo.id_paciente,
                nombre: pacienteInfo.nombre,
                apellido: pacienteInfo.apellido,
                fecha_nacimiento: moment(pacienteInfo.fecha_nacimiento).format("DD-MM-YYYY"),
                documento: this.getFormattedDocument(pacienteInfo.documento),
                id_usuario: pacienteInfo.id_usuario,
                direccion: this.getFormattedAddress(pacienteInfo.direccion),
                email: pacienteInfo.email,
                id_obra_social: pacienteInfo.id_obra_social,
                obra_social: pacienteInfo.obra_social,
                numero_afiliado: pacienteInfo.numero_afiliado,
            });
        } catch (error) {
            console.log(error);
        }
    }

    getFormattedAddress = (direccion) => {
        let formattedAddress = "",
            calle = direccion.calle !== "" && typeof direccion.calle !== "undefined" ? `calle: ${direccion.calle}` : "",
            numero = direccion.numero !== "" ? `Número: ${direccion.numero}` : false,
            piso = direccion.piso !== "" ? `Piso: ${direccion.piso}` : false,
            departamento = direccion.departamento !== "" ? `Departamento: ${direccion.departamento}` : false;
        formattedAddress += calle ? calle + (numero || piso || departamento ? ", " : "") : "";
        formattedAddress += numero ? numero + (piso || departamento ? ", " : "") : "";
        formattedAddress += piso ? piso + (departamento ? ", " : "") : "";
        formattedAddress += departamento ? departamento : "";
        return formattedAddress;
    }

    getFormattedDocument = (document) => {
        return `${document.doc_tipo}: ${document.doc_numero}`;
    }

    componentDidMount() {
        if(typeof this.props.data == 'undefined'){
            this.getPacienteById();
        } else {
            this.setState({
                apellido: this.props.data.apellido,
                direccion: this.getFormattedAddress(this.props.data.direccion),
                documento: this.getFormattedDocument(this.props.data.documento),
                email: this.props.data.email,
                fecha_nacimiento: this.props.data.fecha_nacimiento,
                id_obra_social: this.props.data.id_obra_social,
                id_paciente: this.props.data.id_paciente,
                id_usuario: this.props.data.id_usuario,
                nombre: this.props.data.nombre,
                numero_afiliado: this.props.data.numero_afiliado,
                obra_social: this.props.data.obra_social,
                username: this.props.data.username
            })
        }
    }

    handleOK = () => {
        const { history } = this.props;
        history.push('/pacientes/');
    }

    render() {
        return (
            <div className="card-info">
                <div className="card-header">
                    Detalle del Paciente
                </div>
                <div className="card-body">
                    <div className="card-field">
                        <div className="card-data">{this.state.username}</div>
                        <div className="card-label">Usuario</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.nombre}</div>
                        <div className="card-label">Nombre</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.apellido}</div>
                        <div className="card-label">Apellido</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.fecha_nacimiento}</div>
                        <div className="card-label">Fecha de Nacimiento</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.documento}</div>
                        <div className="card-label">Documento</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.direccion}</div>
                        <div className="card-label">Dirección</div>
                    </div>
                    
                    <div className="card-field">
                        <div className="card-data">{this.state.email}</div>
                        <div className="card-label">Email</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.obra_social}</div>
                        <div className="card-label">Obra Social</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.numero_afiliado}</div>
                        <div className="card-label">Número de afiliado</div>
                    </div>

                    <button type="submit" onClick={this.handleOK} className="btn">OK</button>
                </div>
            </div>
        )
    }
}

export default PacienteInfo