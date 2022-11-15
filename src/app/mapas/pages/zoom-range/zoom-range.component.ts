import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;

      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {



  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
 
  zoomLevel: number = 13;

  constructor() {}


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-57.874025923586096,-34.88778289639234], 
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom',()=>{
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoom',()=>{
      if (this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    })


  }

 

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }
  
 
  zoomCambio(val: string){
    this.mapa.zoomTo(Number(val)); 
  }


}
