import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Demo Recipe',
      'This is description of demo recipe',
      'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
