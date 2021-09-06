import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExecutorService } from '../services/executor.service'
import { Observable, Subscription } from 'rxjs';
import { Command } from '../domain/Command';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  history: Command[] = [];
  historySubscription: Subscription | null = null;

  constructor(
    private executorService: ExecutorService) { }

  ngOnInit(): void {
    this.historySubscription = this.executorService.getLastTenCommands().subscribe(result => this.history = result);
  }

  ngOnDestroy() {
    this.historySubscription?.unsubscribe();
  }

}
