import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  discount=false;

  subtotal=150;
  delivery=5;
  ekc_disc=20;
  total=0;


  constructor(public alertController: AlertController,private router: Router) {
    this.total=this.subtotal+this.delivery;
   }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Payment done correctly!',
      message:`<ion-icon size="large" name="thumbs-up-outline"></ion-icon> Thanks for your responsable buy!<br><br> <ion-icon name="globe-outline"></ion-icon> Your buy is %30 green<br><br><ion-icon name="cash-outline"></ion-icon> You get 53 Ecko-Coins for you <ion-icon name="happy"></ion-icon>`,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            localStorage.removeItem('kart');
            this.router.navigate(['home'], {replaceUrl:true}).then(()=>{
              window.location.reload();
            });
          }
        }
        ]
    });

    await alert.present();
  }

  changed(){
    if(this.discount){
      this.total=this.subtotal+this.delivery-this.ekc_disc;
    }else{
      this.total=this.subtotal+this.delivery;
    }
  }

}
