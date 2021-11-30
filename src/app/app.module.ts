import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CURRENCY_MASK_CONFIG } from 'ngx-currency';

import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { customCurrencyMaskConfig } from './core/config/currency-mask';
import { SpinnerModule } from './core/components/spinner/spinner.module';
import { MessageTrackerModule } from './shared/components/message-tracker/message-tracker.module';
import { FooterModule } from './core/components/footer/footer.module';
import { HeaderModule } from './core/components/header/header.module';
import { SidenavModule } from './core/components/sidenav/sidenav.module';
import { AuthGuard } from './core/auth/auth.guard';

const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatNativeDateModule,
    HttpClientModule,
    SpinnerModule,
    MatSnackBarModule,
    MessageTrackerModule,
    NgxMaskModule.forRoot(maskConfig),
    FooterModule,
    HeaderModule,
    SidenavModule,
    MatSidenavModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', color: 'accent' } },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
