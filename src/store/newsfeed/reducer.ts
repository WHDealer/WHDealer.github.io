import { includes } from '../../utils';
import { SET_NEWSFEED_TOPICS, UPDATE_NEWSFEED_YOUR_TOPICS, CLONE_NEWSFEED_YOUR_TOPICS } from './actions';

export const newsfeedReducer = (
  state = { top_topics: [], top_search_keywords: [], your_topics: [], your_topics_real: [] },
  action: { type: string; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NEWSFEED_TOPICS:
      return { ...payload, your_topics_real: payload.your_topics };
    case UPDATE_NEWSFEED_YOUR_TOPICS:
      const topic = payload;
      if (includes(state.your_topics, topic)) {
        return { ...state, your_topics: state.your_topics.filter((item: any) => item.id !== topic.id) };
      }
      return { ...state, your_topics: [...state.your_topics, topic] };
    case CLONE_NEWSFEED_YOUR_TOPICS:
      if (payload === 'Real') return { ...state, your_topics_real: state.your_topics };
      return { ...state, your_topics: state.your_topics_real };
    default:
      return state;
  }
};
