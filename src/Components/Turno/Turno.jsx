import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosConfig } from '../../config';
import Paginacion from '../Paginacion';
import moment from '../../Utils/Moment';

class Turno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnos: [],
            pacientes: [],
            id: ''
        };
    }

    //Lista Turnos
    getTurnos = async () => {
        try {
            const res = await axiosConfig.get("/turnos");
            const turnos = await res.data;
            console.log(turnos);
            this.setState({ turnos });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getTurnos();
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    }

    render() {
        console.log("Render Turno");
        return (
            <div>
                <h2>Turnos</h2>
                <Link to="/turnos/new" title="Nuevos Turnos">
                    <button type="button" className="btn">Nuevo Turno</button>
                </Link>
                <Paginacion
                    rhead={["Paciente","Fecha y Hora", "Practica"]}
                    rbody={this.state.turnos.map( (turno,index) => {
                        return [
                            turno.paciente,
                            moment(turno.fecha_hora_turno).format("ddd D, HH:mm"),
                            turno.practica
                        ]
                    })}
                />
            </div>
        )
    }
}

export default Turno