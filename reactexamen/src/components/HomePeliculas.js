import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import Global from './../Global'
import axios from 'axios';
import imagenSeries from './../assets/images/seriesimagen.jpg'

export default class HomePeliculas extends Component {
  render() {
    return (
      <div className='container'>
        <img src={imagenSeries} style={{width:"800px"}}/>
        <hr/>
      </div>
    )
  }
}
