import React, { Component } from 'react'
import {Routes, Route, BrowserRouter, useParams} from 'react-router-dom';
import HomePeliculas from './HomePeliculas';
import MenuSeries from './MenuSeries';
import DetalleSeries from './DetalleSeries';
import Personajes from './Personajes';
import CrearPersonaje from './CrearPersonaje';
import ModificarPersonajes from './ModificarPersonajes';


export default class Router extends Component {
  render() {
    function DetallesSeriesElement (){
        var { idSerie } = useParams();
        return(<DetalleSeries idserie={idSerie}/>);
    }
    function PersonajesElement (){
      var {idSerie} = useParams();
      return(<Personajes idSerie={idSerie} />);
    }
    return (
      <BrowserRouter>
        <MenuSeries />
        <hr/>
        <Routes>
            <Route path="/" element={<HomePeliculas />} />
            <Route path="/detalles/:idSerie" element={<DetallesSeriesElement />} />
            <Route path="/crear" element={<CrearPersonaje />} />
            <Route path="/modificar" element={<ModificarPersonajes />} />
            <Route path="/personajes/:idSerie" element={<PersonajesElement />} />      
        </Routes>
      </BrowserRouter>
    )
  }
}
