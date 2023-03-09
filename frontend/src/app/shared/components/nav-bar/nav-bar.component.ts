import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../enums/theme.enum';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {
  Theme = Theme;
  currentTheme$: Observable<Theme>;

  constructor(private themesService: ThemesService) {
    this.currentTheme$ = this.themesService.getTheme();
  }

  onClickToggleTheme(): void {
    this.themesService.toggle();
  }
}
