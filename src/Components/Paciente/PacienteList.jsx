import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paginacion from "../Paginacion";
import { fetchPacientes } from "../../services/paciente";

const ObraSocialList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPacientes = async () => {
    try {
      const response = await fetchPacientes();
      console.log(response);
      setLoading(false);
      return setPacientes(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getPacientes();
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  if (error !== "") {
    return <p>Oops!: {error}</p>;
  }

  return (
    <>
      <div>
        <h2>Pacientes</h2>
        <Link to="/pacientes/new">
          <button type="button" className="btn">
            Nuevo Paciente
          </button>
        </Link>
        <Paginacion
          rhead={["Nombre y Apellido", "Documento", "Telefono"]}
          rbody={pacientes.map((paciente) => {
            return [
              `${paciente.nombre} ${paciente.apellido}`,
              `${paciente.documento}`,
              `${paciente.telefono}`,
              <Link
                to={`/pacientes/${paciente.id}`}
                className="fas fa-folder"
              />,
              <Link
                to={`/pacientes/edit/${paciente.id}`}
                className="fas fa-edit"
              />,
            ];
          })}
          info="3"
          edit="4"
        />{" "}
      </div>
    </>
  );
};

export default ObraSocialList;
