import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  supermercados = [];

  categories=[];
  highlights=[];
  featured=[];

  catSlideOpts={
    freeMode:true,
    slidesPerView:3.5,
    slidesOffsetBefore:11,
    spaceBetween:10
  }

  highlightSlideOpts={
    slidesPerView:1.05,
    spaceBetween:10,
    centeredSlides:true,
    loop:true
  }

  featuredSlideOpts={
    slidesPerView:1.2,
    spaceBetween:10,
    freemode:true
  }

  like=false;
  heart='heart-outline';

  fav_market:any=[];

  showLocationDetail=false;

  kart_number=0;
  fav_number=0;

  constructor(private _api:ApiService,
    private http:HttpClient, private router:Router) {
     
     
  }

  ngOnInit(){
    //Estos son los anuncios publicitarios
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe((res:any)=>{//To-Do crear una interfaz
    console.log(res);
      this.highlights=res.highlights;
    });

    //Obtenemos todos los supermercados
    this._api.getAllSupermarkets()
    .then(params=>{
      this.supermercados = params['results']['supermarkets'];
      this.supermercados.map(el=>{
        el.heart='heart-outline';
      });
      if(localStorage.getItem('fav')){
        this.fav_market=(JSON.parse(localStorage.getItem('fav')));
        console.log('favs',this.fav_market)
        this.fav_market.forEach(fav => {
          this.supermercados.map(el=>{
            if(el.name==fav.name){
              el.heart="heart";
            }
          });
        });
      }
      console.log(this.supermercados);
    })
    .catch(e=>console.log(e));
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onScroll(event){
    const offset = event.detail.scrollTop;
    this.showLocationDetail=offset>50;
  }

  liked(obj:any){
    //console.log(obj);
    if(obj.heart=='heart-outline'){
      obj.heart='heart';
      this.fav_market.push(obj);
      localStorage.setItem('fav',JSON.stringify(this.fav_market));
    }else{
      obj.heart='heart-outline';
      let ind=this.fav_market.findIndex(el=>el.name==obj.name);
      this.fav_market.splice(ind,1);
      console.log('eliminado',this.fav_market)
      localStorage.setItem('fav',JSON.stringify(this.fav_market));
    }
    
  }

 

}
