import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

export type Theme = {
    corpName: string;
    codigo: string;
    descricao: string;
    corPadrao: string;
};

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(@Inject(DOCUMENT) private _document: Document, private _localStorageService: LocalStorageService) {}

    static theme: string;
    themeSelect!: Theme;
    themesLocalStorage!: Theme[];
    themeSelectedStorage!: any;

    public initThemes() {
        this.setThemes();
        this.setInitialTheme();
        this._injectTheme();
    }

    public setInitialTheme() {
        if (!this.getTheme())
            this._localStorageService.setItemLocalStorage(
                JSON.stringify({
                    corpName: 'CodeIT',
                    codigo: 'codeit-theme',
                    descricao: 'codeit-theme',
                    corPadrao: '#0077a9'
                }),
                '@theme-selected'
            );
        return;
    }

    public setTheme(theme: Theme) {
        if (theme) {
            this._localStorageService.setItemLocalStorage(JSON.stringify(theme), '@theme-selected');
        }
    }

    //Quando tiver dados dos temas vindos da api podemos injetar aqui e fazer um nova validação para inclusão
    public setThemes(theme?: Theme) {
        let themes = this.getThemes();

        if (themes.length == 0) {
            this._localStorageService.setItemLocalStorage(
                JSON.stringify([
                    {
                        corpName: 'CodeIT',
                        codigo: 'codeit-theme',
                        descricao: 'codeit-theme',
                        corPadrao: '#0077a9'
                    },
                    {
                        corpName: 'Teste',
                        codigo: 'teste-theme',
                        descricao: 'teste-theme',
                        corPadrao: '#ffa500'
                    }
                ]),
                '@themes'
            );
        }

        if (theme) {
            if (themes.length > 0) {
                themes.push(theme);
                this._localStorageService.setItemLocalStorage(JSON.stringify(themes), '@themes');
            }
        }
    }

    public getTheme(): Theme | null {
        this.themeSelectedStorage = JSON.parse(this._localStorageService.getItemLocalStorage('@theme-selected') || '[]');

        if (this.themeSelectedStorage.length == 0) return null;

        return this.themeSelectedStorage;
    }

    public getThemes() {
        this.themesLocalStorage = JSON.parse(this._localStorageService.getItemLocalStorage('@themes') || '[]');

        if (this.themesLocalStorage.length == 0) return [];

        return this.themesLocalStorage;
    }

    private _injectTheme() {
        let theme = this.getTheme();
        if (theme) {
            this._clearTheme();
            this._document.documentElement.classList.add(theme.codigo);
        }
    }

    public createTheme(corpName: string, corPadrao?: string): Theme {
        let theme: Theme = {
            corpName: corpName,
            codigo: this.replaceThemeName(corpName),
            descricao: this.replaceThemeName(corpName),
            corPadrao: corPadrao ? corPadrao : '#ffffff'
        };

        return theme;
    }

    public handleChangeTheme(theme: string) {
        this._clearTheme();
        this._document.documentElement.classList.add(theme);
    }

    // Limpa todas classes do html
    private _clearTheme() {
        document.getElementsByTagName('html')[0].className = '';
    }

    replaceThemeName(corpName: string) {
        return `${corpName.toLowerCase().replace(/( )+/g, '-')}-theme`;
    }
}
