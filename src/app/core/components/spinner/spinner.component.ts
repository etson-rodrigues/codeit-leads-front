import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {
  constructor(private _themeService: ThemeService) { }
  public spinnerColor!: string;
  ngOnInit() { }

  spinnerTemaPadrao() {
    if (this._themeService.getTheme()?.corpName)
      return this._themeService.getTheme()?.corpName;

    return 'CodeIT';
  }

  spinnerCorTema(): string {
    if (this._themeService.getTheme()?.corPadrao)
      return this._themeService.getTheme()?.corPadrao!;
    return '#ffffff';
  }
}
