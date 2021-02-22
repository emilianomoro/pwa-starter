
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  isLoading = false;
  loaderCounter = 0;
  loading: HTMLIonLoadingElement;

  loader;
  detalleSaldo = false;
  constructor(
    private alertController: AlertController,
    public loadingController: LoadingController ) 
    { }
 
  async getAlertContent (message: string, icon:string, type:string, fontSize:string = null)  {
    type= (type)? type : 'default';
    let iconHtml = '';
    if(icon) {
      iconHtml = `<div class="sc-ion-alert-icon-wrapper">
      <ion-icon class="alert-icon alert-type-${type}" 
      name="${icon}"></ion-icon></div>`
    }
    return `${iconHtml} <div class="alert-title ${fontSize}">${message}</div>`;
  }

   async alertaInformativa ( message: string, icon:string = null, type:string = null ,header:string=null,clasCSS:string =null,textButton:string =null) {
    const content = await this.getAlertContent(message, icon, type)
    console.log(clasCSS)
    if(textButton==null)
      textButton='OK'
    if(clasCSS==null)
      clasCSS=""
    
    const alert = await this.alertController.create({
      header:header,
      message: content,
      animated:true,
      cssClass:'alert-custom alert-custom-icon '+clasCSS,
      buttons: [
        {text:textButton}]
    });
    await alert.present();
  }
  
  async alertaConfirmacion ( message: string , icon:string = null, type:string = null, buttons, fontSize: string = null) {
    const content = await this.getAlertContent(message, icon, type, fontSize)
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        message: content,
        animated:true,
        cssClass:'alert-custom alert-custom-icon',
        buttons: [
            { 
            text: buttons.deny,
            handler: () => { 
              return resolve(false);
            }
          },
          { 
            text: buttons.confirm,
            handler: () => {
              return resolve(true);
            }
          }
        ]
      });
      await confirm.present();
    });
  }


  async presentLoading(message) {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message
    });
    await this.loader.present();
  }

  async dismissLoading() {
    this.loader.dismiss();
  }


}
