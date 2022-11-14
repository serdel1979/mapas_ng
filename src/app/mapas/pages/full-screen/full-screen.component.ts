import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'





@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa{
      height: 100%;
      width: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-57.874025923586096,-34.88778289639234], 
      zoom: 15
    });
  }



}
