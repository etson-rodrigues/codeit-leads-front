import { Component, OnInit } from '@angular/core';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _messageTrackerService: MessageTrackerService) { }

  ngOnInit(): void { }
}
