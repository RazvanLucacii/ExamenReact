import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Global from './../Global'

export default class Personajes extends Component {
    state = {
        personajes: {},
        status: false
    }

    loadPersonajes = () => {
        var request = "api/series/personajesserie/" + this.props.idSerie;
        var url = Global.apiUrls + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            })
        })
    }
  
    componentDidMount = () => {
        this.loadPersonajes();
    }

  render() {
    return (
        <div className='container text-center'>
            <NavLink className="btn btn-success" to={"/detalles/" + this.props.idSerie}>Volver</NavLink>
            <br/><br/>
            {
            this.state.status === true &&
            (
                <table className='table table-dark'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.personajes.map((personaje, index) =>{
                            return(<tr key={index}>
                                <td>{personaje.nombre}</td>
                                <td><img src={personaje.imagen} style={{width:"200px"}} alt="." /></td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
            )
        }
        </div>
    )
  }
}
