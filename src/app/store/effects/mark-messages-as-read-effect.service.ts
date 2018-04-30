

import {ThreadsService} from '../../services/threads.service';
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from '../actions';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

@Injectable()
export class MarkMessagesAsReadEffectService {

  @Effect({dispatch: false}) markMessagesAsRead =
    this.actions$.ofType(THREAD_SELECTED_ACTION)
      .switchMap((action: ThreadSelectedAction) => this.threadsService
        .markMessagesAsRead(action.payload.currentUserId, action.payload.selectedThreadId));

  constructor(private actions$: Actions, private threadsService: ThreadsService) {

  }
}
