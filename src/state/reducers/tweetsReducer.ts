import { reducerState } from '../../components/interfaces';
import { FETCH_MORE, FETCH_TWEETS } from '../actions/types';

const initialState: reducerState = {
  tweetsRes: {
    data: [],
    meta: {
      newest_id: '',
      next_token: '',
      oldest_id: '',
      result_count: 0
    }
  }
};

const fetchTweetsReducer = (action: any) => {
  return {
    tweetsRes: action.payload
  };
}

const fetchMoreReducer = (state: reducerState, action: any) => {
  return {
    tweetsRes: {
      data: [...state.tweetsRes.data, ...action.payload.data],
      meta: action.payload.meta
    }
  }
}

const tweetsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TWEETS: return fetchTweetsReducer(action);

    case FETCH_MORE: return fetchMoreReducer(state, action);

    default: return state;
  }
}

export default tweetsReducer