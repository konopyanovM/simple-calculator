import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent} from './calculator.component';
import {RouterModule} from "@angular/router";
import {calculatorRouting} from "./calculator.routing";
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(calculatorRouting),
    FormsModule,
    FaIconComponent
  ]
})
export class CalculatorModule {
}
