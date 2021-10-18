import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosConfig } from "../../config";
import Paginacion from "../Paginacion";
import moment from "../../Utils/Moment";

const Turno = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTurnos = async () => {
    try {
      const res = await axiosConfig.get("/turnos");
      const listTurnos = res.data;
      setLoading(false);
      setTurnos(listTurnos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTurnos();
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  return (
    <>
      <h2>Turnos</h2>
      <Link to="/turnos/new" title="Nuevos Turnos">
        <button type="button" className="btn">
          Nuevo Turno
        </button>
      </Link>
      <Paginacion
        rhead={["Paciente", "Fecha y Hora", "Practica"]}
        rbody={turnos.map((turno) => {
          return [
            turno.paciente,
            moment(turno.fecha_hora_turno).format("ddd D, HH:mm"),
            turno.practica,
          ];
        })}
      />
    </>
  );
};

export default Turno;
