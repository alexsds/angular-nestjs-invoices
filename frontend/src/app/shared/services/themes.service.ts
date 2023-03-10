import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private activeTheme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.DARK);

  getTheme(): Observable<Theme> {
    return this.activeTheme$.asObservable();
  }

  toggle(): void {
    this.activeTheme$.next(this.activeTheme$.value === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  }
}
