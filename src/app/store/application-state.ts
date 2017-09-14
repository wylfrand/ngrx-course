import {INITIAL_UI_STATE, UiState} from './ui-state';
import {INITIAL_STORE_DATA, StoreData} from './store-data';

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: INITIAL_UI_STATE,
  storeData: INITIAL_STORE_DATA
};

export interface ApplicationState {

  uiState: UiState;
  storeData: StoreData;

}


