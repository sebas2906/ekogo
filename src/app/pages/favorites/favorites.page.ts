import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favs:any=[];

  constructor() { 
    if(localStorage.getItem('fav')){
      this.favs=JSON.parse(localStorage.getItem('fav'));
    }
  }

  ngOnInit() {
  }

}
