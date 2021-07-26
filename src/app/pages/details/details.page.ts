import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonList, IonSlides, ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {

  image='';

  name='';
  rating=0;
  categories = [];
  products = [];
  data = null;
  opts = {
    freeMode: true,
    slidesPerView: 3,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  kart_items:any=[];

  obj_params:any[]=[];

  categorySlideVisible=false;

  activeCategory=0;
  @ViewChildren(IonList,{read:ElementRef}) lists: QueryList<ElementRef>;
  listElements=[];
  @ViewChild(IonContent) content:IonContent;
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private http:HttpClient,private _api:ApiService,private route: ActivatedRoute,public toastController: ToastController) {
    this.route.params.subscribe(param=>{
      this.name=param.name;
      this.rating=param.rating;
      this.image=param.img;
    });
    if(localStorage.getItem('kart')){
      this.kart_items.push(JSON.parse(localStorage.getItem('kart')));
    }
   }

  async ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe(resp => {
      this.data = resp;
    });
    console.log(this.name.replace(' ','_'))
    
    await this._api.getMarketProducts(this.name.replace(' ','_'))
    .then(params => {
      console.log(params);
     // this.categories = params['results'][0]['categories'];
      this.products = params['results'][0]['products'];
      this.obj_params=Object.getOwnPropertyNames(this.products['category']).sort();
    })
    .catch(e=>console.log(e));
  }

  ngAfterViewInit() {
    this.lists.changes.subscribe(()=>{
      this.listElements=this.lists.toArray();
    })
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  addToKart(obj:any){
    console.log(obj);
    /* if(localStorage.getItem('kart')){
      this.kart_items.push(JSON.parse(localStorage.getItem('kart')));
    } */
    this.kart_items.push(obj);
    localStorage.setItem('kart',JSON.stringify(this.kart_items));
    this.presentToast('Product Added to Cart');
  }

  selectCategory(index) {
    const child=this.listElements[index].nativeElement;
    this.content.scrollToPoint(0,child.offsetTop-120,1000);

  }

  onScroll(event){
    const offset=event.detail.scrollTop;
    this.categorySlideVisible=offset>500;
    for (let i = 0; i < this.listElements.length; i++) {
       const item=this.listElements[i].nativeElement;
       if(this.isElementInViewport(item)){
         this.activeCategory=i;
         console.log(this.activeCategory);
          this.slides.slideTo(i,1000);
         break;
       }
    }
  }

  isElementInViewport(element){
    const rect= element.getBoundingClientRect();
    return(
      rect.top>=0 && rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)
    );
  }

}
