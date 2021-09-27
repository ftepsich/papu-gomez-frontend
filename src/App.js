import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from './Custom/AppliedRoute';

import Header from './Components/Header';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

import Login from './Components/Login/Login';
import ResetPassword from './Components/Login/ResetPassword'
import ChangePassword from './Components/Login/ChangePassword'

import Paciente from './Components/Paciente/Paciente';
import PacienteForm from './Components/Paciente/PacienteForm';
import PacienteInfo from './Components/Paciente/PacienteInfo';

import ObraSocialList from './Components/ObraSocial/ObraSocialList';
import ObraSocialForm from './Components/ObraSocial/ObraSocialForm';
import ObraSocialInfo from './Components/ObraSocial/ObraSocialInfo';

import Turno from './Components/Turno/Turno';


const NotFound = ({ location }) => (
    <h1>Ha ocurido un problema. No se encuentra la página solicitada: {location.pathname} </h1>
)

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            token:''
        };
    }

    updateLogin = (login, token) => {
        window.sessionStorage.setItem("token",token);
        this.setState({
            loggedin: login,
            token
        });
    }

    componentDidMount(){
        const token = window.sessionStorage.getItem("token");
        if(token && token.length){
            this.setState({
                loggedin: true,
                token
            });
        }
    }

    render() {
        console.log("Render APP",this.state.loggedin);
        let listOfRoutes;
        if( !this.state.loggedin){
            listOfRoutes = [
                <Route exact key="0" path="/" component={Login} props={{handleLogin: this.updateLogin}}/>,
                <Route exact key="1" path="/login/recuperar-contrasenia" component={ResetPassword}/>,
                <Route exact key="2" path="/login/recuperar-contrasenia/:token/:id" component={ChangePassword}/>
            ];
        } else {
            listOfRoutes = [
                <Route exact key="0" path="/" component={Turno}/>,
                <Route exact key="1" path="/pacientes" component={Paciente} />,
                <Route exact key="2" path="/pacientes/new" component={PacienteForm} />,
                <Route exact key="3" path="/pacientes/edit/:id" component={PacienteForm} />,
                <Route exact key="4" path="/pacientes/:id" component={PacienteInfo} />,
                <Route exact key="5" path="/obras-sociales" component={ObraSocialList} />,
                <Route exact key="6" path="/obras-sociales/new" component={ObraSocialForm} />,
                <Route exact key="7" path="/obras-sociales/edit/:id" component={ObraSocialForm} />,
                <Route exact key="8" path="/obras-sociales/:id" component={ObraSocialInfo} />,
            ];
        }
        return (
            <Router>
                <div>
                    <Header />
                    {/* falta terminar esta parte al momento de logearse. */}
                    <NavBar loggedin={this.state.loggedin} />
                    <div className="container" id="Main">
                        <Switch>
                            { listOfRoutes }
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;