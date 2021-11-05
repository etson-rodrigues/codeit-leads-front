import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Theme, ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-seletor-temas',
  templateUrl: './seletor-temas.component.html',
  styleUrls: ['./seletor-temas.component.scss']
})
export class SeletorTemasComponent implements OnInit {
  title: string = 'Selecionar e Cadastrar Temas';
  themeForm!: FormGroup;

  themes: Theme[] = [];
  theme!: string;
  themeSelected!: any;
  selectedTheme!: Theme;
  selected!: string | null;

  constructor(
    private _formBuilder: FormBuilder,
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this._themeService.initThemes();

    this.themeForm = this._formBuilder.group({
      name: ['', []],
      themes: [this.updateThemeForm(), []]
    });

    this.selected =
      this.updateThemeForm() != null ? this.updateThemeForm() : 'codeit-theme';

    this.themes = this._themeService.getThemes();
  }

  public getTheme(themeName: string): Theme[] {
    return (this.themeSelected = this.themes.filter((theme) => {
      if (theme.codigo !== themeName) {
        return;
      }
      return theme;
    }));
  }

  updateThemeForm() {
    if (!this._themeService.getTheme()) return 'codeit-theme';

    this.selectedTheme = this._themeService.getTheme()!;
    return this.selectedTheme.codigo;
  }

  insert(event: Event) {
    event.preventDefault();

    // Salvando nome da empresa, gerando nome do arquivo theme e dados para o personalização do tema
    if (this.themeForm.get('name')?.value) {
      let theme = this._themeService.createTheme(this.themeForm.get('name')?.value);
      this._themeService.setThemes(theme);
    }

    // Salvando objeto do tema selecionado
    if (this.themeForm.get('themes')?.value) {
      let themeSelected = this.getTheme(this.themeForm.get('themes')?.value);

      let theme: Theme = {
        corpName: themeSelected[0].corpName,
        codigo: themeSelected[0].codigo,
        descricao: themeSelected[0].descricao,
        corPadrao: themeSelected[0].corPadrao
      };
      this._themeService.handleChangeTheme(theme.codigo);
      this._themeService.setTheme(theme);
    }
  }

  replaceThemeName(corpName: string) {
    return `${corpName.toLowerCase().replace(/( )+/g, '-')}-theme`;
  }

  limparFiltros(event: Event) {
    event.preventDefault();

    this.themeForm.patchValue({
      name: '',
      themes: this.updateThemeForm()
    });
  }
}
