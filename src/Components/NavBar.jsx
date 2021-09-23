import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

class NavBar extends Component {
    handleEvent = (event)  => {
        const elem = event.target;
        if( elem.classList.contains("active") && this.props.location.pathname === elem.getAttribute("href") ){
            event.preventDefault();
        }
    }

    render() {
        console.log("Render NAV",this.props.loggedin);
        let listOfLinks;
        if(this.props.loggedin){
            listOfLinks = [
                <Link key='0' activeClassName="active" exact onClick={this.handleEvent} title="Turnos" to="/">Turnos</Link>,
                <Link key='1' activeClassName="active" onClick={this.handleEvent} title="Pacientes" to="/pacientes">Pacientes</Link>,
                <Link key='2' activeClassName="active" onClick={this.handleEvent} title="Obras Sociales" to="/obras-sociales">Obras Sociales</Link>,
            ];
        } else {
            listOfLinks = [ 
                <Link key='0' activeClassName="active" exact onClick={this.handleEvent} title="Ingresar" to="/">Ingresar</Link>
            ];
        }
        return (
            <nav>
                <div className="container">
                    { listOfLinks }
                </div>
            </nav>
        )
    }
}

export default NavBar;