import {Component, ElementRef, OnInit} from '@angular/core';
import {ThemeService} from "./core/service/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private _themeService: ThemeService,
    private _elementRef: ElementRef
  ) {
  }

  // Private
  private _initThemeService() {
    this._themeService.rootRef = this._elementRef.nativeElement;
    this._themeService.setTheme();
  }

  ngOnInit() {
    this._initThemeService();
  }
}
