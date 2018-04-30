import {StoreData} from '../store-data';
import {Action} from '@ngrx/store';
import {
  USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction, SEND_NEW_MESSAGE_ACTION,
  SendNewMessageAction, NEW_MESSAGES_RECEIVED_ACTION, NewMessagesReceivedAction, THREAD_SELECTED_ACTION,
  ThreadSelectedAction
} from '../actions';
import * as _ from 'lodash';
import {Message} from '../../../../shared/model/message';

const uuid = require('uuid/V4');

export function storeData(state: StoreData, action: Action): StoreData {


  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:

      return handleLoadUserThreadsAction(state, <any>action);

    case SEND_NEW_MESSAGE_ACTION:

      return handleSendNewMessageAction(state, <any>action);

    case NEW_MESSAGES_RECEIVED_ACTION:

      return handleNewMessagesReceivedAction(state, <any>action);

    case THREAD_SELECTED_ACTION:
      return handleThreadSelectedAction(state, <any>action);

    default:
      return state;
  }
}


function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {
  return {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}


function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction) {

  // const newStoreState = _.cloneDeep(state);

  const newStoreState: StoreData = {
    participants: state.participants,
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };
  newStoreState.threads[action.payload.threadId] = Object.assign({}, state.threads[action.payload.threadId]);

  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };
  currentThread.messageIds = currentThread.messageIds.slice(0); // create a  new array less75
  currentThread.messageIds.push(newMessage.id);
  newStoreState.messages[newMessage.id] = newMessage;
  return newStoreState;
}


function handleNewMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {

  // const newStoreState = _.cloneDeep(state);
  const newStoreState: StoreData = {
    participants: state.participants,
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };

  const newMessages = action.payload.unreadMessages,
    currentThreadId = action.payload.currentThreadId,
    currentUserId = action.payload.currentUserId;

  newMessages.forEach(message => {

    newStoreState.messages[message.id] = message;

    newStoreState.threads[message.threadId] = _.clone(state.threads[message.threadId]);

    const currentThread = newStoreState.threads[message.threadId];
    currentThread.messageIds = currentThread.messageIds.slice(0);

    currentThread.messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
      currentThread.participants = _.clone(currentThread.participants);
      currentThread.participants[currentUserId] += 1;
    }
  });

  return newStoreState;

}

function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction) {
  // const newStoreState = _.cloneDeep(state);

  const newStoreState: StoreData = {
    participants: _.clone(state.participants),
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };
  newStoreState.threads[action.payload.selectedThreadId] = _.clone(state.threads[action.payload.selectedThreadId]);
   const currentThread = newStoreState.threads[action.payload.selectedThreadId];
  currentThread.participants = _.clone(currentThread.participants);
  currentThread.participants[action.payload.currentUserId] = 0;

  return newStoreState;

}







