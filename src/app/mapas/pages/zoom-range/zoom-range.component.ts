import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {



  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
 
  zoomLevel: number = 13;

  center: [number,number]=[-57.874025923586096,-34.88778289639234];

  constructor() {}

  //cuando hay un listener, hay que destruirlo
  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, 
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom',()=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend',()=>{
      if (this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });
    
    this.mapa.on('move',(event)=>{
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];
    });

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
