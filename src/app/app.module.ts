import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {appRouting} from "./app.routing";
import {LayoutComponent} from './layout/layout.component';
import {ThemeToggleComponent} from "./shared/components/theme-toggler/theme-toggle.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouting),
    ThemeToggleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
