
import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GpsService } from '../../services/gps.service';

@Component({
  selector: 'app-init-config',
  templateUrl: './init-config.page.html',
  styleUrls: ['./init-config.page.scss'],
})
export class InitConfigPage implements OnInit {

 lat=0;
 long=0; 
 
  constructor(private gps:GpsService) {

   }

  ngOnInit() {
    this.gps.getCurrentPosition().then((values)=>{
      this.lat=values.coords.latitude;
      this.long=values.coords.longitude;
    });
   
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
