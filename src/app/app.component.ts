import { IngredientsService } from "./services/ingredients.service";
import { Component, OnInit } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { Ingredient } from "./models/ingredient";
import { share, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  public ingredient$ = new ReplaySubject<Ingredient>(1);
  private ingredients$: Observable<Ingredient[]>;

  constructor(private Ingredients: IngredientsService) {}

  ngOnInit() {
    this.ingredients$ = this.Ingredients.getIngredients().pipe(shareReplay(1));
    this.getIngredient();
  }

  getIngredient() {
    const ingredient$ = this.Ingredients.getRandomIngredient(this.ingredients$);
    ingredient$.subscribe(ingredient => this.ingredient$.next(ingredient));
  }
}
