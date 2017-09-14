import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction} from '../actions';
import {ThreadsService} from '../../services/threads.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

class ThreadService {
}

@Injectable()
export class LoadThreadEffectService {

  @Effect() userThread$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug('Action recieved')
    .switchMap(() => this.threadsService.loadUserThreads())
    .debug('Data recieved via the HTTP request')
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  constructor(private actions$: Actions, private threadsService: ThreadsService) {
  }

}


