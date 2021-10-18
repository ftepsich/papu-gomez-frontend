import React, { useState, useEffect } from "react";
import {
  postObrasSociales,
  fetchObraSocialById,
} from "../../services/obraSocial";
import "../Formulario/Formulario.scss";
import Input from "../Formulario/Input";

const ObraSocialForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const createObrasSociales = async () => {
    await postObrasSociales({
      nombre,
      descripcion,
    });
  };

  const getObraSocialById = async (id) => {
    await fetchObraSocialById(id);
  };

  const handleObrasSociales = (event) => {
    event.preventDefault();
    createObrasSociales();
  };

  useEffect(() => {
    getObraSocialById();
  });

  return (
    <>
      <div className="formulario">
        <div className="form-header">Obra Social</div>
        <div className="form-body">
          <Input
            id="nombre"
            name="nombre"
            onChange={({ target }) => setNombre(target.value)}
            placeholder="Nombre *"
            value={nombre}
          />
          <Input
            id="descripcion"
            name="descripcion"
            onChange={({ target }) => setDescripcion(target.value)}
            placeholder="Descripción *"
            value={descripcion}
          />
          <button type="button" onClick={handleObrasSociales} className="btn">
            Aceptar
          </button>
          <button type="button" className="btn">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default ObraSocialForm;
