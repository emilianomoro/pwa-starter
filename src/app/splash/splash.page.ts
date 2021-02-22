import { Component, OnInit,  ViewChild, } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  @ViewChild('slides') slides;
  displayPage: boolean = true;
  
  slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.2,
    spaceBetween: 1,
    centeredSlides:true,
    centeredSlidesBounds: true,
    slidesOffsetBefore:20,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    
  }

  runInBrowser() {
    this.navCtrl.navigateRoot('/home');
  }
  nextSlide() {
    this.slides.slideNext();
  }
  prevSlide() {
    this.slides.slidePrev();
  }

}
