// import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  // @Output() recipeSelected = new EventEmitter<void>();

  // constructor(private recipeSerivce: RecipeService) { }

  ngOnInit(): void {
  }

  // onSelected(){
  //   this.recipeSerivce.recipeSelected.emit(this.recipe);
  // }
}
