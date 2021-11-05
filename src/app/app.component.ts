import { Component, OnInit } from '@angular/core';

import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gerador-leads';

  constructor(private _themeService: ThemeService) { }

  ngOnInit(): void {
    this._themeService.initThemes();
  }
}
