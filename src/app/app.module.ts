import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {ThreadSectionComponent} from './thread-section/thread-section.component';
import {MessageSectionComponent} from './message-section/message-section.component';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {MessageListComponent} from './message-list/message-list.component';
import {ThreadsService} from './services/threads.service';
import {combineReducers, StoreModule} from '@ngrx/store';
import {INITIAL_APPLICATION_STATE} from './store/application-state';

import {EffectsModule} from '@ngrx/effects';
import {LoadThreadEffectService} from './store/effects/load-thread-effect.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {UiReducerFunctions} from './store/reducers/uiReducer-function';


/**
 export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action) {
  return {
    uiState: UiReducerFunctions.uiState(state.uiState, action),
    storeData: UiReducerFunctions.storeData(state.storeData, action)
  };
}
 */


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(combineReducers({
      uiReducer: UiReducerFunctions.uiState,
      storeData: UiReducerFunctions.storeData
    }), INITIAL_APPLICATION_STATE),
    EffectsModule.run(LoadThreadEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
