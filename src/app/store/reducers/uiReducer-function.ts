import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {Action} from '@ngrx/store';
import {StoreData} from '../store-data';
import {THREAD_SELECTED_ACTION, USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';
import * as _ from 'lodash';


export class UiReducerFunctions {

  static uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
    switch (action.type) {
      case THREAD_SELECTED_ACTION:
        const threadId = action.payload;
        const newState = Object.assign({}, state);

        newState.currentThreadId = action.payload;

        return newState;
      default:
        return state;
    }
  }


  static storeData(state: StoreData, action: Action): StoreData {
    switch (action.type) {
      case USER_THREADS_LOADED_ACTION:
        return UiReducerFunctions.handleLoadUserThreadsAction(state, action);
      default:
        return state;

    }
  }

  static handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {
    // const userData = action.payload;
    // const newState: StoreData = Object.assign({}, state);

    return {
      participants: _.keyBy(action.payload.participants, 'id'),
      messages : _.keyBy(action.payload.messages, 'id'),
      threads: _.keyBy(action.payload.threads, 'id')
    };
  }
}
