import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../models/ingredient";

@Injectable({
  providedIn: "root",
})
export class IngredientsService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`);
  }

  getRandomIngredient(
    ingredients$: Observable<Ingredient[]>
  ): Observable<Ingredient> {
    return ingredients$.pipe(
      take(1),
      map((ingredients) => {
        const index = Math.floor(Math.random() * (ingredients.length - 1));
        return ingredients[index];
      })
    );
  }
}
