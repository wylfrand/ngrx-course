import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {LoadUserThreadsAction, ThreadSelectedAction} from '../store/actions';
import {Observable} from 'rxjs/Observable';

import {ThreadSummaryVM} from '../../../shared/model/thread-summary.vm';
import {MapStateToFunction} from './map-state-functions';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private store: Store<ApplicationState>) {

    this.userName$ = store.select(MapStateToFunction.userNameSelector);

    this.unreadMessagesCounter$ = store
      .map(MapStateToFunction.mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store
      .select(MapStateToFunction.mapStateToThreadSummariesSelector);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}
