import {ApplicationState} from '../store/application-state';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';
import {ThreadSummaryVM} from '../../../shared/model/thread-summary.vm';

export class MapStateToFunction {
  static   userNameSelector(state: ApplicationState): string {
    const currentUserId =  state.uiState.userId,
      currentParticipant =  state.storeData.participants[state.uiState.userId];

    if (!currentParticipant) {
      return '';
    }
    return currentParticipant.name;
  }

  static mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.userId;
    return  _.values<Thread>(state.storeData.threads)
      .reduce(
        (acc, thread) => acc + (thread.participants[currentUserId] || 0)
        , 0);
  }

  static mapStateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[]  {
    const threads = _.values<Thread>(state.storeData.threads);
    return threads.map(_.partial(MapStateToFunction.mapThreadToThreadSummary, state));
  }

  static mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
    const names = _.keys(thread.participants).map(
      participantId => state.storeData.participants[participantId].name);

    const lastMessageId = _.last(thread.messageIds),
      lastMessage = state.storeData.messages[lastMessageId];
    return <ThreadSummaryVM>{
      id: thread.id,
      participantNames: _.join(names, ','),
      lastMessageText: lastMessage.text,
      timestamp: lastMessage.timestamp
    };

  }
}
