export const SET_NEWSFEED_TOPICS = 'SET_NEWSFEED_TOPICS';
export const UPDATE_NEWSFEED_YOUR_TOPICS = 'UPDATE_NEWSFEED_YOUR_TOPICS';
export const CLONE_NEWSFEED_YOUR_TOPICS = 'CLONE_NEWSFEED_YOUR_TOPICS';

export const setNewsfeedTopics = (topics: { top_topics: any[]; top_search_keywords: any[]; your_topics: any[] }) => {
  return { type: SET_NEWSFEED_TOPICS, payload: topics };
};

export const updateNewsfeedYourTopics = (topic: { id: string; name: string }) => {
  return { type: UPDATE_NEWSFEED_YOUR_TOPICS, payload: topic };
};

export const cloneNewsfeedYourTopics = (payload: 'Real' | 'Fake') => {
  return { type: CLONE_NEWSFEED_YOUR_TOPICS, payload };
};
