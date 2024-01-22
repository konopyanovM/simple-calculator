import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {ThemeService} from "../../../core/service/theme.service";
import {themeType} from "../../../core/types";

@Component({
  selector: 'shared-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent implements OnInit {
  // Injections
  private _themeService = inject(ThemeService);

  // Public
  public sunIcon = faSun;
  public moonIcon = faMoon;

  public currentTheme: themeType = 'light';

  // Public methods
  public toggle() {
    this._themeService.toggle();
    this.currentTheme = this._themeService.currentTheme;
  }

  // Lifecycle hooks
  ngOnInit() {
    this.currentTheme = this._themeService.currentTheme;
  }
}
