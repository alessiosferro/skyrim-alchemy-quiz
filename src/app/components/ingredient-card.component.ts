import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ingredient-card',
  template: `
    <form [formGroup]="form" class="card" (ngSubmit)="submit()">
      <div>
        <div class="card-header">
          {{ name | titlecase }}
        </div>
        <div class="card-body">
          <div class="form-group"  *ngFor="let effect of effects; let i = index">
            <label for="effect-{{i}}">Effect {{ i + 1 }}</label>
            <input 
              id="effect-{{i}}" 
              class="form-control" 
              type="text" 
              [formControlName]="i"
              [ngClass]="{'form-control--error': submitted && !validation[i], 'form-control--success': submitted && validation[i]}"
            >
            <small class="error-feedback" *ngIf="submitted && !validation[i]">This answer is wrong.</small>
            <small class="success-feedback" *ngIf="submitted && validation[i]">This answer is correct!</small>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="btn-group">
          <button class="btn btn-primary" type="button" (click)="getAnother()">Get Another</button>
          <button class="btn btn-primary" type="button" (click)="showAnswer()">Show Answer</button>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" type="button" (click)="clearForm()">Clear</button>
          <button [disabled]="isSolutionShown" class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .card {
      min-width: 400px;
      min-height: 500px;
      background-color: var(--color-secondary);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--color-primary);
      border-radius: 3px;
    }

    .card-body,
    .card-footer {
      margin: 20px;
    }

    .card-header {
      background-color: var(--color-primary);
      color: var(--color-text);
      min-height: 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  `]
})
export class IngredientCardComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  validation: boolean[];
  isSolutionShown = false;

  @Input()
  public name: string;

  @Input()
  public effects: string[]

  @Output()
  another = new EventEmitter<void>();

  constructor(
    private FB: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.FB.group({
      0: null,
      1: null,
      2: null,
      3: null
    });
  }

  clearForm() {
    this.form.reset();
    this.submitted = false;
    this.isSolutionShown = false;
  }

  showAnswer() {
    let tmp = {};

    this.effects.forEach((effect, index) => {
      tmp[index] = effect;
    });

    this.form.patchValue(tmp);
    this.submitted = true;
    this.validation = this.getValidation();
    this.isSolutionShown = true;
  }

  submit() {
    this.submitted = true;
    this.validation = this.getValidation()
  }

  getValidation(): boolean[] {
    const formData = this.form.value;
    const fieldsValidation = [];

    Object.keys(formData).forEach((key, index) => {
      if (!formData[key] ||
        (formData[key] && formData[key].trim() !== this.effects[index].toLowerCase() &&
          formData[key].trim() !== this.effects[index])) {
        fieldsValidation.push(false);
        return;
      }

      fieldsValidation.push(true);
    });

    return fieldsValidation;
  }

  getAnother() {
    this.submitted = false;
    this.isSolutionShown = false;
    this.form.reset();
    this.another.emit();
  }
}