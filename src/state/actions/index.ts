import { searchTweets } from "../../components/api";
import { FETCH_MORE, FETCH_TWEETS } from "./types";

// @ts-ignore
export const fetchTweets = (query: string) => async dispatch => {
    const tweets = await searchTweets({query, max_results: 10})
    dispatch({
        type: FETCH_TWEETS,
        payload: tweets.tweetsData
    })
};

// @ts-ignore
export const fetchMoreTweets = (query: string, next_token: string) => async dispatch => {
    const tweets = await searchTweets({query, max_results: 10, next_token})
    dispatch({
        type: FETCH_MORE,
        payload: tweets.tweetsData
    })
};