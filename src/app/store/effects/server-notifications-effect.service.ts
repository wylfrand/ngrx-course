

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ThreadsService} from '../../services/threads.service';
import {Effect} from '@ngrx/effects';
import {NewMessagesReceivedAction} from '../actions';
import {ApplicationState} from '../application-state';
import {Store} from '@ngrx/store';

@Injectable()
export class ServerNotificationsEffectService {

  @Effect() newMessages$ = Observable.interval(2000)
    .withLatestFrom(this.store.select('uiState'))
    .map(([any, uiState]) => uiState)
    .filter((uiState: any) => uiState.userId)
    .switchMap((uiState: any) => this.threadsService.loadNewMessagesForUser(uiState.userId))
    .debug('new messages received from server')
    .withLatestFrom(this.store.select('uiState'))
    .map(([unreadMessages, uiState]: [ any, any]) =>  new NewMessagesReceivedAction({
      unreadMessages,
      currentThreadId: uiState.currentThreadId,
      currentUserId: uiState.userId
    }));

    constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {

    }




}
