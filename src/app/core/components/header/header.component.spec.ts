import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5682] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5682] deve abrir sidenav ao clicar no botão de menu', () => {
    spyOn(component.openMenu, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.openSidenavButton');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.openMenu.emit).withContext('Deve emitir evento para abrir sidenav ao clicar no botão de menu').toHaveBeenCalledTimes(1);
  });
});
