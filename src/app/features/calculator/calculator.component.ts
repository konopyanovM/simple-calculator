import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NumpadEnum, OperatorEnum} from "./types";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CalculatorService} from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  // Services
  private _calculatorService = inject(CalculatorService);
  private _destroyRef = inject(DestroyRef);

  // Constants
  public NUMPAD_SYMBOLS: NumpadEnum[] = [
    NumpadEnum.One,
    NumpadEnum.Two,
    NumpadEnum.Three,
    NumpadEnum.Four,
    NumpadEnum.Five,
    NumpadEnum.Six,
    NumpadEnum.Seven,
    NumpadEnum.Eight,
    NumpadEnum.Nine,
    NumpadEnum.Zero,
    NumpadEnum.Point
  ]
  public OPERATORS = [
    OperatorEnum.Addition,
    OperatorEnum.Subtraction,
    OperatorEnum.Multiplication,
    OperatorEnum.Division,
    OperatorEnum.Clear,
    OperatorEnum.Equal,
  ]

  //

  ngOnInit() {
    this._calculatorService._initCalculator()
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe()
  }

  protected readonly currentValue$ = this._calculatorService.currentValue$;
  protected readonly equations$ = this._calculatorService.equations$;
  protected readonly total$ = this._calculatorService.total$;
  protected readonly action$ = this._calculatorService.action$;
  protected readonly OperatorEnum = OperatorEnum;
}
