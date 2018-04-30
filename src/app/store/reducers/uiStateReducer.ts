import {UiState, INITIAL_UI_STATE} from '../ui-state';
import {Action} from '@ngrx/store';
import {
  THREAD_SELECTED_ACTION,
  SELECT_USER_ACTION,
  SelectUserAction,
  ERROR_OCCURED_ACTION,
  ErrorOccuredAction
} from '../actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {

  switch (action.type) {

    case THREAD_SELECTED_ACTION:

      const newState = Object.assign({}, state);

      newState.currentThreadId = action.payload.selectedThreadId;

      return newState;


    case SELECT_USER_ACTION:

      return handleSelectUserAction(state, <any>action);

    case ERROR_OCCURED_ACTION:

      return handleErrorOccuredAction(state, <any>action);


    default:
      return state;
  }

}

function handleSelectUserAction(state: UiState, action: SelectUserAction) {

  const newUiState = Object.assign({}, state);

  newUiState.userId = action.payload;
  newUiState.currentThreadId = undefined;

  return newUiState;

}

function handleErrorOccuredAction(state: UiState, action: ErrorOccuredAction) {
  const newUiState = Object.assign({}, state);

  newUiState.currentError = action.payload;

  return newUiState;
}









