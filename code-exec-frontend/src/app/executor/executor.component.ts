import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { textAnimation } from '../common/visuals';
import { singleCommandValidator } from './validators/singleCommand.validator';
import { noPrivilageElevationValidator } from './validators/noPrivilageElevation.validator';
import { ExecutorService } from '../services/executor.service';
import { mergeMap, flatMap, takeWhile, tap } from 'rxjs/operators';
import { Subscription, Observable, interval } from 'rxjs';
import { ExecutionStatus } from '../domain/enum/ExecutionStatus.enum';
import { Command } from '../domain/Command';
import { ResultType } from '../domain/enum/ResultType.enum';

@Component({
  selector: 'app-executor',
  templateUrl: './executor.component.html',
  styleUrls: ['./executor.component.scss']
})
export class ExecutorComponent implements OnInit, OnDestroy {
  commandForm: FormGroup = this.createForm();
  placeholder: string = 'Type any command and press Enter to execute...'; 

  @Input() latestOutput: Command | null = null;
  @Input() noReset: boolean = false;

  animatePlaceholder$ = textAnimation(this.placeholder);
  outputStream$: Observable<Command> | null = null;

  refreshSubscription: Subscription | null = null;

  resultType = ResultType;
  executionStatus = ExecutionStatus;


  constructor(private executorService: ExecutorService) { }

  ngOnInit(): void {
    console.log(this.latestOutput);
    if (this.latestOutput) {
      this.commandForm.controls['command'].setValue(this.latestOutput.commandQuery);
      this.commandForm.controls['command'].disable();
    }
  }

  private createForm(): FormGroup {
    return new FormGroup({
      'command': new FormControl(null, [singleCommandValidator(), noPrivilageElevationValidator()])
    });
  }

  public submitForm($event: KeyboardEvent, form: FormGroup): void {
    if ($event.keyCode === 13) {
      this.commandForm.controls['command'].disable();
      
      let receivedCommand: Command; 

      this.refreshSubscription = this.executorService.sendCommandForExecution(form.controls['command'].value).pipe(
        mergeMap((command) => {
          receivedCommand = command;
          return interval(1000);
        }),
        flatMap(_ => this.executorService.getCommand(receivedCommand._id)),
        tap((command) => {console.log(command); this.latestOutput = command;}),
        takeWhile((command) => command.executionStatus === ExecutionStatus.IN_PROGRESS),
      ).subscribe(result => {});
    }
  }

  public restartForm() {
    this.commandForm.controls['command'].enable();
    this.commandForm.reset();

    this.latestOutput = null;

    this.refreshSubscription?.unsubscribe();
  }

  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }

}
