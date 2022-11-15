import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker;
}



@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [ `
    
  .mapa-container{
    height: 100%;
    width: 100%;
  }
  
  .list-group{
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
  }
  
  li {
    cursor: pointer;
  }
  `]
})

export class MarcadoresComponent implements AfterViewInit {


  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
 
  zoomLevel: number = 13;

  center: [number,number]=[-57.874025923586096,-34.88778289639234];

  marcadores: MarcadorColor[]=[];

  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, 
      zoom: this.zoomLevel
    });


    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Mi casa';

    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // })
    // .setLngLat(this.center)
    // .addTo(this.mapa)

  }

  irMarcador(marcador: MarcadorColor){
    this.mapa.flyTo({
      center: marcador.marker.getLngLat()
    })
  }
  
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    
    
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa)



    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    

  }

}
