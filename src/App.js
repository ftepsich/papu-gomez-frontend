import React from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import  { AuthContextProvider } from "./context/authContext"
import useUser from "./hooks/useUser";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Components/Login/LoginHooks";

import Paciente from "./Components/Paciente/PacienteList";
import PacienteForm from "./Components/Paciente/PacienteForm";
import PacienteInfo from "./Components/Paciente/PacienteInfo";

import ObraSocial from "./Components/ObraSocial/ObraSocialList";
import ObraSocialForm from "./Components/ObraSocial/ObraSocialForm";
import ObraSocialInfo from "./Components/ObraSocial/ObraSocialInfo";

import Turno from './Components/Turno/Turno'
import TurnoForm from './Components/Turno/TurnoForm'

const App = () => {
  const { isLogged } = useUser();

  return(
  <AuthContextProvider>
  <Router>
  <Header/>
  <NavBar isLogged={isLogged} />
    <Switch>
    <Route exact path='/' component={Login} />
    <ProtectedRoute exact key="1" path='/turnos' component={Turno} />
    <ProtectedRoute exact key="11" path='/turnos/new' component={TurnoForm} />

    <ProtectedRoute exact key="2" path='/pacientes' component={Paciente} />
    <ProtectedRoute exact key="3" path="/pacientes/new" component={PacienteForm}  />
    <ProtectedRoute exact key="4" path="/pacientes/edit/:id" component={PacienteForm} />
    <ProtectedRoute exact key="6" path="/pacientes/:id" component={PacienteInfo} />
    <ProtectedRoute exact key="7" path='/obras-sociales' component={ObraSocial} />
    <ProtectedRoute exact key="8" path="/obras-sociales/new" component={ObraSocialForm}/>
    <ProtectedRoute exact key="9" path="/obras-sociales/edit/:id" component={ObraSocialForm}/>
    <ProtectedRoute exact key="10" path="/obras-sociales/:id" component={ObraSocialInfo}/>
    </Switch>
  </Router>
    <Footer />
  </AuthContextProvider>
  )
}

export default App;
