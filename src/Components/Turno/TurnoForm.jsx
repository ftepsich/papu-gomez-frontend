import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../config";
import "../Formulario/Formulario.scss";
import Input from "../Formulario/Input";
import moment from "../../Utils/Moment";
import Select from "../Formulario/Select";
import { fetchPacientes } from "../../services/paciente";

const TurnoForm = () => {
  const [pacientes, setPacientes] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [id_paciente, setIdPaciente] = useState("");
  const [id_profesional, setIdProfesional] = useState("");
  const [loading, setLoading] = useState(true);
  const [practica, setPractica] = useState("");
  const [duracion, setDuracion] = useState("");
  const [fecha_hora_turno, setFechaHoraTurno] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const asignarTurno = async () => {
    await axiosConfig.post("/turnos/asignar", {
      id_paciente,
      id_profesional,
      practica,
      duracion,
      fecha_hora_turno,
      descripcion,
    });
  };

  const getPacientes = async () => {
    try {
      const response = await fetchPacientes();
      setLoading(false);
      return setPacientes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfesionales = async () => {
    try {
      const response = await axiosConfig.get("/profesionales");
      const profesionales = response.data;

      setLoading(false);
      return setProfesionales(profesionales);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPacientes();
    getProfesionales();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    asignarTurno();
  };

  return (
    <div className="formulario">
      <div className="form-header">Turno</div>
      <div className="form-body">
        <Select
          id="id_paciente"
          name="id_paciente"
          options={pacientes.map((paciente) => {
            return {
              value: paciente.id,
              text: paciente.nombre,
            };
          })}
          placeholder="Paciente"
          onChange={({ target }) => setIdPaciente(target.value)}
          value={id_paciente}
        />
        <Select
          id="id_profesional"
          name="id_profesioanal"
          options={profesionales.map((profesional) => {
            return {
              value: profesional.id,
              text: profesional.username,
            };
          })}
          placeholder="Profesional"
          onChange={({ target }) => setIdProfesional(target.value)}
          value={id_profesional}
        />
        <Input
          id="practica"
          name="practica"
          onChange={({ target }) => setPractica(target.value)}
          placeholder="Practica Profesional *"
          value={practica}
        />
        <Input
          id="fecha_hora_turno"
          name="fecha_hora_turno"
          onChange={({ target }) => setFechaHoraTurno(target.value)}
          value={fecha_hora_turno}
        />
        <Input
          id="duracion"
          name="duracion"
          onChange={({ target }) => setDuracion(target.value)}
          value={duracion}
          type="time"
        />
        <Input
          id="descripcion"
          name="descripcion"
          onChange={({ target }) => setDescripcion(target.value)}
          placeholder="Descripcion"
          value={descripcion}
        />
        <button type="button" className="btn" onClick={handleSubmit}>
          Aceptar
        </button>
        <button type="button" className="btn">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default TurnoForm;
