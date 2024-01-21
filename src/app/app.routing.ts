import {Routes} from "@angular/router";

export const appRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calculator'
  },
  {
    path: 'calculator',
    loadChildren: () => import('./features/calculator/calculator.module').then(m => m.CalculatorModule)
  }
]
