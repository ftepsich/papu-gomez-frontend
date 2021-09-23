import React, { Component } from 'react';
import { axiosConfig } from '../../config';
import "../Formulario/Formulario.scss";

class ObraSocialInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nombre: "",
            descripcion: ""
        }
    }

    getObraSocialById = async () => {
        try {
            const { match: { params: {id} } } = this.props;
            const res = await axiosConfig.get(`/obras-sociales/${id}`)
            const obraSocialInfo = res.data;
            this.setState({
                id: obraSocialInfo.id,
                nombre: obraSocialInfo.nombre,
                descripcion: obraSocialInfo.descripcion
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getObraSocialById();
    }

    handleOK = () => {
        const { history } = this.props;
        history.push('/obras-sociales/');
    }


    render() {
        return (
            <div className="card-info">
                <div className="card-header">
                    Detalle de la Obra Social
                </div>
                <div className="card-body">
                    <div className="card-field">
                        <div className="card-data">{this.state.nombre}</div>
                        <div className="card-label">Nombre</div>
                    </div>
                    <div className="card-field">
                        <div className="card-data">{this.state.descripcion}</div>
                        <div className="card-label">Descripción</div>
                    </div>
                    <button type="submit" onClick={this.handleOK} className="btn">OK</button>
                </div>
            </div>
        )
    }
}


export default ObraSocialInfo