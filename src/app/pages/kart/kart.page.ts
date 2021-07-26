import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent, IonList, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-kart',
  templateUrl: './kart.page.html',
  styleUrls: ['./kart.page.scss'],
})
export class KartPage implements OnInit {
  data = null;
  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  categorySlideVisible=false;

  my_kart:any=[];

  activeCategory=0;
  @ViewChildren(IonList,{read:ElementRef}) lists: QueryList<ElementRef>;
  listElements=[];
  @ViewChild(IonContent) content:IonContent;
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private http: HttpClient) {
    if(localStorage.getItem('kart')){
      this.my_kart=JSON.parse(localStorage.getItem('kart'));
    }
   }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe(resp => {
      this.data = resp;
    });
  }

  ngAfterViewInit() {
    this.lists.changes.subscribe(()=>{
      this.listElements=this.lists.toArray();
    })
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
