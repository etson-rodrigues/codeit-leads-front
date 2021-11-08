import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MessageTrackerComponent } from './message-tracker.component';

@NgModule({
  declarations: [MessageTrackerComponent],
  exports: [MessageTrackerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ]
})
export class MessageTrackerModule { }
