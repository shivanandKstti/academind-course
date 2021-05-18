import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();
    this.slService.ingredientChanged.subscribe((ingredients: Ingredient[]) =>{
      this.ingredients = ingredients;
    })
  }

  // onIngredientAdded(ingredinet: Ingredient){
  //   this.ingredients.push(ingredinet);
  // }
}
