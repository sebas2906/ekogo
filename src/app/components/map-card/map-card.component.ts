import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { antPath ,AntPath } from 'leaflet-ant-path';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/maps/images/marker-icon-2x.png';
const iconUrl = 'assets/maps/images/marker-icon.png';
const shadowUrl = 'assets/maps/images/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss'],
})
export class MapCardComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() latitud=0;
  @Input() longitud=0;

  private map: L.Map;

  private initMap(): void {
    this.map = L.map('map').setView([this.latitud,this.longitud], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
    zoomOffset: -1,
    }).addTo(this.map);;

    L.marker([this.latitud,this.longitud]).addTo(this.map).bindPopup('Your location').openPopup();

   /*  antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map); */  
  
  }

  constructor() { 
   
  }

  ngOnInit(): void {
     
  }


  ngAfterViewInit(){
    setTimeout(() => {
      this.initMap();
    }, 500);
  }
  ngOnDestroy() {
    this.map.remove();
  }
  
}

