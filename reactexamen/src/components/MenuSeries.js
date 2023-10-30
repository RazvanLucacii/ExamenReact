import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import Global from './../Global'
import axios from 'axios';
import imagenLogo from './../assets/images/stranger-things.jpg'

export default class MenuSeries extends Component {
    state = {
        series: [],
        status: false
    }

    loadSeries = () => {
        var request = "api/series";
        var url = Global.apiUrls + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    componentDidUpdate = (oldProps) =>{
        if(oldProps.idSerie !== this.state.oldProps){
            this.loadSeries();
        }
    }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid" style={{backgroundColor:"lightblue"}}>
                <NavLink className="navbar-brand" to="/"><img src={imagenLogo} style={{height:"80px", width:"150px"}} alt="."/></NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/crear">Nuevo Personaje</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/modificar">Modificar Personajes</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Series
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                    this.state.series.map((serie, index) =>{
                                        return(<li key={index}>
                                            <NavLink className="dropdown-item" to={"/detalles/" + serie.idSerie}>{serie.nombre}</NavLink>
                                        </li>)
                                    })
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
  }
}
