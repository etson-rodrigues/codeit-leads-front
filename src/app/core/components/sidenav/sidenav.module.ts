import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SidenavComponent } from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    exports: [SidenavComponent],
    imports: [CommonModule, RouterModule, MatListModule, MatMenuModule, MatButtonModule, MatIconModule]
})
export class SidenavModule {}
