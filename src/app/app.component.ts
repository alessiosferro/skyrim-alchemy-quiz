import { IngredientsService } from './services/ingredients.service';
import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Ingredient } from './models/ingredient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    }
  `]
})
export class AppComponent implements OnInit {
  public ingredient$ = new ReplaySubject<Ingredient>(1);

  constructor(
    private Ingredients: IngredientsService
  ) { }

  ngOnInit() {
    this.getAnotherIngredient();
  }

  getAnotherIngredient() {
    const ingredient$ = this.Ingredients.getRandomIngredient();
    ingredient$.subscribe(ingredient => this.ingredient$.next(ingredient));
  }
}
