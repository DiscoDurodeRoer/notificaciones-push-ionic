import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonTextarea,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import moment from 'moment-timezone';
import { INotification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonTextarea,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonLabel,
    IonButton,
    FormsModule
  ],
})
export class HomePage {

  private notificationService: NotificationService = inject(NotificationService)
  private toastController: ToastController = inject(ToastController)

  public notification: INotification = {
    title: '',
    body: '',
    date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    url: ''
  }

  sendNotification() {
    console.log(this.notification);
    this.notificationService.sendNotification(this.notification).then( async (responseStatus: boolean) => {
      if(responseStatus){
        const toast = await this.toastController.create({
          message: 'Se ha enviado la notificacion',
          duration: 5000,
          position: 'top'
        })
        await toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'No se ha enviado la notificacion',
          duration: 5000,
          position: 'top'
        })
        await toast.present();
      }
    }).catch(async err => {
      const toast = await this.toastController.create({
        message: 'No se ha enviado la notificacion por error ' + JSON.stringify(err),
        duration: 5000,
        position: 'top'
      })
      await toast.present();
    })
  }
}
