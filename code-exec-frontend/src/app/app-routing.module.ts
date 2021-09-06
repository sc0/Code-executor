import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutorComponent } from './executor/executor.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: ExecutorComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
