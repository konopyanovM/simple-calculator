import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, scan, Subject, tap} from "rxjs";
import {NumpadEnum, Operation, OperatorEnum} from "./types";
import {getLastItem, isEnum, wipeDigit} from "../../core/helpers";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private _initialValue$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _currentValue$: BehaviorSubject<number> = new BehaviorSubject(this._initialValue$.value);
  private _equations$: BehaviorSubject<Operation[][]> = new BehaviorSubject<Operation[][]>([[]]);
  private _currentEquation$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private _action$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  private _write$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _operate$: Subject<OperatorEnum> = new Subject<OperatorEnum>();

  private _total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Accessors
  get currentValue$(): Observable<number> {
    return this._currentValue$.asObservable();
  }

  get equations$(): Observable<Operation[][]> {
    return this._equations$.asObservable();
  }

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  get action$(): BehaviorSubject<NumpadEnum | OperatorEnum> {
    return this._action$;
  }

  // Public methods
  public _initCalculator() {
    return forkJoin(
      [
        // On every action
        this._action$.pipe(
          tap(input => {
              if (input === OperatorEnum.Wipe) return this._write$.next(-2);
              if (isEnum(OperatorEnum, input))
                return this._operate$.next(input);
              return this._write$.next(input);
            }
          )
        ),
        this._write$.pipe(
          scan((acc, input) => {
            // Input -2 to wipe one digit
            if (input === -2) {
              return wipeDigit(acc);
            }
            // Input -1 to reset _write$
            if (input === -1) return this._initialValue$.value;
            return acc * 10 + input;
          }),
          tap(res => {
            this._currentValue$.next(Number(res))
          })
        ),
        this._operate$.pipe(
          tap(operator => {
            // Reset all if C is pressed
            if (operator === OperatorEnum.Clear) {
              this._resetAll();
              return
            }
            //

            const equations: Operation[][] = this._equations$.value;
            const currentOperations: Operation[] = getLastItem(equations) as Operation[];
            let newOperation: Operation = this._createOperation(operator);

            // If operations is empty
            if (!currentOperations.length) {
              newOperation.total = this._currentValue$.value;
            } else {
              const {total, operator: prevOperator} = getLastItem(currentOperations)!;
              newOperation.total = this._operate(total, this._currentValue$.value, prevOperator!)!;
            }

            equations[this._currentEquation$.value].push(newOperation);
            this._equations$.next(equations);
            this._total$.next(newOperation.total);

            //
            if (operator === OperatorEnum.Equal)
              this._handleEqualOperation();
            else this._initialValue$.next(0);
          }),
          tap(() => {
            this._resetInput()
          })
        ),
        this._currentEquation$.pipe(
          tap(res => {
            const equations: Operation[][] = this._equations$.value
            equations[res] = [];
            this._equations$.next(equations);
          })
        )
      ]
    )
  }

  // Private methods
  private _resetInput() {
    this._currentValue$.next(this._initialValue$.value);
    this._write$.next(-1);
  }

  private _resetAll() {
    this._initialValue$.next(0);
    this._currentValue$.next(this._initialValue$.value);
    this._write$.next(-1);
    this._equations$.next([[]]);
    this._currentEquation$.next(0);
    this._total$.next(0);
  }

  private _createOperation(operator: OperatorEnum) {
    return {
      value: this._currentValue$.value,
      operator: operator,
      total: 0,
    }
  }

  private _handleEqualOperation() {
    this._initialValue$.next(this._total$.value);
    this._currentEquation$.next(this._currentEquation$.value + 1);
  }

  private _operate(firstValue: number, secondValue: number, operator: OperatorEnum) {
    switch (operator) {
      case OperatorEnum.Addition:
        return firstValue + secondValue
      case OperatorEnum.Subtraction:
        return firstValue - secondValue
      case OperatorEnum.Multiplication:
        return (firstValue * secondValue)
      case OperatorEnum.Division:
        return (firstValue / secondValue)
      case OperatorEnum.Clear:
        return 0;
      case OperatorEnum.Equal:
        return this._total$.value;
      default:
        return -1;
    }
  }
}
