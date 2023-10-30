import React, { Component } from 'react'
import Global from './../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ModificarPersonajes extends Component {
  cajaPersonaje = React.createRef();
  cajaSerie = React.createRef();

  state = {
    personajes:[],
    series:[],
    statusSeries: false,
    statusPersonajes: false
  }

  loadPersonajes = () =>{
    var request = "api/personajes";
    var url = Global.apiUrls + request;
    axios.get(url).then(response => {
        this.setState ({
            personajes: response.data,
            statusPersonajes: true
        })
    })
  }

  loadSeries = () =>{
    var request = "api/series";
    var url = Global.apiUrls + request;
    axios.get(url).then(response => {
        this.setState ({
            series: response.data,
            statusSeries: true
        })
    })
  }

  updatePersonajes = (e) =>{
    e.preventDefault();
    var serie = this.cajaSerie.current.value;
    var pj = this.cajaPersonaje.current.value;

    var personaje = {
      idPersonaje: pj,
      idSerie: serie
    }

    var request = "api/personajes/" + pj + "/" + serie;
    var url = Global.apiUrls + request;
    axios.put(url, personaje).then(response =>{
      this.setState({
        status: true
      })
    })
  }

  componentDidMount = () => {
    this.loadPersonajes();
    this.loadSeries();
  }


  render() {
    if(this.state.status === true){
      return(<Navigate to={"/"} />)
    }else{
      return (
        <div className='container text-center'>
          <h1 style={{color: "blue"}}>Nuevo Personaje</h1>
          <form>
            <label>Serie:</label>
            <select ref={this.cajaSerie} className='form-control'>
              {
                this.state.statusSeries === true &&
                (
                    this.state.series.map((serie, index) => {
                        return(<option key={index} value={serie.idSerie}>
                            {serie.nombre}
                        </option>)
                    })
                )
              }
            </select>
            <br/>
            <label>Personajes:</label>
            <select ref={this.cajaPersonaje} className='form-control'>
              {
                this.state.statusPersonajes === true &&
                (
                    this.state.personajes.map((personaje, index) => {
                        return(<option key={index} value={personaje.idPersonaje}>
                            {personaje.nombre}
                        </option>)
                    })
                )
              }
            </select>
            <br/>
            <button className='btn btn-info' onClick={this.updatePersonajes}>Guardar cambios</button>
          </form>
        </div>
      )
    }
  }
}
