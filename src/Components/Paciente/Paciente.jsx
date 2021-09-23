import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosConfig } from '../../config';
import Paginacion from '../Paginacion';
import { getPacientes } from '../../Utils/Helpers';

class Paciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pacientes: [],
            id: 0
        }
    };

    getPacientes = async () => {
        const token = window.sessionStorage.getItem("token");
        const pacientes = await getPacientes(token);
        this.setState({ pacientes });
    }

    getFormattedDocument = (document) => {
        return `${document.doc_tipo}: ${document.doc_numero}`;
    }

    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.id;
        axiosConfig.delete(`/pacientes/${id}`).then(res => {
            console.log(res.data);
        })
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    }

    componentDidMount() {
        this.getPacientes();
    }

    render() {
        console.log("Render Pacientes");
        return (
            <div>
                <h2>Pacientes</h2>
                <Link to="/pacientes/new">
                    <button type="button" className="btn">Nuevo Paciente</button>
                </Link>
                <Paginacion
                    rhead={["Nombre y Apellido", "Documento","Telefono"]}
                    rbody={this.state.pacientes.map((paciente) => {
                        return [
                            `${paciente.nombre} ${paciente.apellido}`,
                            `${(paciente.documento)}`,
                            `${paciente.telefono}`,
                            <Link to={`/pacientes/${paciente.id}`} className="fas fa-folder"/>,
                            <Link to={`/pacientes/edit/${paciente.id}`} className="fas fa-edit"/>
                        ]
                    })}
                    info="3"
                    edit="4"
                />
            </div>
        )
    }
}

export default Paciente
