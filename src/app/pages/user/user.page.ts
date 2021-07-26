import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { QrPage } from '../qr/qr.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  //QR
  public result = null;
  public scanActive = false;

  public quantity=1000;

  kart_number=0;
  fav_number=0;
  username="";

  constructor(public alertController: AlertController,public modalController: ModalController, private route:Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(()=>{
      if(localStorage.getItem('user')){
        this.username=localStorage.getItem('user');
      }
      if(localStorage.getItem('kart')){
        this.kart_number=JSON.parse(localStorage.getItem('kart')).length;
        console.log(this.kart_number);
      }
      if(localStorage.getItem('fav')){
        this.fav_number=JSON.parse(localStorage.getItem('fav')).length;
      }
    });
   }

 ngOnInit() {
 this.prepareScanner();
  }

  async presentModal(id:number) {
    const modal = await this.modalController.create({
      component: QrPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
      }
    });
    modal.onDidDismiss().then((data:any)=>{
      console.log('Mostrando modal')
    });
    return await modal.present();
  }

  async startScanner() {
    let allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      /*  BarcodeScanner.hideBackground(); // make background of WebView transparent */
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      // if the result has content
      if (result.hasContent) {
        this.scanActive = false;
        console.log(result.content); // log the raw scanned content
        this.result = result.content;
     
          this.quantity+=Number(this.result);
          console.log(this.quantity);
     
       // this.addNewDevice(this.result);
      }
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Send EcKo-Coins',
      inputs: [
        {
          name: 'serie_input',
          type: 'number',
          placeholder: 'Add coins quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Agregar',
          cssClass: 'secondary',
          handler: (alertData) => {
            console.log('Generando QR');
            this.presentModal(0);
            this.quantity=900;
          }
        }
        ]
    });

    await alert.present();
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  prepareScanner() {
    BarcodeScanner.prepare();
  }

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      // the user granted permission
      return true;
    }
    return false;
  }

  stopScanner() {
    this.scanActive = false;
    BarcodeScanner.stopScan();

  }

  closeSession(){
    localStorage.clear();
    this.route.navigate(['login'], {replaceUrl:true}).then(()=>{
      window.location.reload();
    }); 
  }

 

}
