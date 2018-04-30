import {Injectable} from '@angular/core';
import {ThreadsService} from '../../services/threads.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {ErrorOccuredAction, SEND_NEW_MESSAGE_ACTION} from '../actions';


@Injectable()
export class WriteNewMessageEffectService {

  @Effect() newMessages$: Observable<any> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .debug('sending new message to the server')
    .switchMap(action => this.threadsService.saveNewMessage(action.payload))
    .catch(() => Observable.of(new ErrorOccuredAction('Error occured while saving the message')));

  constructor(private actions$: Actions, private threadsService: ThreadsService) {
  }


}



