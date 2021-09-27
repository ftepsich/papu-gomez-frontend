import React, {useState,useEffect  } from "react";
import { Link } from 'react-router-dom';
import Paginacion from '../Paginacion';
import { fetchObrasSociales,deleteObraSocial } from '../../services/obraSocial'

const ObraSocialList = () => {
    const [obras_sociales,setObrasSociales] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  

const getObrasSociales = async () => {
    try{
    const response = await fetchObrasSociales();
    console.log(response);
    setLoading(false);
    return setObrasSociales(response);
    }catch(error){
      setError(error);
    }
  }


  const deleteObrasSociales = async (id, index) =>{
    try {
        const res = await deleteObraSocial(id);
        console.log(res)
        let rows = document.getElementsByClassName("pagination-body");
       rows[index].remove();
       setObrasSociales(obras_sociales.filter(obra_social=>obra_social.id !== id))

    } catch (error) {
      
    }
  }

  useEffect (() => {
    getObrasSociales()
  },[])

  if (loading) {
    return <p>loading..</p>;
  }


  if (error !== '') {
    return <p>Ocurrio un problema al listar obras sociales: {error}</p>;
  }

  return(
  <>
         <div>
                <h2>Obras Sociales</h2>
                <Link to="/obras-sociales/new" title="Nueva obra social">
                    <button type="button" className="btn">Nueva Obra Social</button>
                </Link>
                <Paginacion
                    rhead={["Nombre", "Descripción"]}
                    rbody={obras_sociales.map( (obra_social) => {
                        return [
                            obra_social.nombre,
                            obra_social.descripcion,
                            <i onClick={(event) => deleteObrasSociales(event, obra_social.id)} className="far fa-trash-alt"></i>,
                            <Link to={`/obras-sociales/edit/${obra_social.id}`} className="fas fa-edit"/>,
                            <Link to={`/obras-sociales/${obra_social.id}`} className="fas fa-folder"/>
                        ]
                    })}
                    delete="2"
                    edit="4"
                    info="3"
                />
            </div>
            </>
        )
    }

  


export default ObraSocialList;