import { Component } from '@angular/core';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private pwaService: PwaService) {}


  async ngOnInit() {
    this.pwaService.initializePwa();
  }
}
