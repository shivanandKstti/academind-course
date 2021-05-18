import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 
                'a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
                [
                    new Ingredient('meet', 1),
                    new Ingredient('ff', 1),
                ]),
        new Recipe('A test recipe', 'another test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
        [
            new Ingredient('buns', 1),
            new Ingredient('meet', 1),
        ]),
      ];
    
      constructor(private slService: ShoppingListService){}
      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredinetsToShoppigList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}