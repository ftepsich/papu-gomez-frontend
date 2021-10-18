import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paginacion from "../Paginacion";
import {
  fetchObrasSociales,
  removeObraSocial,
} from "../../services/obraSocial";

const ObraSocialList = () => {
  const [obras_sociales, setObrasSociales] = useState([]);
  const [loading, setLoading] = useState(true);

  const getObrasSociales = async () => {
    try {
      const response = await fetchObrasSociales();
      setLoading(false);
      return setObrasSociales(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteObraSocial = async (event, id) => {
    event.preventDefault();
    await removeObraSocial(id);
    const delObraSocial = obras_sociales.filter((obra_social) => {
      return obra_social.id !== id;
    });
    setObrasSociales(delObraSocial);
  };

  useEffect(() => {
    getObrasSociales();
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  return (
    <>
      <div>
        <h2>Obras Sociales</h2>
        <Link to="/obras-sociales/new" title="Nueva obra social">
          <button type="button" className="btn">
            Nueva Obra Social
          </button>
        </Link>
        <Paginacion
          rhead={["Nombre", "Descripción"]}
          rbody={obras_sociales.map((obra_social) => {
            return [
              obra_social.nombre,
              obra_social.descripcion,
              <i
                onClick={(event) => deleteObraSocial(event, obra_social.id)}
                className="far fa-trash-alt"
              ></i>,
              <Link
                to={`/obras-sociales/edit/${obra_social.id}`}
                className="fas fa-edit"
              />,
              <Link
                to={`/obras-sociales/${obra_social.id}`}
                className="fas fa-folder"
              />,
            ];
          })}
          delete="2"
          edit="4"
          info="3"
        />
      </div>
    </>
  );
};

export default ObraSocialList;
