import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxCarousel} from "ngx-carousel";
import {JoinnowComponent} from "../joinnow/joinnow.component";
import {MatDialog} from "@angular/material";
import {AppComponent} from "../app.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [];
  imgags: string[];
  public carouselBannerItems: Array<any> = [];
  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;
  public carouselOne: NgxCarousel;
  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;
  private evt: any;
  private cityName: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    /*this.carouselTileItems = [{'mark':'99',}]*/
    AppComponent.showMenu = true;
    this.imgags = [
      'assets/bg.jpg',
      'assets/car.png',
      'assets/canberra.jpg',
      'assets/holi.jpg'
    ];
    this.carouselTileItems =[{
      "name": "Sri Vignesh",
      "marks": "99",
      "subject": "In SSLC Mathematics",
      "year": "2013"
    }, {
      "name": "Madhan",
      "marks": "100",
      "subject": "In SSLC Science",
      "year": "2014"
    }, {
      "name": "Sriram",
      "marks": "99",
      "subject": "In SSLC Mathematics",
      "year": "2015"
    }, {
      "name": "Sriram",
      "marks": "99",
      "subject": "In SSLC Science",
      "year": "2015"
    }, {
      "name": "Bharadhi Kannan",
      "marks": "198",
      "subject": "In HSC Mathematics",
      "year": "2016"
    }, {
      "name": "Keerthana",
      "marks": "99",
      "subject": "In SSLC SocialScience",
      "year": "2015"
    }, {
      "name": "Keerthana",
      "marks": "98",
      "subject": "In SSLC Science",
      "year": "2015"
    }, {
      "name": "Manoj",
      "marks": "98",
      "subject": "In SSLC SocialScience",
      "year": "2015"
    }, {
      "name": "Manoj",
      "marks": "99",
      "subject": "In SSLC Science",
      "year": "2015"
    }];

    this.images = ['1','2','3'];
    this.carouselTile = {
      grid: { xs: 2, sm: 2, md: 3, lg: 3, all: 0 },
      speed: 600,
      interval: 3000,
      slide: 2,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 50px;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            border: 2px solid rgba(0, 0, 0, 0.55);
            padding: 4px;
            margin: 0 3px;
            transition-timing-function: cubic-bezier(.17, .67, .83, .67);
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              background: #6b6b6b;
              transform: scale(1.2);
          }
        `
      },
      load: 2,
      touch: true
    };
    this.carouselBannerLoad();
    this.carouselTileLoad();
    this.carouselTileOneLoad();
    this.carouselTileTwoLoad();
    this.initTabs();
  }
  public carouselBannerLoad() {
    const len = this.carouselBannerItems.length;
    if (len <= 4) {
      for (let i = len; i < len + 5; i++) {
        this.carouselBannerItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  public carouselTileLoad() {
    const len = this.carouselTileItems.length;
    /*if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }*/
  }

  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  public carouselTileTwoLoad() {
    const len = this.carouselTileTwoItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileTwoItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  public openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  public initTabs() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById('Incident').style.display = "block";
    /*this.evt.currentTarget.className += " active";*/
  }

  openJoinNow(): void {
    let dialogRef = this.dialog.open(JoinnowComponent, {
      width: '700px'
    });
  }
}
