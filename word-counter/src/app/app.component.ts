import { Component } from '@angular/core';
import words from 'src/utils/words';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'word-counter';

  word = '';
  limit = 10;

  handleSlideChange(newLimit: number){
    this.limit = newLimit;
  }

  generate(){
    this.word = words.slice(0, this.limit).join(" ");
  }

}
