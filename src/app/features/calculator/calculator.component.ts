import {Component} from '@angular/core';
import {SignEnum} from "../../core/types";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  protected readonly SignEnum = SignEnum;
}
