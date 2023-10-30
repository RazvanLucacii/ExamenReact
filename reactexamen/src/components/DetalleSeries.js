import React, { Component } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import Global from '../Global'

export default class DetalleSeries extends Component {
    state = {
        series: {},
        status: false
    }
    
    loadSeries = () =>{
        var request = "api/series/" + this.props.idserie;
        var url = Global.apiUrls + request;
        axios.get(url).then(response =>{
          this.setState({
            series: response.data,
            status: true
          })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }

    componentDidUpdate = (oldProps) =>{
      if(oldProps.idserie !== this.state.oldProps){
          this.loadSeries();
      }
  }

  render() {
    return (
        <div className='container text-center'>
          <div className="card" style={{width: "30rem"}}>
            <img src={this.state.series.imagen} style={{width:"400px"}} alt="." />
            <div className="card-body">
                <h3 className="card-title">{this.state.series.nombre}</h3>
                <br/>
                <p className="card-text">IMDB: {this.state.series.puntuacion}</p>
                <NavLink className="btn btn-success" to={"/personajes/" + this.props.idserie}>Personajes</NavLink>
            </div>
          </div>
        </div>
    )
  }
}
