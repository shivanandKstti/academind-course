import { Component, OnInit } from '@angular/core';
import countries from 'src/utils/countries';
countries
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  limit = 10;
  country = ''
  constructor() { }

  ngOnInit(): void {
  }

  handleSlideChange(newLimit){

    this.limit = newLimit;
  }

  generate(){
    this.country = countries.slice(0, this.limit).join(" ");
  }
}
