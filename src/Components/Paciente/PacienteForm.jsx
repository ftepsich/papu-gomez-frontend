import React, { Component } from 'react';
import { axiosConfig } from '../../config';
import "../Formulario/Formulario.scss";
import Select from '../Formulario/Select';
import Input from '../Formulario/Input';
import moment from '../../Utils/Moment';

class PacienteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nombre: '',
            apellido: '',
            fecha_nacimiento: '',
            calle: '',
            numero: '',
            piso: '',
            departamento: '',
            doc_numero: '',
            tel_tipo: '',
            tel_numero: '',
            email: '',
            id_obra_social: '',
            obra_social: '',
            numero_afiliado: '',
            afiliado: false,
            obras_sociales: [],
            isEditable: false
        };
    }
    getPacienteById = async (id) => {
        try {
            const res = await axiosConfig.get(`/pacientes/${id}`);
            const pacienteInfo = res.data;
            console.log(pacienteInfo);
            this.setState({
                username         : pacienteInfo.username,
                id_paciente      : pacienteInfo.id_paciente,
                nombre           : pacienteInfo.nombre,
                apellido         : pacienteInfo.apellido,
                fecha_nacimiento : moment(pacienteInfo.fecha_nacimiento).format("DD-MM-YYYY"),
                doc_numero       : pacienteInfo.documento.doc_numero,
                id_usuario       : pacienteInfo.id_usuario,
                calle        : pacienteInfo.direccion.calle,
                numero           : pacienteInfo.direccion.numero,
                piso             : pacienteInfo.direccion.piso,
                departamento     : pacienteInfo.direccion.departamento,
                email            : pacienteInfo.email,
                id_obra_social   : pacienteInfo.id_obra_social,
                obra_social      : pacienteInfo.obra_social,
                numero_afiliado  : pacienteInfo.numero_afiliado,
                afiliado         :pacienteInfo.afiliado, 
                isEditable       : true
            });
        } catch (error) {
            console.log(error);
        }
    }
    getObrasSociales = async () => {
        try {
            const res = await axiosConfig.get("/obras-sociales");
            const obras_sociales = await res.data;
            this.setState({ obras_sociales });
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        const { match: { params: {id} } } = this.props;
        if( id ){
            this.getPacienteById(id);
        }
        this.getObrasSociales();
    }
    agregarPaciente = async event => {
        event.preventDefault();
        try{
            const res = await axiosConfig.post("/pacientes", {
                nombre           : this.state.nombre,
                apellido         : this.state.apellido,
                fecha_nacimiento : moment(this.state.fecha_nacimiento,"DD-MM-YYYY").format("YYYY-MM-DD"),
                direccion : JSON.stringify({
                    calle    : this.state.calle,
                    numero       : this.state.numero,
                    piso         : this.state.piso,
                    departamento : this.state.departamento,
                }),
                doc_numero         : this.state.doc_numero,
                telefono           : this.state.telefono,
                email            : this.state.email,
                id_obra_social   : this.state.id_obra_social,
                numero_afiliado  : this.state.numero_afiliado
            });
            if(res.data.status === "OK"){
                this.props.history.push(res.data.id_paciente);
            }
        } catch(error) {
            console.log(error);
        }
    }
    actualizarPaciente = async (event) => {
        try {
            event.preventDefault();
            const { match: { params: { id } } } = this.props;
            const res = await axiosConfig.put(`/pacientes/${id}`,{
                nombre           : this.state.nombre,
                apellido         : this.state.apellido,
                fecha_nacimiento : moment(this.state.fecha_nacimiento,"DD-MM-YYYY").format("YYYY-MM-DD"),
                direccion: JSON.stringify({
                    calle    : this.state.calle,
                    numero       : this.state.numero,
                    piso         : this.state.piso,
                    departamento : this.state.departamento,
                }),
                doc_numero       : this.state.doc_numero,
                email            : this.state.email,
                id_obra_social   : this.state.id_obra_social,
                numero_afiliado  : this.state.numero_afiliado
            });
            const actualizarPaciente = res.data;
            this.setState({
                id               : actualizarPaciente.id,
                nombre           : actualizarPaciente.nombre,
                apellido         : actualizarPaciente.apellido,
                fecha_nacimiento : moment(actualizarPaciente.fecha_nacimiento).format("DD-MM-YYYY"),
                doc_tipo         : actualizarPaciente.documento.doc_tipo,
                doc_numero       : actualizarPaciente.documento.doc_numero,
                id_usuario       : actualizarPaciente.id_usuario,
                calle        : actualizarPaciente.direccion.calle,
                numero           : actualizarPaciente.direccion.numero,
                piso             : actualizarPaciente.direccion.piso,
                departamento     : actualizarPaciente.direccion.departamento,
                email            : actualizarPaciente.email,
                id_obra_social   : actualizarPaciente.id_obra_social,
                obra_social      : actualizarPaciente.obra_social,
                numero_afiliado  : actualizarPaciente.numero_afiliado,
            });
        } catch (error) {
            console.log(error);
        }
    }
    handleCancel = () => {
        window.history.back();
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="formulario">
                <div className="form-header">{this.state.isEditable ? "Editar" : "Nuevo"} Paciente</div>
                <div className="form-body">
                    <div className="">
                        <fieldset>
                            <legend>Información Personal</legend>
                            <Input
                                id="nombre"
                                name="nombre"
                                onChange={this.handleChange}
                                placeholder="Nombre *"
                                value = {this.state.nombre}
                            />
                            <Input
                                id="apellido"
                                name="apellido"
                                onChange={this.handleChange}
                                placeholder="Apellido *"
                                value = {this.state.apellido}
                            />
                            <Input
                                extra="ej: 08-10-1990"
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                onChange={this.handleChange}
                                placeholder="Fecha de Nacimiento *"
                                value = {this.state.fecha_nacimiento}
                            />
                            <Input
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Correo electrónico *"
                                type="mail"
                                value = {this.state.email}
                            />
                        </fieldset>
                    </div>
                    <div className="">
                        <fieldset>
                            <legend>Documento</legend>
                            <div className="col-2">
                                <Input
                                    id="doc_numero"
                                    name="doc_numero"
                                    onChange={this.handleChange}
                                    placeholder="Número de documento *"
                                    value = {this.state.doc_numero}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Teléfono</legend>
                            <div className="col-2">
                               
                                <Input
                                    id="tel_numero"
                                    name="tel_numero"
                                    onChange={this.handleChange}
                                    placeholder="Número de Teléfono *"
                                    value = {this.state.tel_numero}
                                />
                            </div>
                        </fieldset> 
                    </div>
                    <div className="">
                        <fieldset>
                            <legend>Dirección</legend>
                            <div className="col-2">
                                <Input
                                    id="calle"
                                    name="calle"
                                    onChange={this.handleChange}
                                    placeholder="Calle"
                                    value = {this.state.calle}
                                />
                                <Input
                                    id="numero"
                                    name="numero"
                                    onChange={this.handleChange}
                                    placeholder="Número"
                                    value = {this.state.numero}
                                />
                                <Input
                                    id="piso"
                                    name="piso"
                                    onChange={this.handleChange}
                                    placeholder="Piso"
                                    value = {this.state.piso}
                                />
                                <Input
                                    id="departamento"
                                    name="departamento"
                                    onChange={this.handleChange}
                                    placeholder="Departamento"
                                    value={this.state.departamento}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Obra Social</legend>
                            <Select
                                id="id_obra_social"
                                name="id_obra_social"
                                onChange={this.handleChange}
                                options={this.state.obras_sociales.map(
                                    (os,key) => {
                                        return {
                                            value : os.id,
                                            text  : os.nombre
                                        }
                                    }
                                )}
                                placeholder="Obra Social"
                                value={this.state.id_obra_social}
                            />
                            <Input
                                id="numero_afiliado"
                                name="numero_afiliado"
                                onChange={this.handleChange}
                                placeholder="Número de afiliado"
                                value = {this.state.numero_afiliado}

                            />
                                                        Afiliado

                            <Input
                            type="checkbox"
                            id="afiliado"
                            onChange={this.handleChange}
                            value= {this.state.afiliado}
                            />
                        </fieldset>
                    </div>
                    <button type="button" className="btn" onClick={this.state.isEditable ? this.actualizarPaciente : this.agregarPaciente}>{this.state.isEditable ? "Actualizar" : "Agregar"}</button>
                    <button type="button" className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </div>
        )
    }
}

export default PacienteForm;