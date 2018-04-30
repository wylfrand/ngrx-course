


import {ApplicationState} from '../store/application-state';
import {MessageVM} from './message.vm';
import {Message} from '../../../shared/model/message';
import * as _ from 'lodash';
import {Participant} from '../../../shared/model/participant';
import {createSelector} from 'reselect';

// The UI will be rerender if there are new messages by this call :
export const messagesSelector = createSelector(getParticipants, getMessagesForCurrentThread, mapMessagesToMessageVM);

function getMessagesForCurrentThread(state: ApplicationState): Message[] {
  const currentThread = state.storeData.threads[state.uiState.currentThreadId];
  return currentThread ? currentThread.messageIds.map(messageId => state.storeData.messages[messageId]) : [];
}

function getParticipants(state: ApplicationState) {
  return state.storeData.participants;
}


const mapMessageToMessageVM = _.memoize((participantName: string, message: Message): MessageVM => {
    return {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        participantName: participantName
    };
},
  (participantName: string, message: Message) => message.id + participantName
  );

/*
function mapMessagesToMessageVM(participants: { [key: number]: Participant }, messages: Message[]) {
  return messages.map(message => {
    const participantsName = participants[message.participantId].name;
    // return mapMessageToMessageVM(participantsName, message);
  });
}
*/

function mapMessagesToMessageVM(participants: { [key: number]: Participant }, messages: Message[]) {
  return messages.map(message => {
    const participantsName = participants[message.participantId].name;
    return mapMessageToMessageVM(participantsName, message);
  });
}










