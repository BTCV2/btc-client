import { Component } from '@angular/core';
import {DemoService} from './demo.service';
import { MatSpinner } from '@angular/material';
import {LoaderComponent} from "./loader/loader.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DemoService]
})
export class AppComponent {
  public loaderComponent = LoaderComponent;
  title = 'app';
  public matSpinner = MatSpinner;
  data: any;
  constructor(private service: DemoService) {
    /*this.countryPicker.getCountries()
      .subscribe((countries: ICountry[]) => {
        this.countries = countries;
      });*/
  }

 /* getDemo = () => {
    this.service.getDemo().subscribe(res => {
      this.data = res;
    });
  }*/
}
