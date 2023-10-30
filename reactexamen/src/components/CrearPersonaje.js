import React, { Component } from 'react'
import Global from './../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CrearPersonaje extends Component {
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaSerie = React.createRef();

  state = {
    series: [],
    statusSeries: false,
    status: false
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


  insertPersonaje = (e) =>{
    e.preventDefault();
    var nombre = this.cajaNombre.current.value;
    var imagen = this.cajaImagen.current.value;
    var serie = parseInt(this.cajaSerie.current.value);

    var personaje = {
      nombre: nombre,
      imagen: imagen,
      idSerie: serie
    }

    var request = "api/personajes";
    var url = Global.apiUrls + request;
    axios.post(url, personaje).then(response =>{
      this.setState({
        status: true
      })
    })
  }

  componentDidMount = () =>{
    this.loadSeries();
  }

  render() {
    if(this.state.status === true){
      return(<Navigate to="/" />)
    }else{
      return (
        <div className='container text-center'>
          <h1 style={{color: "blue"}}>Nuevo Personaje</h1>
          <form>
            <label>Nombre:</label>
            <input type='text' ref={this.cajaNombre} className='form-control'></input>
            <br/>
            <label>Imagen:</label>
            <input type='text' ref={this.cajaImagen} className='form-control'></input>
            <br/>
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
            <button className='btn btn-info' onClick={this.insertPersonaje}>Insertar Personaje</button>
          </form>
        </div>
      )
    }
  }
}

