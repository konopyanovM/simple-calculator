import {Component, DestroyRef, HostListener, inject, OnInit} from '@angular/core';
import {NumpadEnum, OperatorEnum} from "./types";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CalculatorService} from "./calculator.service";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {isNumpadKey} from "../../core/helpers";

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

  @HostListener('window:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    const pressedKey = +$event.key;
    if (isNumpadKey(pressedKey)) this.action$.next(pressedKey);
    if ($event.key === 'Backspace') this.action$.next(OperatorEnum.Wipe);
    if ($event.key === OperatorEnum.Addition) this.action$.next(OperatorEnum.Addition);
    if ($event.key === '-') this.action$.next(OperatorEnum.Subtraction);
    if ($event.key === '*') this.action$.next(OperatorEnum.Multiplication);
    if ($event.key === OperatorEnum.Division) this.action$.next(OperatorEnum.Division);
    if ($event.key === OperatorEnum.Equal) this.action$.next(OperatorEnum.Equal);
    if ($event.key === 'c') this.action$.next(OperatorEnum.Clear);
  }

  protected readonly currentValue$ = this._calculatorService.currentValue$;
  protected readonly equations$ = this._calculatorService.equations$;
  protected readonly total$ = this._calculatorService.total$;
  protected readonly action$ = this._calculatorService.action$;

  // Lifecycle hooks

  ngOnInit() {
    this._calculatorService._initCalculator()
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe()
  }

  protected readonly OperatorEnum = OperatorEnum;
  protected readonly faChevronLeft = faChevronLeft;
}
