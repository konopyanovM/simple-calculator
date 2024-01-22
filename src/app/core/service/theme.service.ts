import {Injectable} from '@angular/core';
import {themeType} from "../types";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Private
  private THEME_STORAGE_KEY = 'theme';
  private _rootRef: any = null;

  private _currentTheme: themeType =
    (localStorage.getItem(this.THEME_STORAGE_KEY) as themeType) ?? 'dark';

  // Accessors
  set rootRef(ref: any) {
    this._rootRef = ref;
  }

  get currentTheme(): themeType {
    return this._currentTheme;
  }

  // Public methods
  toggle(): void {
    if (this._currentTheme === 'dark') {
      this._rootRef.classList.remove('app-dark');
      this._rootRef.classList.add('app-light');
      this._currentTheme = 'light';

      localStorage.setItem(this.THEME_STORAGE_KEY, 'light');
    } else {
      this._rootRef.classList.remove('app-light');
      this._rootRef.classList.add('app-dark');
      this._currentTheme = 'dark';

      localStorage.setItem(this.THEME_STORAGE_KEY, 'dark');
    }
  }

  /**
   *
   * @param theme = 'light' or 'dark'
   *
   * If nothing is passed set theme from localStorage
   */
  setTheme(theme: themeType | null = null): void {
    if (theme !== null) {
      this._rootRef.classList.add(`app-${theme}`);
      this._currentTheme = theme;

      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    } else {
      this._rootRef.classList.add(`app-${this._currentTheme}`);
    }
  }
}
