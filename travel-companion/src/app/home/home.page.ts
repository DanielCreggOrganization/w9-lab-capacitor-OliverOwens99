import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton ,IonList,IonItem,IonLabel } from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';
import { DeviceInfoService } from '../services/device-info.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, JsonPipe ,IonList,IonItem,IonLabel],
})
export class HomePage {
  deviceInfo: any = null;
  location: any = null;
  constructor(
    private cameraService: CameraService,
    private locationService: LocationService,
    private deviceInfoService: DeviceInfoService
  ) { }

  async takePicture() {
    try {
      const image = await this.cameraService.takePicture();
      console.log('Picture taken:', image);
    } catch (error) {
      console.error('Camera error:', error);
    }
    // You can monitor the actual Web API call:
    navigator.mediaDevices.addEventListener('devicechange', () => {
      console.log('Camera devices changed');
    });
  }

  async getLocation() {
    try {
      this.location = await this.locationService.getCurrentPosition();
    } catch (error) {
      console.error('Location error:', error);
    }
    // Monitor actual position updates:
    navigator.geolocation.watchPosition((position) => {
      console.log('New position:', position);
    });
  }

  async getDeviceInfo() {
    try {
      this.deviceInfo = await this.deviceInfoService.getDeviceInfo();
      // Add browser info to deviceInfo
      this.deviceInfo = {
        ...this.deviceInfo,
        browserInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language
        }
      };
    } catch (error) {
      console.error('Device info error:', error);
    }
  }
}