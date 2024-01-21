import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {RouterModule} from "@angular/router";
import {calculatorRouting} from "./calculator.routing";



@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(calculatorRouting)
  ]
})
export class CalculatorModule { }
